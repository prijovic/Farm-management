using backend.Database;
using backend.Exceptions;
using backend.Services.Cache;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class DeleteParcel
{
    private readonly ICacheService _cacheService;
    private readonly AppDbContext _context;

    public DeleteParcel(AppDbContext context, ICacheService cacheService)
    {
        _context = context;
        _cacheService = cacheService;
    }

    public async Task<Guid> Execute(Guid id)
    {
        var parcel = await _context.Parcels.FirstAsync(p => p.Id == id);

        if (parcel == null) throw new NotFoundException("Parcel not found");

        _context.Parcels.Remove(parcel);
        await _context.SaveChangesAsync();

        RemoveFromCache(parcel);

        return id;
    }

    private void RemoveFromCache(Models.Parcel parcel)
    {
        var key = $"parcels{parcel.UserId}";
        var parcels = _cacheService.GetData<IEnumerable<Models.Parcel>>(key);
        if (parcels != null && parcels.Any())
        {
            var parcelsList = parcels.ToList();
            parcelsList.Remove(parcelsList.First(p => p.Id == parcel.Id));
            var expiryTime = DateTimeOffset.Now.AddMinutes(5);
            _cacheService.SetData(key, parcelsList, expiryTime);
        }
    }
}