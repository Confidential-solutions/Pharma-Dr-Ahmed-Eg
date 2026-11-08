using System.ComponentModel.DataAnnotations;
using ServerApi.Common;
using ServerApi.Core.Enums;

namespace ServerApi.Application.DTOs;

public class CreatePrescriptionDto
{
    [Required(ErrorMessage = "اسم المريض مطلوب / Patient name is required")]
    [StringLength(100, MinimumLength = 2)]
    public string PatientName { get; set; } = string.Empty;

    [Required(ErrorMessage = "رقم الهاتف مطلوب / Phone number is required")]
    [EgyptianPhone]
    public string PhoneNumber { get; set; } = string.Empty;

    public string? Address { get; set; }
    public string? Notes { get; set; }
    public string? ImageUrl { get; set; }
    public bool RequiresDelivery { get; set; } = true;
}

public class PrescriptionResponseDto
{
    public Guid Id { get; set; }
    public string PatientName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string? Notes { get; set; }
    public string? ImageUrl { get; set; }
    public bool RequiresDelivery { get; set; }
    public PrescriptionStatus Status { get; set; }
    public string StatusText { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

