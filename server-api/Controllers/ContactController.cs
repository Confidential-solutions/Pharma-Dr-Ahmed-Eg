using Microsoft.AspNetCore.Mvc;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Common;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpPost]
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

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<ContactInquiryResponseDto>>>> GetAll()
    {
        var result = await _contactService.GetAllInquiriesAsync();
        return Ok(ApiResponse<IEnumerable<ContactInquiryResponseDto>>.Ok(result));
    }
}

