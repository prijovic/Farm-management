using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Models;
using backend.Services.Cache;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ParcelOperation;

public class UpdateParcelOperationPosition
{
    private readonly AppDbContext _context;
    private readonly GetAllParcelOperations _getAllParcelOperations;
    private readonly GetParcelOperationById _getParcelOperationById;

    private readonly IMapper _mapper;
    private readonly ICacheService _cacheService;

    public UpdateParcelOperationPosition(AppDbContext context, IMapper mapper, ICacheService cacheService,
        GetParcelOperationById getParcelOperationById, GetAllParcelOperations getAllParcelOperations)
    {
        _mapper = mapper;
        _context = context;
        _cacheService = cacheService;
        _getParcelOperationById = getParcelOperationById;
        _getAllParcelOperations = getAllParcelOperations;
    }

    public async Task<List<ParcelOperationResponse>> Execute(Guid id,
        UpdateParcelOperationPositionRequest updateParcelOperationPositionRequest)
    {
        var operation = await _getParcelOperationById.Execute(id);

        await UpdateSurroundingParcelOperationsIndexes(operation.ParcelId, operation.Index,
            updateParcelOperationPositionRequest.Index, operation.Status,
            updateParcelOperationPositionRequest.Status);
        operation.Status = updateParcelOperationPositionRequest.Status;
        operation.Index = updateParcelOperationPositionRequest.Index;

        _context.ParcelOperations.Update(operation);
        await _context.SaveChangesAsync();

        return _mapper.Map<List<ParcelOperationResponse>>(
            await _getAllParcelOperations.Execute(operation.ParcelId));
    }

    private async Task UpdateSurroundingParcelOperationsIndexes(Guid parcelId,
        int oldIndex,
        int newIndex,
        ParcelOperationStatus oldStatus,
        ParcelOperationStatus newStatus)
    {
        var sameStatus = oldStatus == newStatus;

        var parcelOperations = await _context.ParcelOperations
            .Where(p => p.ParcelId == parcelId)
            .ToListAsync();

        foreach (var operation in parcelOperations)
        {
            if (sameStatus)
            {
                if (operation.Status == oldStatus)
                {
                    if (oldIndex > newIndex && operation.Index >= newIndex && operation.Index < oldIndex)
                    {
                        operation.Index += 1;
                    }
                    else if (oldIndex < newIndex && operation.Index <= newIndex && operation.Index > oldIndex)
                    {
                        operation.Index -= 1;
                    }
                }
            }
            else
            {
                if (operation.Status == oldStatus && operation.Index > oldIndex)
                {
                    operation.Index -= 1;
                }
                else if (operation.Status == newStatus && operation.Index >= newIndex)
                {
                    operation.Index += 1;
                }
            }

            _context.ParcelOperations.Update(operation);
        }

        await _context.SaveChangesAsync();
    }
}