namespace backend.Exceptions;

// status 401
public class UnauthorizedException : Exception
{
    public UnauthorizedException(string message = "Bad login credentials") : base(message)
    {
    }
}