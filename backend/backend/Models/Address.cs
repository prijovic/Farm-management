namespace backend.Models;

public class Address : BaseEntity
{
    public string Country { get; set; }
    public string Place { get; set; }
    public string Street { get; set; }
    public string Number { get; set; }
    public string PostalCode { get; set; }
    public virtual User User { get; set; }
}