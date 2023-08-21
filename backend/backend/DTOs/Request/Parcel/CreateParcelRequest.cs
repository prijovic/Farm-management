using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Request.Parcel;

public class CreateParcelRequest
{
    [Required] public string Name { get; set; }
    [Required] public long Number { get; set; }
    [Required] public long Size { get; set; }
}