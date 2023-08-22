using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Services.Parcel;
using backend.Services.ParcelOperation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[ApiController]
[Route("parcel")]
public class ParcelController : ControllerBase
{
    private readonly GetAllUserParcels _getAllUserParcels;
    private readonly CreateParcel _createParcel;
    private readonly UpdateParcel _updateParcel;
    private readonly DeleteParcel _deleteParcel;
    private readonly GetAllParcelOperations _getAllParcelOperations;
    private readonly CreateParcelOperation _createParcelOperation;

    public ParcelController(GetAllUserParcels getAllUserParcels, CreateParcel createParcel, UpdateParcel updateParcel, DeleteParcel deleteParcel, GetAllParcelOperations getAllParcelOperations, CreateParcelOperation createParcelOperation)
    {
        _getAllUserParcels = getAllUserParcels;
        _createParcel = createParcel;
        _updateParcel = updateParcel;
        _deleteParcel = deleteParcel;
        _getAllParcelOperations = getAllParcelOperations;
        _createParcelOperation = createParcelOperation;
    }
    
    [HttpGet("all")]
    public async Task<List<ParcelResponse>> GetAllUserParcels()
    {
        return await _getAllUserParcels.Execute(Request);
    }

    [HttpGet("{id:guid}/operations")]
    public async Task<List<ParcelOperationResponse>> GetAllParcelsOperations([FromRoute] Guid id)
    {
        return await _getAllParcelOperations.Execute(id);
    }

    [HttpPost]
    public async Task<ParcelResponse> CreateParcel([FromBody] CUParcelRequest cuParcelRequest)
    {
        return await _createParcel.Execute(Request, cuParcelRequest);
    }

    [HttpPost("{id:guid}/operations")]
    public async Task<ParcelOperationResponse> CreateParcelOperation([FromRoute] Guid id,
        [FromBody] CUParcelOperationRequest cuParcelOperationRequest)
    {
        return await _createParcelOperation.Execute(id, cuParcelOperationRequest);
    }

    [HttpPut("{id:guid}")]
    public async Task<ParcelResponse> UpdateParcel([FromRoute] Guid id, [FromBody] CUParcelRequest updateParcelRequest)
    {
        return await _updateParcel.Execute(id, updateParcelRequest);
    }

    [HttpDelete("{id:guid}")]
    public async Task<Guid> DeleteParcel([FromRoute] Guid id)
    {
        return await _deleteParcel.Execute(id);
    }
}