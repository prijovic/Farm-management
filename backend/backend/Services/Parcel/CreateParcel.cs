using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Exceptions;
using backend.Services.auth;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Parcel;

public class CreateParcel
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;
    private readonly GetLoggedInUser _getLoggedInUser;

    public CreateParcel(AppDbContext context, IMapper mapper, GetLoggedInUser getLoggedInUser)
    {
        _mapper = mapper;
        _context = context;
        _getLoggedInUser = getLoggedInUser;
    }

    public async Task<ParcelResponse> Execute(HttpRequest request, CreateParcelRequest createParcelRequest)
    {
        var existingParcel = await _context.Parcels.FirstAsync((p) => p.Number == createParcelRequest.Number);
        if (existingParcel != null)
        {
            throw new ParcelExistsException();
        }
        
        var user = await _getLoggedInUser.Execute(request);

        var parcel = _mapper.Map<Models.Parcel>(createParcelRequest);
        parcel.User = user;
        parcel.UserId = user.Id;
        
        await _context.Parcels.AddAsync(parcel);
        await _context.SaveChangesAsync();
        
        return _mapper.Map<ParcelResponse>(parcel);
    }
}