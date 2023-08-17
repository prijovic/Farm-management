namespace backend.DTOs.Response;

public class UserResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public DateTime BirthDate { get; set; }
    public string Email { get; set; }
    public string FarmName { get; set; }

    public AddressDTO Address { get; set; }
}