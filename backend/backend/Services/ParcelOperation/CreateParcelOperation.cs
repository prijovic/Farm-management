using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Services.Parcel;

namespace backend.Services.ParcelOperation;

public class CreateParcelOperation
{
    private readonly AppDbContext _context;
    private readonly GetNextParcelOperationIndex _getNextParcelOperationIndex;
    private readonly GetParcelById _getParcelById;
    private readonly IMapper _mapper;

    public CreateParcelOperation(AppDbContext context, IMapper mapper, GetParcelById getParcelById,
        GetNextParcelOperationIndex getNextParcelOperationIndex)
    {
        _mapper = mapper;
        _context = context;
        _getParcelById = getParcelById;
        _getNextParcelOperationIndex = getNextParcelOperationIndex;
    }

    public async Task<ParcelOperationResponse> Execute(Guid id, CUParcelOperationRequest createParcelOperationRequest)
    {
        var parcel = await _getParcelById.Execute(id);

        var parcelOperation = _mapper.Map<Models.ParcelOperation>(createParcelOperationRequest);
        parcelOperation.Parcel = parcel;
        parcelOperation.ParcelId = parcel.Id;
        parcelOperation.Index = await _getNextParcelOperationIndex.Execute(id, parcelOperation.Status);

        await _context.ParcelOperations.AddAsync(parcelOperation);
        await _context.SaveChangesAsync();

        return _mapper.Map<ParcelOperationResponse>(parcelOperation);
    }
}