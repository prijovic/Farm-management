namespace backend.Models;

public class Parcel : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public long Number { get; set; }
    public long Size { get; set; }

    public Guid UserId;
    public User User = null!;

    public virtual ICollection<ParcelOperation> Operations { get; set; } = new List<ParcelOperation>();
}