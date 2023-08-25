using AutoMapper;
using backend.DTOs.Response;
using backend.Models;

namespace backend.Profiles;

public class LocationProfile : Profile
{
    public LocationProfile()
    {
        CreateMap<Location, LocationDTO>()
            .ForMember(dest => dest.Latitude, options => options.MapFrom(src => src.Latitude))
            .ForMember(dest => dest.Longitude, options => options.MapFrom(src => src.Longitude))
            .ForMember(dest => dest.Index, options => options.MapFrom(src => src.Index));

        CreateMap<LocationDTO, Location>()
            .ForMember(dest => dest.Id, options => options.MapFrom(src => Guid.NewGuid()))
            .ForMember(dest => dest.Latitude, options => options.MapFrom(src => src.Latitude))
            .ForMember(dest => dest.Longitude, options => options.MapFrom(src => src.Longitude))
            .ForMember(dest => dest.Index, options => options.MapFrom(src => src.Index));
    }
}