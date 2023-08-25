using AutoMapper;
using backend.Database;
using backend.DTOs.Response;
using backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class DeleteParcel
{
    private readonly AppDbContext _context;

    public DeleteParcel(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Execute(Guid id)
    {
        var parcel = await _context.Parcels.FirstAsync(p => p.Id == id);

        if (parcel == null)
        {
            throw new NotFoundException("Parcel not found");
        }

        _context.Parcels.Remove(parcel);
        await _context.SaveChangesAsync();

        return id;
    }
}