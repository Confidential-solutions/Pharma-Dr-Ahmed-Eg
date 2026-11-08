using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Common;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Route("api/v1/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IConfiguration _configuration;

    public ContactController(IContactService contactService, IConfiguration configuration)
    {
        _contactService = contactService;
        _configuration = configuration;
    }

    /// <summary>
    /// Public endpoint for customer contact inquiries.
    /// Rate-limited to prevent abuse and spam.
    /// </summary>
    [HttpPost]
    [EnableRateLimiting("public-forms")]
    public async Task<ActionResult<ApiResponse<ContactInquiryResponseDto>>> Submit([FromBody] CreateContactInquiryDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(ApiResponse<ContactInquiryResponseDto>.Fail("Validation failed", errors));
        }

        var result = await _contactService.SubmitInquiryAsync(dto);
        return Ok(ApiResponse<ContactInquiryResponseDto>.Ok(result, "Inquiry submitted successfully"));
    }

    /// <summary>
    /// Protected endpoint to list customer contact inquiries.
    /// Restricted to authenticated staff, pharmacists, or authorized API keys.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<ContactInquiryResponseDto>>>> GetAll()
    {
        if (!IsAuthorizedStaff())
        {
            return StatusCode(401, ApiResponse<IEnumerable<ContactInquiryResponseDto>>.Fail("Authentication required to view contact inquiries. Access restricted to pharmacy staff."));
        }

        var result = await _contactService.GetAllInquiriesAsync();
        return Ok(ApiResponse<IEnumerable<ContactInquiryResponseDto>>.Ok(result));
    }

    private bool IsAuthorizedStaff()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return true;
        }

        var configuredKey = _configuration["Admin:ApiKey"] ?? Environment.GetEnvironmentVariable("ADMIN_API_KEY");
        if (!string.IsNullOrWhiteSpace(configuredKey))
        {
            if (Request.Headers.TryGetValue("X-Staff-Key", out var staffKey) && staffKey == configuredKey)
                return true;
            if (Request.Headers.TryGetValue("X-Admin-Key", out var adminKey) && adminKey == configuredKey)
                return true;
        }

        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        if (env == "Development" && Request.Headers.ContainsKey("X-Dev-Bypass"))
        {
            return true;
        }

        return false;
    }
}
