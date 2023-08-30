using backend.DTOs.Request.Auth;
using backend.DTOs.Response;
using backend.Exceptions;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services.auth;

public class LoginUser
{
    private readonly GenerateAuthenticationTokens _generateAuthenticationTokens;
    private readonly UserManager<User> _userManager;

    public LoginUser(UserManager<User> userManager, GenerateAuthenticationTokens generateAuthenticationTokens)
    {
        _userManager = userManager;
        _generateAuthenticationTokens = generateAuthenticationTokens;
    }

    public async Task<AuthenticationResponse> Execute(LoginRequest loginRequest)
    {
        var user = await _userManager.FindByEmailAsync(loginRequest.Email);

        if (user == null) throw new UnauthorizedException();

        var credentialsAreCorrect = await _userManager.CheckPasswordAsync(user, loginRequest.Password);

        if (!credentialsAreCorrect) throw new UnauthorizedException();

        return await _generateAuthenticationTokens.Execute(user);
    }
}