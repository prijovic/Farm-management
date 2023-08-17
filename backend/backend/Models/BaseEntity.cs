namespace backend.Models;

public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    public DateTime LastEditDate { get; set; } = DateTime.UtcNow;
}