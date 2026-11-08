using System.ComponentModel.DataAnnotations;
using ServerApi.Common;

namespace ServerApi.Application.DTOs;

public class CreateContactInquiryDto
{
    [Required(ErrorMessage = "الاسم مطلوب / Name is required")]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "رقم الهاتف مطلوب / Phone is required")]
    [EgyptianPhone]
    public string Phone { get; set; } = string.Empty;

    public string? Subject { get; set; }

    [Required(ErrorMessage = "الرسالة مطلوبة / Message is required")]
    [StringLength(1000, MinimumLength = 5)]
    public string Message { get; set; } = string.Empty;
}

public class ContactInquiryResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Subject { get; set; }
    public string Message { get; set; } = string.Empty;
    public bool IsResolved { get; set; }
    public DateTime CreatedAt { get; set; }
}

