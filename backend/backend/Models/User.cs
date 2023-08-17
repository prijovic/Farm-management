using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class User : IdentityUser<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public string FarmName { get; set; }

    public virtual Address Address { get; set; } = null!;
    public virtual ICollection<Parcel> Parcels { get; set; } = new List<Parcel>();
}