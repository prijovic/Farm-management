using System.IdentityModel.Tokens.Jwt;
using backend.Database;
using backend.DTOs.Request.Auth;
using backend.DTOs.Response;
using backend.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.auth;

public class RefreshToken
{
    private readonly AppDbContext _context;
    private readonly GenerateAuthenticationTokens _generateAuthenticationTokens;
    private readonly TokenValidationParameters _tokenValidationParameters;

    public RefreshToken(AppDbContext context, TokenValidationParameters tokenValidationParameters,
        GenerateAuthenticationTokens generateAuthenticationTokens)
    {
        _context = context;
        _tokenValidationParameters = tokenValidationParameters;
        _generateAuthenticationTokens = generateAuthenticationTokens;
    }

    public async Task<AuthenticationResponse> Execute(TokenRefreshRequest tokenRefreshRequest)
    {
        var refreshToken = await ValidateTokens(tokenRefreshRequest);
        refreshToken.IsUsed = true;
        refreshToken.LastEditDate = DateTime.UtcNow;

        _context.RefreshTokens.Update(refreshToken);
        await _context.SaveChangesAsync();

        var user = _context.Users.FirstOrDefault(x => x.Id == refreshToken.UserId);

        if (user == null) throw new NotFoundException("User not found");

        return await _generateAuthenticationTokens.Execute(user);
    }

    private async Task<Models.RefreshToken> ValidateTokens(TokenRefreshRequest tokenRefreshRequest)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        _tokenValidationParameters.ValidateLifetime = false;

        var tokenInValidation = jwtTokenHandler.ValidateToken(tokenRefreshRequest.token, _tokenValidationParameters,
            out var validatedToken);

        switch (validatedToken)
        {
            case null:
                throw new InvalidTokenException();
            case JwtSecurityToken jwtSecurityToken when !jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase):
                throw new InvalidTokenException();
        }

        var utcExpiryDate =
            long.Parse(tokenInValidation.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
        var expiryDate = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc).AddSeconds(utcExpiryDate);
        if (expiryDate > DateTime.Now) throw new InvalidTokenException();

        var storedToken =
            await _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRefreshRequest.refreshToken);

        if (storedToken == null) throw new InvalidTokenException();

        if (storedToken.IsUsed || storedToken.IsRevoked) throw new InvalidTokenException();

        var jti = tokenInValidation.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

        if (!jti.Equals(storedToken.JwtId)) throw new InvalidTokenException();

        if (storedToken.ExpiryDate < DateTime.UtcNow) throw new InvalidTokenException();

        return storedToken;
    }
}