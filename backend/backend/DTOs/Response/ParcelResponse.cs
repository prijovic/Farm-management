namespace backend.DTOs.Response;

public class ParcelResponse
{
    public Guid Id { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastEditDate { get; set; }
    public string Name { get; set; }
    public long Number { get; set; }
    public double Size { get; set; }
    public List<LocationDTO> Polygon { get; set; }
    public int PlannedOperations { get; set; }
    public int InProgressOperations { get; set; }
    public int FinishedOperations { get; set; }
}