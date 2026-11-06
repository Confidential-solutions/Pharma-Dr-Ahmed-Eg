using ServerApi.Core.Enums;

namespace ServerApi.Core.Entities;

public class PrescriptionRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string PatientName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string? Notes { get; set; }
    public string? ImageUrl { get; set; }
    public bool RequiresDelivery { get; set; } = true;
    public PrescriptionStatus Status { get; set; } = PrescriptionStatus.PendingReview;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

