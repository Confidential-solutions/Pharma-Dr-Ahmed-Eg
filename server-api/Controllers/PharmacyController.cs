using Microsoft.AspNetCore.Mvc;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Common;
using ServerApi.Core.Entities;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Route("api/v1/[controller]")]
public class PharmacyController : ControllerBase
{
    private readonly IPharmacyService _pharmacyService;

    public PharmacyController(IPharmacyService pharmacyService)
    {
        _pharmacyService = pharmacyService;
    }

    [HttpGet("info")]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<ApiResponse<PharmacyInfoDto>>> GetInfo()
    {
        var info = await _pharmacyService.GetPharmacyInfoAsync();
        return Ok(ApiResponse<PharmacyInfoDto>.Ok(info, "Pharmacy details retrieved successfully"));
    }

    [HttpGet("hours")]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<ApiResponse<IEnumerable<OperatingHourItem>>>> GetHours()
    {
        var hours = await _pharmacyService.GetOperatingHoursAsync();
        return Ok(ApiResponse<IEnumerable<OperatingHourItem>>.Ok(hours, "Operating hours retrieved successfully"));
    }
}
