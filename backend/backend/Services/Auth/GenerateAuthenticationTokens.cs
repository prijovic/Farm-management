using backend.DTOs.Response;
using backend.Models;

namespace backend.Services.auth;

public class GenerateAuthenticationTokens
{
    private readonly GenerateJwt _generateJwt;
    private readonly GenerateRefreshToken _generateRefreshToken;

    public GenerateAuthenticationTokens(GenerateJwt generateJwt, GenerateRefreshToken generateRefreshToken)
    {
        _generateJwt = generateJwt;
        _generateRefreshToken = generateRefreshToken;
    }

    public async Task<AuthenticationResponse> Execute(User user)
    {
        var jwtTuple = _generateJwt.Execute(user);

        return new AuthenticationResponse
        {
            token = jwtTuple.Item2,
            refreshToken = await _generateRefreshToken.Execute(jwtTuple.Item1, user)
        };
    }
}