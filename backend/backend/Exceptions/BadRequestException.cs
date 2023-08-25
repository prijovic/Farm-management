namespace backend.Exceptions;

// status 400
public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message)
    {
    }
}