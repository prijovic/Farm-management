using AutoMapper;
using backend.Database;
using backend.DTOs.Response;
using backend.Services.auth;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class GetAllUserParcels
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;
    private readonly GetLoggedInUser _getLoggedInUser;

    public GetAllUserParcels(AppDbContext context, IMapper mapper, GetLoggedInUser getLoggedInUser)
    {
        _mapper = mapper;
        _context = context;
        _getLoggedInUser = getLoggedInUser;
    }

    public async Task<List<ParcelResponse>> Execute(HttpRequest request)
    {
        var user = await _getLoggedInUser.Execute(request);
        
        var parcels = await (from parcel in _context.Parcels
            where parcel.UserId == user.Id
            select parcel).Include(p => p.Operations).Include(p => p.Polygon).ToListAsync();

        return _mapper.Map<List<ParcelResponse>>(parcels);
    }
}