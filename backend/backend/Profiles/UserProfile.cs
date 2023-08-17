using System.Globalization;
using AutoMapper;
using backend.DTOs.Request.Auth;
using backend.DTOs.Response;
using backend.Models;

namespace backend.Profiles;

public class UserProfile : Profile
{
    private readonly TextInfo _textInfo = new CultureInfo("en-Us", false).TextInfo;

    public UserProfile()
    {
        CreateMap<SignUpRequest, User>()
            .ForMember(dest => dest.Id,
                options => options.MapFrom(src => Guid.NewGuid()))
            .ForMember(dest => dest.Name, options => options.MapFrom(src => _textInfo.ToTitleCase(src.Name)))
            .ForMember(dest => dest.Surname, options => options.MapFrom(src => _textInfo.ToTitleCase(src.Name)))
            .ForMember(dest => dest.Email, options => options.MapFrom(src => src.Email))
            .ForMember(dest => dest.UserName, options => options.MapFrom(src => src.Email))
            .ForMember(dest => dest.FarmName, options => options.MapFrom(src => src.FarmName))
            .ForMember(dest => dest.Address, options => options.MapFrom(src => src.Address));

        CreateMap<User, UserResponse>()
            .ForMember(dest => dest.Id, options => options.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, options => options.MapFrom(src => src.Name))
            .ForMember(dest => dest.Surname, options => options.MapFrom(src => src.Surname))
            .ForMember(dest => dest.Email, options => options.MapFrom(src => src.Email))
            .ForMember(dest => dest.Address, options => options.MapFrom(src => src.Address));

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