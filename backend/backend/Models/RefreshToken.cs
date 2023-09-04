namespace backend.Models;

public class RefreshToken : BaseEntity
{
    public User User = null!;
    public Guid UserId;
    public bool IsRevoked { get; set; } = false;
    public bool IsUsed { get; set; } = false;
    public string Token { get; set; }
    public string JwtId { get; set; }
    public DateTime ExpiryDate { get; set; }
}