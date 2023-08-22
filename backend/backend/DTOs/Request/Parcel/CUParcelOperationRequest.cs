using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs.Request.Parcel;

public class CUParcelOperationRequest
{
    [Required] public string Name { get; set; }
    [Required] public string Description { get; set; }
    public ParcelOperationStatus Status { get; set; }
}