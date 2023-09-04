namespace backend.Models;

public class ParcelOperation : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ParcelOperationStatus Status { get; set; } = ParcelOperationStatus.Planned;
    public int Index { get; set; }
    
    public Guid ParcelId { get; set; }
    public virtual Parcel Parcel { get; set; } = null!;
}