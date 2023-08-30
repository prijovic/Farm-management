using backend.Database;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.auth;

public class LogoutUser
{
    private readonly AppDbContext _context;
    private readonly GetLoggedInUser _getLoggedInUser;

    public LogoutUser(GetLoggedInUser getLoggedInUser, AppDbContext context)
    {
        _getLoggedInUser = getLoggedInUser;
        _context = context;
    }

    public async Task Execute(HttpRequest request)
    {
        var user = await _getLoggedInUser.Execute(request);

        var tokensToRevoke = await (_context.RefreshTokens
            .Where(rt => rt.UserId == user.Id && !rt.IsUsed)
            .ToListAsync());

        foreach (var token in tokensToRevoke)
        {
            token.IsRevoked = true;
            _context.RefreshTokens.Update(token);
        }

        await _context.SaveChangesAsync();
    }
}