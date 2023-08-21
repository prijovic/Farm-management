namespace backend.DTOs.Response;

public class ParcelResponse
{
    public Guid Id { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastEditDate { get; set; }
    public string Name { get; set; }
    public long Number { get; set; }
    public long Size { get; set; }
}