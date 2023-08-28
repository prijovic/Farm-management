using backend.Models;

namespace backend.DTOs.Response;

public class ParcelOperationResponse
{
    public Guid Id { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastEditDate { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ParcelOperationStatus Status { get; set; }
    public int Index { get; set; }
}