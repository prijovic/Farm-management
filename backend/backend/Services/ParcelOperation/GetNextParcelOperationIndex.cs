using backend.Models;
using backend.Services.Parcel;

namespace backend.Services.ParcelOperation;

public class GetNextParcelOperationIndex
{
    private readonly GetParcelById _getParcelById;

    public GetNextParcelOperationIndex(GetParcelById getParcelById)
    {
        _getParcelById = getParcelById;
    }

    public async Task<int> Execute(Guid id, ParcelOperationStatus status)
    {
        var parcel = await _getParcelById.Execute(id);

        return (from parcelOperation in parcel.Operations
            where parcelOperation.Status == status
            select parcelOperation).ToList().Count;
    }
}