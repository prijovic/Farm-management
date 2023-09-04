using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Request.Parcel;

public class CUParcelOperationRequest
{
    [Required] public string Name { get; set; }
    [Required] public string Description { get; set; }
}