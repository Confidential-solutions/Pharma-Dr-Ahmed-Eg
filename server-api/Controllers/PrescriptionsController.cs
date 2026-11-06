using Microsoft.AspNetCore.Mvc;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Common;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrescriptionsController : ControllerBase
{
    private readonly IPrescriptionService _prescriptionService;

    public PrescriptionsController(IPrescriptionService prescriptionService)
    {
        _prescriptionService = prescriptionService;
    }

    [HttpPost]
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

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<PrescriptionResponseDto>>> GetById(Guid id)
    {
        var result = await _prescriptionService.GetPrescriptionByIdAsync(id);
        if (result == null)
        {
            return NotFound(ApiResponse<PrescriptionResponseDto>.Fail($"Prescription order with ID '{id}' was not found."));
        }

        return Ok(ApiResponse<PrescriptionResponseDto>.Ok(result));
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<PrescriptionResponseDto>>>> GetAll()
    {
        var result = await _prescriptionService.GetAllPrescriptionsAsync();
        return Ok(ApiResponse<IEnumerable<PrescriptionResponseDto>>.Ok(result));
    }
}

