using AutoMapper;
using backend.Database;
using backend.DTOs.Response;
using backend.Services.auth;
using backend.Services.Cache;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class GetAllUserParcels
{
    private readonly ICacheService _cacheService;
    private readonly AppDbContext _context;
    private readonly GetLoggedInUser _getLoggedInUser;
    private readonly IMapper _mapper;

    public GetAllUserParcels(AppDbContext context, IMapper mapper, GetLoggedInUser getLoggedInUser,
        ICacheService cacheService)
    {
        _mapper = mapper;
        _context = context;
        _getLoggedInUser = getLoggedInUser;
        _cacheService = cacheService;
    }

    public async Task<List<ParcelResponse>> Execute(HttpRequest request)
    {
        var user = await _getLoggedInUser.Execute(request);

        var key = $"parcels{user.Id}";
        var parcels = _cacheService.GetData<IEnumerable<Models.Parcel>>(key);

        if (parcels == null || !parcels.Any())
        {
            parcels = await (from parcel in _context.Parcels
                where parcel.UserId == user.Id
                select parcel).Include(p => p.Operations).Include(p => p.Polygon).ToListAsync();
            var expiryTime = DateTimeOffset.Now.AddMinutes(5);
            _cacheService.SetData(key, parcels, expiryTime);
        }

        return _mapper.Map<List<ParcelResponse>>(parcels);
    }
}