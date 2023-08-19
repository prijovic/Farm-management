﻿using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Request.Auth;

public class LoginRequest
{
    [Required] public string Email { get; set; }

    [Required] public string Password { get; set; }
}