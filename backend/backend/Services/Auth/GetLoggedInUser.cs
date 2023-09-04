using System.IdentityModel.Tokens.Jwt;
using backend.Exceptions;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.auth;

public class GetLoggedInUser
{
    private readonly TokenValidationParameters _tokenValidationParameters;
    private readonly UserManager<User> _userManager;

    public GetLoggedInUser(TokenValidationParameters tokenValidationParameters, UserManager<User> userManager)
    {
        _tokenValidationParameters = tokenValidationParameters;
        _userManager = userManager;
    }

    public async Task<User> Execute(HttpRequest request)
    {
        var authorizationHeader = request.Headers["Authorization"].ToArray();
        if (authorizationHeader.Length < 1 || string.IsNullOrEmpty(authorizationHeader[0]) ||
            !authorizationHeader[0].StartsWith("Bearer ")) throw new UnauthorizedException("Please login");

        var splitHeader = authorizationHeader[0].Split(" ");
        var token = splitHeader[1];

        var tokenHandler = new JwtSecurityTokenHandler();
        var claimsPrincipal =
            tokenHandler.ValidateToken(token, _tokenValidationParameters, out var securityToken);

        return await _userManager.FindByIdAsync(claimsPrincipal.FindFirst(claim => claim.Type == "UserId").Value);
    }
}