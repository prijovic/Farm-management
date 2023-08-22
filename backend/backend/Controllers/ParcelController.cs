using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Services.Parcel;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("parcel")]
public class ParcelController : ControllerBase
{
    private readonly GetAllUserParcels _getAllUserParcels;
    private readonly CreateParcel _createParcel;
    private readonly UpdateParcel _updateParcel;

    public ParcelController(GetAllUserParcels getAllUserParcels, CreateParcel createParcel, UpdateParcel updateParcel)
    {
        _getAllUserParcels = getAllUserParcels;
        _createParcel = createParcel;
        _updateParcel = updateParcel;
    }
    
    [HttpGet("all")]
    public async Task<List<ParcelResponse>> GetAllUserParcels()
    {
        return await _getAllUserParcels.Execute(Request);
    }

    [HttpPost]
    public async Task<ParcelResponse> CreateParcel([FromBody] CUParcelRequest cuParcelRequest)
    {
        return await _createParcel.Execute(Request, cuParcelRequest);
    }

    [HttpPut("{id:guid}")]
    public async Task<ParcelResponse> UpdateParcel([FromRoute] Guid id, [FromBody] CUParcelRequest updateParcelRequest)
    {
        return await _updateParcel.Execute(id, updateParcelRequest);
    }
}