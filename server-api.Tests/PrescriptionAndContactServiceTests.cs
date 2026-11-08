using Microsoft.Extensions.Logging.Abstractions;
using ServerApi.Application.DTOs;
using ServerApi.Application.Services;
using ServerApi.Core.Enums;
using Xunit;

namespace ServerApi.Tests;

public class PrescriptionAndContactServiceTests
{
    [Fact]
    public async Task PrescriptionService_CreateAndRetrieve_NormalizesPhoneAndPersists()
    {
        var service = new PrescriptionService(NullLogger<PrescriptionService>.Instance);

        var dto = new CreatePrescriptionDto
        {
            PatientName = "أحمد محمد",
            PhoneNumber = "01012345678",
            Address = "ميت الرخا",
            Notes = "علاج شهري",
            RequiresDelivery = true
        };

        var created = await service.CreatePrescriptionAsync(dto);

        Assert.NotEqual(Guid.Empty, created.Id);
        Assert.Equal("أحمد محمد", created.PatientName);
        Assert.Equal("+201012345678", created.PhoneNumber); // Normalized E.164
        Assert.Equal(PrescriptionStatus.PendingReview, created.Status);

        var retrieved = await service.GetPrescriptionByIdAsync(created.Id);
        Assert.NotNull(retrieved);
        Assert.Equal(created.Id, retrieved.Id);

        var all = await service.GetAllPrescriptionsAsync();
        Assert.Contains(all, p => p.Id == created.Id);
    }

    [Fact]
    public async Task ContactService_SubmitAndRetrieve_NormalizesPhone()
    {
        var service = new ContactService(NullLogger<ContactService>.Instance);

        var dto = new CreateContactInquiryDto
        {
            Name = "فاطمة علي",
            Phone = "01234567890",
            Subject = "استفسار دواء",
            Message = "هل متوفر فيتامين د للأطفال؟"
        };

        var created = await service.SubmitInquiryAsync(dto);

        Assert.NotEqual(Guid.Empty, created.Id);
        Assert.Equal("فاطمة علي", created.Name);
        Assert.Equal("+201234567890", created.Phone); // Normalized
        Assert.False(created.IsResolved);

        var all = await service.GetAllInquiriesAsync();
        Assert.Contains(all, i => i.Id == created.Id);
    }
}

