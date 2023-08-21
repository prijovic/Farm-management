using System.ComponentModel.DataAnnotations;
using backend.DTOs.Response;

namespace backend.DTOs.Request.Auth;

public class SignUpRequest
{
    [Required] public string Email { get; set; }
    [Required] public string Password { get; set; }
    [Required] public string Name { get; set; }
    [Required] public string Surname { get; set; }
    [Required] public DateTime BirthDate { get; set; }
    [Required] public string FarmName { get; set; }
    [Required] public AddressDTO Address { get; set; }
}