namespace backend.Exceptions;

public class ParcelExistsException : Exception
{
    public ParcelExistsException() : base("Parcel already exists")
    {
    }
}