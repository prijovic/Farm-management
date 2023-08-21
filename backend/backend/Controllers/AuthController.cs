using backend.DTOs.Request.Auth;
using backend.DTOs.Response;
using backend.Exceptions;
using backend.Services.auth;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly SignUpUser _signUpUser;

    public AuthController(SignUpUser signUpUser)
    {
        _signUpUser = signUpUser;
    }

    [HttpPost("signUp")]
    public async Task<UserResponse> SignUp(SignUpRequest signUpRequest)
    {
        if (!ModelState.IsValid) throw new BadRequestException("Invalid data");

        return await _signUpUser.Execute(signUpRequest);
    }
}