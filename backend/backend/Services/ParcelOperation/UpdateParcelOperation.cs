using AutoMapper;
using backend.Database;
using backend.DTOs.Request.Parcel;
using backend.DTOs.Response;
using backend.Services.Cache;

namespace backend.Services.ParcelOperation;

public class UpdateParcelOperation
{
    private readonly AppDbContext _context;
    private readonly GetParcelOperationById _getParcelOperationById;
    private readonly IMapper _mapper;
    private readonly ICacheService _cacheService;

    public UpdateParcelOperation(AppDbContext context, IMapper mapper, GetParcelOperationById getParcelOperationById, ICacheService cacheService)
    {
        _mapper = mapper;
        _context = context;
        _getParcelOperationById = getParcelOperationById;
        _cacheService = cacheService;
    }

    public async Task<ParcelOperationResponse> Execute(Guid id, CUParcelOperationRequest updateParcelOperationRequest)
    {
        var parcelOperation = await _getParcelOperationById.Execute(id);

        parcelOperation.Name = updateParcelOperationRequest.Name;
        parcelOperation.Description = updateParcelOperationRequest.Description;
        parcelOperation.LastEditDate = DateTime.UtcNow;

        _context.ParcelOperations.Update(parcelOperation);
        await _context.SaveChangesAsync();
        
        UpdateCache(parcelOperation);

        return _mapper.Map<ParcelOperationResponse>(parcelOperation);
    }
    
    private void UpdateCache(Models.ParcelOperation parcelOperation)
    {
        var key = $"parcelOperations{parcelOperation.ParcelId}";
        var parcelOperations = _cacheService.GetData<IEnumerable<Models.ParcelOperation>>(key);
        if (parcelOperations != null && parcelOperations.Any())
        {
            var parcelsList = parcelOperations.ToList();
            parcelsList.Remove(parcelsList.First(p => p.Id == parcelOperation.Id));
            parcelsList.Add(parcelOperation);
            var expiryTime = DateTimeOffset.Now.AddMinutes(5);
            _cacheService.SetData(key, parcelsList, expiryTime);
        }
    }
}