using backend.Database;
using backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ParcelOperation;

public class GetParcelOperationById
{
    private readonly AppDbContext _context;

    public GetParcelOperationById(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Models.ParcelOperation> Execute(Guid id)
    {
        var parcelOperation = await (from p in _context.ParcelOperations
            where p.Id == id
            select p).Include(p => p.Parcel).FirstAsync();

        if (parcelOperation == null) throw new NotFoundException("Parcel operation not found");

        return parcelOperation;
    }
}