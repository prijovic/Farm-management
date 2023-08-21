using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Services.Parcel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("parcel")]
public class ParcelController : ControllerBase
{
    private readonly GetAllUserParcels _getAllUserParcels;
    private readonly CreateParcel _createParcel;

    public ParcelController(GetAllUserParcels getAllUserParcels, CreateParcel createParcel)
    {
        _getAllUserParcels = getAllUserParcels;
        _createParcel = createParcel;
    }
    
    [HttpGet("all")]
    public async Task<List<ParcelResponse>> GetAllUserParcels()
    {
        return await _getAllUserParcels.Execute(Request);
    }

    [HttpPost]
    public async Task<ParcelResponse> CreateParcel([FromBody] CreateParcelRequest createParcelRequest)
    {
        return await _createParcel.Execute(Request, createParcelRequest);
    }
}