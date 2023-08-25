using AutoMapper;
using backend.Database;
using backend.DTOs.Response;
using backend.Exceptions;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class UpdateParcelPolygon
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly GetParcelById _getParcelById;

    public UpdateParcelPolygon(AppDbContext context, IMapper mapper, GetParcelById getParcelById)
    {
        _mapper = mapper;
        _context = context;
        _getParcelById = getParcelById;
    }

    public async Task<ParcelResponse> Execute(Guid id, List<LocationDTO> polygon)
    {
        var parcel = await _getParcelById.Execute(id);

        var locationPolygon = _mapper.Map<List<Location>>(polygon);
        locationPolygon.ForEach(location =>
        {
            location.ParcelId = parcel.Id;
            location.Parcel = parcel;
        });

        foreach (var location in parcel.Polygon)
        {
            _context.Locations.Remove(location);
        }
        
        parcel.Polygon = locationPolygon;

        foreach (var location in parcel.Polygon)
        {
            await _context.Locations.AddAsync(location);
        }
        
        parcel.LastEditDate = DateTime.UtcNow;

        _context.Parcels.Update(parcel);
        await _context.SaveChangesAsync();

        return _mapper.Map<ParcelResponse>(parcel);
    }
}