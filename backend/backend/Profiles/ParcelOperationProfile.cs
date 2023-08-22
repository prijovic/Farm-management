using AutoMapper;
using backend.DTOs.Response;
using backend.Models;

namespace backend.Profiles;

public class ParcelOperationProfile : Profile
{
    public ParcelOperationProfile()
    {
        CreateMap<ParcelOperation, ParcelOperationResponse>()
            .ForMember(dest => dest.Id, options => options.MapFrom(src => src.Id))
            .ForMember(dest => dest.CreationDate, options => options.MapFrom(src => src.CreationDate))
            .ForMember(dest => dest.LastEditDate, options => options.MapFrom(src => src.LastEditDate))
            .ForMember(dest => dest.Name, options => options.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description, options => options.MapFrom(src => src.Description))
            .ForMember(dest => dest.Status, options => options.MapFrom(src => src.Status));
    }
}