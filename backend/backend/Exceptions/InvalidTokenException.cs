namespace backend.Exceptions;

// status 498
public class InvalidTokenException : Exception
{
    public InvalidTokenException(string message = "Invalid token") : base(message)
    {
    }
}