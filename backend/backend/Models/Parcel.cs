namespace backend.Models;

public class Parcel : BaseEntity
{
    public User User = null!;

    public Guid UserId;
    public string Name { get; set; } = string.Empty;
    public long Number { get; set; }
    public long Size { get; set; }

    public virtual ICollection<ParcelOperation> Operations { get; set; } = new List<ParcelOperation>();
    public ICollection<Location> Polygon { get; set; } = new List<Location>();
}