using Microsoft.AspNetCore.Mvc;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Common;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IPharmacyService _pharmacyService;

    public ServicesController(IPharmacyService pharmacyService)
    {
        _pharmacyService = pharmacyService;
    }

    [HttpGet]
    public ActionResult<ApiResponse<IEnumerable<PharmacyServiceDto>>> GetAll()
    {
        var services = _pharmacyService.GetServices();
        return Ok(ApiResponse<IEnumerable<PharmacyServiceDto>>.Ok(services, "Services retrieved successfully"));
    }
}

