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

    public ParcelController(GetAllUserParcels getAllUserParcels)
    {
        _getAllUserParcels = getAllUserParcels;
    }
    
    [HttpGet("all")]
    public async Task<List<ParcelResponse>> GetAllUserParcels()
    {
        return await _getAllUserParcels.Execute(Request);
    }
}