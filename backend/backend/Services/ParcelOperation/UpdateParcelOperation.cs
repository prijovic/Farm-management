using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ParcelOperation;

public class UpdateParcelOperation
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public UpdateParcelOperation(AppDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ParcelOperationResponse> Execute(Guid id, CUParcelOperationRequest updateParcelOperationRequest)
    {
        var parcelOperation = await _context.ParcelOperations.FirstAsync(p => p.Id == id);

        if (parcelOperation == null)
        {
            throw new NotFoundException("Parcel operation not found");
        }

        parcelOperation.Name = updateParcelOperationRequest.Name;
        parcelOperation.Description = updateParcelOperationRequest.Description;
        parcelOperation.Status = updateParcelOperationRequest.Status != null
            ? updateParcelOperationRequest.Status
            : parcelOperation.Status;
        parcelOperation.LastEditDate = DateTime.UtcNow;

        _context.ParcelOperations.Update(parcelOperation);
        await _context.SaveChangesAsync();

        return _mapper.Map<ParcelOperationResponse>(parcelOperation);
    }
}