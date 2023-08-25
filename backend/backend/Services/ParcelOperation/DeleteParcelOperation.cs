using backend.Database;
using backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ParcelOperation;

public class DeleteParcelOperation
{
    private readonly AppDbContext _context;

    public DeleteParcelOperation(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Execute(Guid id)
    {
        var parcelOperation = await _context.ParcelOperations.FirstAsync(p => p.Id == id);

        if (parcelOperation == null)
        {
            throw new NotFoundException("Parcel operation not found");
        }

        _context.ParcelOperations.Remove(parcelOperation);
        await _context.SaveChangesAsync();

        return id;
    }
}