using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs.Request.Parcel;

public class UpdateParcelOperationPositionRequest
{
    [Required] public ParcelOperationStatus Status { get; set; }
    [Required] public int Index { get; set; }
}