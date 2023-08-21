using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.auth;

public class GenerateJwt
{
    private readonly IConfiguration _configuration;

    public GenerateJwt(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string Execute(User user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();

        var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JWTConfig:Secret").Value);

        var id = Guid.NewGuid().ToString();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, id),
                new Claim(JwtRegisteredClaimNames.Iat,
                    DateTime.Now.ToUniversalTime().ToString(CultureInfo.InvariantCulture))
            }),

            Expires = DateTime.Now.Add(TimeSpan.Parse(_configuration.GetSection("JWTConfig:ExpiryTimeFrame").Value)),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };

        var token = jwtTokenHandler.CreateToken(tokenDescriptor);

        return jwtTokenHandler.WriteToken(token);
    }
}