using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Exceptions;
using backend.Services.auth;
using backend.Services.Cache;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class CreateParcel
{
    private readonly ICacheService _cacheService;
    private readonly AppDbContext _context;
    private readonly GetLoggedInUser _getLoggedInUser;
    private readonly IMapper _mapper;

    public CreateParcel(AppDbContext context, IMapper mapper, GetLoggedInUser getLoggedInUser,
        ICacheService cacheService)
    {
        _mapper = mapper;
        _context = context;
        _getLoggedInUser = getLoggedInUser;
        _cacheService = cacheService;
    }

    public async Task<ParcelResponse> Execute(HttpRequest request, CUParcelRequest cuParcelRequest)
    {
        var existingParcel = await _context.Parcels.FirstOrDefaultAsync(p => p.Number == cuParcelRequest.Number);
        if (existingParcel != null) throw new ParcelExistsException();

        var user = await _getLoggedInUser.Execute(request);

        var parcel = _mapper.Map<Models.Parcel>(cuParcelRequest);
        parcel.User = user;
        parcel.UserId = user.Id;

        await _context.Parcels.AddAsync(parcel);
        await _context.SaveChangesAsync();

        AddToCache(parcel);

        return _mapper.Map<ParcelResponse>(parcel);
    }

    private void AddToCache(Models.Parcel parcel)
    {
        var key = $"parcels{parcel.UserId}";
        var parcels = _cacheService.GetData<IEnumerable<Models.Parcel>>(key) ?? new List<Models.Parcel>();
        parcels = parcels.Append(parcel);
        var expiryTime = DateTimeOffset.Now.AddMinutes(5);
        _cacheService.SetData(key, parcels, expiryTime);
    }
}