using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Request.Auth;

public class TokenRefreshRequest
{
    [Required] public string token { get; set; }

    [Required] public string refreshToken { get; set; }
}