using backend.DTOs.Response;

namespace backend.DTOs.Request.Parcel;

public class UpdateParcelPolygonRequest
{
    public List<LocationDTO> Polygon { get; set; }
}