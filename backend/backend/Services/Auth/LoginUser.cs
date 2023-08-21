using backend.DTOs.Request.Auth;
using backend.Exceptions;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services.auth;

public class LoginUser
{
    private readonly GenerateJwt _generateJwt;
    private readonly UserManager<User> _userManager;

    public LoginUser(UserManager<User> userManager, GenerateJwt generateJwt)
    {
        _userManager = userManager;
        _generateJwt = generateJwt;
    }

    public async Task<string> Execute(LoginRequest loginRequest)
    {
        var user = await _userManager.FindByEmailAsync(loginRequest.Email);

        if (user == null) throw new UnauthorizedException();
        
        var credentialsAreCorrect = await _userManager.CheckPasswordAsync(user, loginRequest.Password);

        if (!credentialsAreCorrect) throw new UnauthorizedException();

        return _generateJwt.Execute(user);
    }
}