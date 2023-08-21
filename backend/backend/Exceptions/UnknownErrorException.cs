namespace backend.Exceptions;

// status 500
public class UnknownErrorException : Exception
{
    public UnknownErrorException() : base("Unknown error occured")
    {
    }
}