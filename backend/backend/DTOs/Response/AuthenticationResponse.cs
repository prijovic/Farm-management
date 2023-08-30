namespace backend.DTOs.Response;

public class AuthenticationResponse
{
    public string token { get; set; }
    public string refreshToken { get; set; }
}