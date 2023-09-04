using backend.Database;
using backend.Exceptions;
using backend.Services.Cache;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ParcelOperation;

public class DeleteParcelOperation
{
    private readonly AppDbContext _context;
    private readonly ICacheService _cacheService;

    public DeleteParcelOperation(AppDbContext context, ICacheService cacheService)
    {
        _context = context;
        _cacheService = cacheService;
    }

    public async Task<Guid> Execute(Guid id)
    {
        var parcelOperation = await _context.ParcelOperations.FirstAsync(p => p.Id == id);

        if (parcelOperation == null)
        {
            throw new NotFoundException("Parcel operation not found");
        }

        _context.ParcelOperations.Remove(parcelOperation);
        await _context.SaveChangesAsync();

        RemoveFromCache(parcelOperation);
        
        return id;
    }
    
    private void RemoveFromCache(Models.ParcelOperation parcelOperation)
    {
        var key = $"parcelOperations{parcelOperation.ParcelId}";
        var parcelOperations = _cacheService.GetData<IEnumerable<Models.ParcelOperation>>(key);
        if (parcelOperations != null || parcelOperations.Any())
        {
            var parcelOperationsList = parcelOperations.ToList();
            parcelOperationsList.Remove(parcelOperationsList.First(po => po.Id == parcelOperation.Id));
            var expiryTime = DateTimeOffset.Now.AddMinutes(5);
            _cacheService.SetData(key, parcelOperationsList, expiryTime);
        }
    }
}