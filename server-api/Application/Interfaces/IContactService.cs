using ServerApi.Application.DTOs;

namespace ServerApi.Application.Interfaces;

public interface IContactService
{
    Task<ContactInquiryResponseDto> SubmitInquiryAsync(CreateContactInquiryDto dto);
    Task<IEnumerable<ContactInquiryResponseDto>> GetAllInquiriesAsync();
}

