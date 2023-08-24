using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ParcelOperation;

public class CreateParcelOperation
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public CreateParcelOperation(AppDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ParcelOperationResponse> Execute(Guid id, CUParcelOperationRequest createParcelOperationRequest)
    {
        var parcel = await _context.Parcels.FirstAsync(p => p.Id == id);
        
        if (parcel == null)
        {
            throw new NotFoundException("Parcel not found");
        }

        var parcelOperation = _mapper.Map<Models.ParcelOperation>(createParcelOperationRequest);
        parcelOperation.Parcel = parcel;
        parcelOperation.ParcelId = parcel.Id;

        await _context.ParcelOperations.AddAsync(parcelOperation);
        await _context.SaveChangesAsync();

        return _mapper.Map<ParcelOperationResponse>(parcelOperation);
    }
}