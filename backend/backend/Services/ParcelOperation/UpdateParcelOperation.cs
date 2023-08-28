using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;

namespace backend.Services.ParcelOperation;

public class UpdateParcelOperation
{
    private readonly AppDbContext _context;
    private readonly GetParcelOperationById _getParcelOperationById;
    private readonly IMapper _mapper;

    public UpdateParcelOperation(AppDbContext context, IMapper mapper, GetParcelOperationById getParcelOperationById)
    {
        _mapper = mapper;
        _context = context;
        _getParcelOperationById = getParcelOperationById;
    }

    public async Task<ParcelOperationResponse> Execute(Guid id, CUParcelOperationRequest updateParcelOperationRequest)
    {
        var parcelOperation = await _getParcelOperationById.Execute(id);

        parcelOperation.Name = updateParcelOperationRequest.Name;
        parcelOperation.Description = updateParcelOperationRequest.Description;
        parcelOperation.LastEditDate = DateTime.UtcNow;

        _context.ParcelOperations.Update(parcelOperation);
        await _context.SaveChangesAsync();

        return _mapper.Map<ParcelOperationResponse>(parcelOperation);
    }
}