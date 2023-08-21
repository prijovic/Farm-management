namespace backend.Exceptions;

// status 409
public class UserExistsException : Exception
{
    public UserExistsException() : base("User already exists")
    {
    }
}