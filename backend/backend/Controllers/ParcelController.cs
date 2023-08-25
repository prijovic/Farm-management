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
    private readonly CreateParcel _createParcel;
    private readonly CreateParcelOperation _createParcelOperation;
    private readonly DeleteParcel _deleteParcel;
    private readonly DeleteParcelOperation _deleteParcelOperation;
    private readonly GetAllParcelOperations _getAllParcelOperations;
    private readonly GetAllUserParcels _getAllUserParcels;
    private readonly UpdateParcel _updateParcel;
    private readonly UpdateParcelOperation _updateParcelOperation;
    private readonly UpdateParcelPolygon _updateParcelPolygon;

    public ParcelController(GetAllUserParcels getAllUserParcels, CreateParcel createParcel, UpdateParcel updateParcel,
        DeleteParcel deleteParcel, GetAllParcelOperations getAllParcelOperations,
        CreateParcelOperation createParcelOperation, UpdateParcelOperation updateParcelOperation,
        DeleteParcelOperation deleteParcelOperation, UpdateParcelPolygon updateParcelPolygon)
    {
        _getAllUserParcels = getAllUserParcels;
        _createParcel = createParcel;
        _updateParcel = updateParcel;
        _deleteParcel = deleteParcel;
        _getAllParcelOperations = getAllParcelOperations;
        _createParcelOperation = createParcelOperation;
        _updateParcelOperation = updateParcelOperation;
        _deleteParcelOperation = deleteParcelOperation;
        _updateParcelPolygon = updateParcelPolygon;
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

    [HttpPut("{id:guid}/polygon")]
    public async Task<ParcelResponse> UpdateParcelPolygon([FromRoute] Guid id,
        [FromBody] UpdateParcelPolygonRequest updateParcelPolygonRequest)
    {
        return await _updateParcelPolygon.Execute(id, updateParcelPolygonRequest.Polygon);
    }

    [HttpPut("operations/{id:guid}")]
    public async Task<ParcelOperationResponse> UpdateParcelOperation([FromRoute] Guid id,
        [FromBody] CUParcelOperationRequest updateParcelOperationRequest)
    {
        return await _updateParcelOperation.Execute(id, updateParcelOperationRequest);
    }

    [HttpDelete("{id:guid}")]
    public async Task<Guid> DeleteParcel([FromRoute] Guid id)
    {
        return await _deleteParcel.Execute(id);
    }

    [HttpDelete("operations/{id:guid}")]
    public async Task<Guid> DeleteParcelOperation([FromRoute] Guid id)
    {
        return await _deleteParcelOperation.Execute(id);
    }
}