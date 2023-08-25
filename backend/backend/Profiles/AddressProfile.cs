using AutoMapper;
using backend.DTOs.Response;
using backend.Models;

namespace backend.Profiles;

public class AddressProfile : Profile
{
    public AddressProfile()
    {
        CreateMap<Address, AddressDTO>()
            .ForMember(dest => dest.Country, options => options.MapFrom(src => src.Country))
            .ForMember(dest => dest.Place, options => options.MapFrom(src => src.Place))
            .ForMember(dest => dest.Street, options => options.MapFrom(src => src.Street))
            .ForMember(dest => dest.PostalCode, options => options.MapFrom(src => src.PostalCode))
            .ForMember(dest => dest.Number, options => options.MapFrom(src => src.Number));

        CreateMap<AddressDTO, Address>()
            .ForMember(dest => dest.Id, options => options.MapFrom(src => Guid.NewGuid()))
            .ForMember(dest => dest.Country, options => options.MapFrom(src => src.Country))
            .ForMember(dest => dest.Place, options => options.MapFrom(src => src.Place))
            .ForMember(dest => dest.Street, options => options.MapFrom(src => src.Street))
            .ForMember(dest => dest.PostalCode, options => options.MapFrom(src => src.PostalCode))
            .ForMember(dest => dest.Number, options => options.MapFrom(src => src.Number));
    }
}