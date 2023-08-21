using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Auth;
using backend.DTOs.Response;
using backend.Exceptions;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services.auth;

public class SignUpUser
{
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public SignUpUser(UserManager<User> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<UserResponse> Execute(SignUpRequest signUpRequest)
    {
        var user = await _userManager.FindByEmailAsync(signUpRequest.Email);

        if (user != null) throw new UserExistsException();

        var newUser = _mapper.Map<User>(signUpRequest);
        
        var isCreated = await _userManager.CreateAsync(newUser, signUpRequest.Password);

        if (isCreated.Succeeded) return _mapper.Map<UserResponse>(newUser);

        var errorMessage = string.Join(" ", isCreated.Errors.Select(error => error.Description));
        throw new UnauthorizedException(errorMessage);
    }
}