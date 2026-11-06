using ServerApi.Application.DTOs;
using ServerApi.Core.Entities;

namespace ServerApi.Application.Interfaces;

public interface IPharmacyService
{
    PharmacyInfoDto GetPharmacyInfo();
    IEnumerable<PharmacyServiceDto> GetServices();
    IEnumerable<OperatingHourItem> GetOperatingHours();
}

