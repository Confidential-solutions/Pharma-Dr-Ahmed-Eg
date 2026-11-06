using ServerApi.Application.DTOs;

namespace ServerApi.Application.Interfaces;

public interface IPrescriptionService
{
    Task<PrescriptionResponseDto> CreatePrescriptionAsync(CreatePrescriptionDto dto);
    Task<PrescriptionResponseDto?> GetPrescriptionByIdAsync(Guid id);
    Task<IEnumerable<PrescriptionResponseDto>> GetAllPrescriptionsAsync();
}

