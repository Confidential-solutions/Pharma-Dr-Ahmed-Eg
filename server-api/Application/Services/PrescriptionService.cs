using System.Collections.Concurrent;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Core.Entities;
using ServerApi.Core.Enums;

namespace ServerApi.Application.Services;

public class PrescriptionService : IPrescriptionService
{
    private static readonly ConcurrentDictionary<Guid, PrescriptionRequest> _store = new();

    public Task<PrescriptionResponseDto> CreatePrescriptionAsync(CreatePrescriptionDto dto)
    {
        var entity = new PrescriptionRequest
        {
            Id = Guid.NewGuid(),
            PatientName = dto.PatientName,
            PhoneNumber = dto.PhoneNumber,
            Address = dto.Address,
            Notes = dto.Notes,
            ImageUrl = dto.ImageUrl,
            RequiresDelivery = dto.RequiresDelivery,
            Status = PrescriptionStatus.PendingReview,
            CreatedAt = DateTime.UtcNow
        };

        _store[entity.Id] = entity;

        return Task.FromResult(MapToDto(entity));
    }

    public Task<PrescriptionResponseDto?> GetPrescriptionByIdAsync(Guid id)
    {
        _store.TryGetValue(id, out var entity);
        return Task.FromResult(entity == null ? null : MapToDto(entity));
    }

    public Task<IEnumerable<PrescriptionResponseDto>> GetAllPrescriptionsAsync()
    {
        var list = _store.Values.OrderByDescending(x => x.CreatedAt).Select(MapToDto);
        return Task.FromResult<IEnumerable<PrescriptionResponseDto>>(list.ToList());
    }

    private static PrescriptionResponseDto MapToDto(PrescriptionRequest entity)
    {
        return new PrescriptionResponseDto
        {
            Id = entity.Id,
            PatientName = entity.PatientName,
            PhoneNumber = entity.PhoneNumber,
            Address = entity.Address,
            Notes = entity.Notes,
            ImageUrl = entity.ImageUrl,
            RequiresDelivery = entity.RequiresDelivery,
            Status = entity.Status,
            StatusText = entity.Status.ToString(),
            CreatedAt = entity.CreatedAt
        };
    }
}

