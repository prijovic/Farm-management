using backend.Database;
using backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class GetParcelById
{
    private readonly AppDbContext _context;

    public GetParcelById(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Models.Parcel> Execute(Guid id)
    {
        var parcel = await (from p in _context.Parcels
            where p.Id == id
            select p).Include(p => p.Operations).Include(p => p.Polygon).FirstAsync();;

        if (parcel == null)
        {
            throw new NotFoundException("Parcel not found");
        }
        
        return parcel;
    }
}