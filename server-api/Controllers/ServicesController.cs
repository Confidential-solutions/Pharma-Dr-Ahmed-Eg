using Microsoft.AspNetCore.Mvc;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Common;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Route("api/v1/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IPharmacyService _pharmacyService;

    public ServicesController(IPharmacyService pharmacyService)
    {
        _pharmacyService = pharmacyService;
    }

    [HttpGet]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<ApiResponse<IEnumerable<PharmacyServiceDto>>>> GetAll()
    {
        var services = await _pharmacyService.GetServicesAsync();
        return Ok(ApiResponse<IEnumerable<PharmacyServiceDto>>.Ok(services, "Services retrieved successfully"));
    }
}
