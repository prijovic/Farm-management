using AutoMapper;
using backend.Database;
using backend.DTOs.Response;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ParcelOperation;

public class GetAllParcelOperations
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public GetAllParcelOperations(AppDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<List<ParcelOperationResponse>> Execute(Guid id)
    {
        
        var parcelOperations = await (from parcelOperation in _context.ParcelOperations
            where parcelOperation.ParcelId == id
            select parcelOperation).ToListAsync();

        return _mapper.Map<List<ParcelOperationResponse>>(parcelOperations);
    }
}