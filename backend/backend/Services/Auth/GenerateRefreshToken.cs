using backend.Database;
using backend.Models;

namespace backend.Services.auth;

public class GenerateRefreshToken
{
    private readonly AppDbContext _context;

    public GenerateRefreshToken(AppDbContext context)
    {
        _context = context;
    }

    public async Task<string> Execute(Guid jwtId, User user)
    {
        var token = GenerateRandomString();
        var refreshToken = new Models.RefreshToken
        {
            Token = token,
            JwtId = jwtId.ToString(),
            ExpiryDate = DateTime.UtcNow.AddMonths(6),
            UserId = user.Id,
            User = user
        };

        await _context.RefreshTokens.AddAsync(refreshToken);
        await _context.SaveChangesAsync();
        return token;
    }

    private static string GenerateRandomString()
    {
        var random = new Random();
        const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
        return new string(Enumerable.Repeat(chars, 50).Select(s => s[random.Next(50)]).ToArray());
    }
}