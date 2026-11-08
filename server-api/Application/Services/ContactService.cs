using System.Collections.Concurrent;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Common;
using ServerApi.Core.Entities;

namespace ServerApi.Application.Services;

public class ContactService : IContactService
{
    private static readonly ConcurrentDictionary<Guid, ContactInquiry> _inquiries = new();
    private readonly ILogger<ContactService> _logger;

    public ContactService(ILogger<ContactService> logger)
    {
        _logger = logger;
    }

    public Task<ContactInquiryResponseDto> SubmitInquiryAsync(CreateContactInquiryDto dto)
    {
        var normalizedPhone = EgyptianPhoneAttribute.Normalize(dto.Phone);

        var entity = new ContactInquiry
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Phone = normalizedPhone,
            Subject = dto.Subject,
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow,
            IsResolved = false
        };

        _inquiries[entity.Id] = entity;

        _logger.LogInformation("Contact inquiry submitted. InquiryId: {InquiryId}, HasSubject: {HasSubject}",
            entity.Id, !string.IsNullOrWhiteSpace(entity.Subject));

        var result = new ContactInquiryResponseDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Phone = entity.Phone,
            Subject = entity.Subject,
            Message = entity.Message,
            IsResolved = entity.IsResolved,
            CreatedAt = entity.CreatedAt
        };

        return Task.FromResult(result);
    }

    public Task<IEnumerable<ContactInquiryResponseDto>> GetAllInquiriesAsync()
    {
        var list = _inquiries.Values.OrderByDescending(x => x.CreatedAt)
            .Select(x => new ContactInquiryResponseDto
            {
                Id = x.Id,
                Name = x.Name,
                Phone = x.Phone,
                Subject = x.Subject,
                Message = x.Message,
                IsResolved = x.IsResolved,
                CreatedAt = x.CreatedAt
            });

        return Task.FromResult<IEnumerable<ContactInquiryResponseDto>>(list.ToList());
    }
}
