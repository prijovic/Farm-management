using System.Text.Json;
using backend.Configurations;
using StackExchange.Redis;

namespace backend.Services.Cache;

public class CacheService : ICacheService
{
    private readonly IDatabase _cacheDb;

    public CacheService(CacheConnectionString cacheConnectionString)
    {
        var redis = ConnectionMultiplexer.Connect(cacheConnectionString.Value);
        _cacheDb = redis.GetDatabase();
    }

    public T GetData<T>(string key)
    {
        var value = _cacheDb.StringGet(key);
        return !string.IsNullOrEmpty(value) ? JsonSerializer.Deserialize<T>(value) : default;
    }

    public bool SetData<T>(string key, T value, DateTimeOffset expirationTime)
    {
        var expiryTime = expirationTime.DateTime.Subtract(DateTime.Now);
        return _cacheDb.StringSet(key, JsonSerializer.Serialize(value), expiryTime);
    }

    public object RemoveData<T>(string key)
    {
        var keyExists = _cacheDb.KeyExists(key);
        return keyExists && _cacheDb.KeyDelete(key);
    }
}