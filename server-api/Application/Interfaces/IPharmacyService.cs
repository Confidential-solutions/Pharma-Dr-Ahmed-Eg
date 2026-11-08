using ServerApi.Application.DTOs;
using ServerApi.Core.Entities;

namespace ServerApi.Application.Interfaces;

public interface IPharmacyService
{
    Task<PharmacyInfoDto> GetPharmacyInfoAsync();
    Task<IEnumerable<PharmacyServiceDto>> GetServicesAsync();
    Task<IEnumerable<OperatingHourItem>> GetOperatingHoursAsync();

    PharmacyInfoDto GetPharmacyInfo();
    IEnumerable<PharmacyServiceDto> GetServices();
    IEnumerable<OperatingHourItem> GetOperatingHours();
}
