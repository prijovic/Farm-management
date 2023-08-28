using AutoMapper;
using backend.DTOs.Request.Parcel;
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
            .ForMember(dest => dest.Size, options => options.MapFrom(src => src.Size))
            .ForMember(dest => dest.Polygon, options => options.MapFrom(src => src.Polygon))
            .ForMember(dest => dest.PlannedOperations, options => options.MapFrom(src => src.Operations.Where(o => o.Status == ParcelOperationStatus.Planned).ToList().Count))
            .ForMember(dest => dest.InProgressOperations, options => options.MapFrom(src => src.Operations.Where(o => o.Status == ParcelOperationStatus.InProgress).ToList().Count))
            .ForMember(dest => dest.FinishedOperations, options => options.MapFrom(src => src.Operations.Where(o => o.Status == ParcelOperationStatus.Completed).ToList().Count));

        CreateMap<CUParcelRequest, Parcel>()
            .ForMember(dest => dest.Name, options => options.MapFrom(src => src.Name))
            .ForMember(dest => dest.Number, options => options.MapFrom(src => src.Number))
            .ForMember(dest => dest.Size, options => options.MapFrom(src => src.Size));
    }
}