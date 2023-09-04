using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Exceptions;
using backend.Services.Cache;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class UpdateParcel
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;
    private readonly ICacheService _cacheService;

    public UpdateParcel(AppDbContext context, IMapper mapper, ICacheService cacheService)
    {
        _mapper = mapper;
        _context = context;
        _cacheService = cacheService;
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
        parcel.LastEditDate = DateTime.UtcNow;

        _context.Parcels.Update(parcel);
        await _context.SaveChangesAsync();
        
        UpdateCache(parcel);

        return _mapper.Map<ParcelResponse>(parcel);
    }
    
    private void UpdateCache(Models.Parcel parcel)
    {
        var key = $"parcels{parcel.UserId}";
        var parcels = _cacheService.GetData<IEnumerable<Models.Parcel>>(key);
        if (parcels != null && parcels.Any())
        {
            var parcelsList = parcels.ToList();
            parcelsList.Remove(parcelsList.First(p => p.Id == parcel.Id));
            parcelsList.Add(parcel);
            var expiryTime = DateTimeOffset.Now.AddMinutes(5);
            _cacheService.SetData(key, parcelsList, expiryTime);
        }
    }
}