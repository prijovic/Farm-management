using AutoMapper;
using backend.DTOs.Response;
using backend.Models;

namespace backend.Profiles;

public class ParcelProfile : Profile
{
    public ParcelProfile()
    {
        CreateMap<Parcel, ParcelResponse>()
            .ForMember(dest => dest.Id, options => options.MapFrom(src => src.Id))
            .ForMember(dest => dest.CreationDate, options => options.MapFrom(src => src.CreationDate))
            .ForMember(dest => dest.LastEditDate, options => options.MapFrom(src => src.LastEditDate))
            .ForMember(dest => dest.Name, options => options.MapFrom(src => src.Name))
            .ForMember(dest => dest.Number, options => options.MapFrom(src => src.Number))
            .ForMember(dest => dest.Size, options => options.MapFrom(src => src.Size));
    }
}