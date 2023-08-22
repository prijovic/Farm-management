using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class UpdateParcel
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public UpdateParcel(AppDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ParcelResponse> Execute(Guid id, CUParcelRequest updateParcelRequest)
    {
        var parcel = await _context.Parcels.FirstAsync(p => p.Id == id);

        if (parcel == null)
        {
            throw new NotFoundException("Parcel not found");
        }

        parcel.Number = updateParcelRequest.Number;
        parcel.Size = updateParcelRequest.Size;
        parcel.Name = updateParcelRequest.Name;
        parcel.LastEditDate = DateTime.Now;

        _context.Parcels.Update(parcel);
        await _context.SaveChangesAsync();

        return _mapper.Map<ParcelResponse>(parcel);
    }
}