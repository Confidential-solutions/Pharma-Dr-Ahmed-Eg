using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Common;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Route("api/v1/[controller]")]
public class PrescriptionsController : ControllerBase
{
    private readonly IPrescriptionService _prescriptionService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<PrescriptionsController> _logger;

    public PrescriptionsController(
        IPrescriptionService prescriptionService,
        IConfiguration configuration,
        ILogger<PrescriptionsController> logger)
    {
        _prescriptionService = prescriptionService;
        _configuration = configuration;
        _logger = logger;
    }

    /// <summary>
    /// Public endpoint for patients to submit prescription requests.
    /// Rate-limited to prevent abuse and spam.
    /// </summary>
    [HttpPost]
    [EnableRateLimiting("public-forms")]
    public async Task<ActionResult<ApiResponse<PrescriptionResponseDto>>> Create([FromBody] CreatePrescriptionDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(ApiResponse<PrescriptionResponseDto>.Fail("Validation failed", errors));
        }

        var result = await _prescriptionService.CreatePrescriptionAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, ApiResponse<PrescriptionResponseDto>.Ok(result, "Prescription submitted successfully"));
    }

    /// <summary>
    /// Protected endpoint to retrieve prescription details.
    /// Restricted to authenticated staff, pharmacists, or authorized API keys.
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<PrescriptionResponseDto>>> GetById(Guid id)
    {
        if (!IsAuthorizedStaff())
        {
            return StatusCode(401, ApiResponse<PrescriptionResponseDto>.Fail("Authentication required to view patient prescriptions. Only authorized pharmacy staff may access this record."));
        }

        var result = await _prescriptionService.GetPrescriptionByIdAsync(id);
        if (result == null)
        {
            return NotFound(ApiResponse<PrescriptionResponseDto>.Fail($"Prescription order with ID '{id}' was not found."));
        }

        return Ok(ApiResponse<PrescriptionResponseDto>.Ok(result));
    }

    /// <summary>
    /// Protected endpoint to list all patient prescriptions.
    /// Restricted to authenticated staff, pharmacists, or authorized API keys.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<PrescriptionResponseDto>>>> GetAll()
    {
        if (!IsAuthorizedStaff())
        {
            return StatusCode(401, ApiResponse<IEnumerable<PrescriptionResponseDto>>.Fail("Authentication required to view prescription records. Access restricted to pharmacy staff."));
        }

        var result = await _prescriptionService.GetAllPrescriptionsAsync();
        return Ok(ApiResponse<IEnumerable<PrescriptionResponseDto>>.Ok(result));
    }

    private bool IsAuthorizedStaff()
    {
        // 1. Authenticated identity (via JWT / Cookies)
        if (User.Identity?.IsAuthenticated == true)
        {
            return true;
        }

        // 2. Staff / Admin API Key header verification
        var configuredKey = _configuration["Admin:ApiKey"] ?? Environment.GetEnvironmentVariable("ADMIN_API_KEY");
        if (!string.IsNullOrWhiteSpace(configuredKey))
        {
            if (Request.Headers.TryGetValue("X-Staff-Key", out var staffKey) && staffKey == configuredKey)
                return true;
            if (Request.Headers.TryGetValue("X-Admin-Key", out var adminKey) && adminKey == configuredKey)
                return true;
        }

        // In Development mode, allow local development testing if dev header or flag is set
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        if (env == "Development" && Request.Headers.ContainsKey("X-Dev-Bypass"))
        {
            return true;
        }

        return false;
    }
}
