using backend.DTOs.Request.Auth;
using backend.DTOs.Response;
using backend.Exceptions;
using backend.Services.auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly LoginUser _loginUser;
    private readonly LogoutUser _logoutUser;
    private readonly RefreshToken _refreshToken;
    private readonly SignUpUser _signUpUser;

    public AuthController(SignUpUser signUpUser, LoginUser loginUser, RefreshToken refreshToken, LogoutUser logoutUser)
    {
        _signUpUser = signUpUser;
        _loginUser = loginUser;
        _refreshToken = refreshToken;
        _logoutUser = logoutUser;
    }

    [HttpPost("login")]
    public async Task<AuthenticationResponse> Login(LoginRequest loginRequest)
    {
        if (!ModelState.IsValid) throw new BadRequestException("Invalid data");

        return await _loginUser.Execute(loginRequest);
    }

    [HttpPost("refreshToken")]
    public async Task<AuthenticationResponse> RefreshToken([FromBody] TokenRefreshRequest tokenRefreshRequest)
    {
        if (!ModelState.IsValid) throw new BadRequestException("Invalid data");

        return await _refreshToken.Execute(tokenRefreshRequest);
    }

    [HttpPost("signUp")]
    public async Task<UserResponse> SignUp(SignUpRequest signUpRequest)
    {
        if (!ModelState.IsValid) throw new BadRequestException("Invalid data");

        return await _signUpUser.Execute(signUpRequest);
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("logout")]
    public async Task Logout()
    {
        await _logoutUser.Execute(Request);
    }
}