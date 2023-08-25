namespace backend.Models;

public class Location
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public double Longitude { get; set; }
    public double Latitude { get; set; }
    public int Index { get; set; }

    public Guid ParcelId { get; set; }
    public virtual Parcel Parcel { get; set; } = null!;
}