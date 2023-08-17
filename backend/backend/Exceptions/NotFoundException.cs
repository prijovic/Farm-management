namespace backend.Exceptions;

//status 404
public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message)
    {
    }
}