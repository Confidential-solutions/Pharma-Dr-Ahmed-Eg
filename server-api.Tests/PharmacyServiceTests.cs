using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using ServerApi.Application.Services;
using Xunit;

namespace ServerApi.Tests;

public class PharmacyServiceTests
{
    private readonly PharmacyService _service;

    public PharmacyServiceTests()
    {
        var services = new ServiceCollection();
        var serviceProvider = services.BuildServiceProvider();
        _service = new PharmacyService(serviceProvider, NullLogger<PharmacyService>.Instance);
    }

    [Fact]
    public void GetPharmacyInfo_ReturnsRealContactDetails()
    {
        var info = _service.GetPharmacyInfo();

        Assert.NotNull(info);
        Assert.Equal("+20 102 304 3122", info.PhoneDisplay);
        Assert.Equal("tel:+201023043122", info.PhoneHref);
        Assert.Equal("201023043122", info.WhatsappNumber);
        Assert.Contains("facebook.com", info.FacebookUrl);
        Assert.Contains("ميت الرخا", info.AddressArabic);
        Assert.Contains("maps.google.com", info.MapEmbedUrl);
        Assert.NotEmpty(info.Hours);
    }

    [Fact]
    public void GetServices_ReturnsSixCoreOfferings()
    {
        var services = _service.GetServices().ToList();

        Assert.Equal(6, services.Count);
        Assert.Contains(services, s => s.Key == "meds");
        Assert.Contains(services, s => s.Key == "beauty");
        Assert.Contains(services, s => s.Key == "baby");
        Assert.Contains(services, s => s.Key == "chronic");
        Assert.Contains(services, s => s.Key == "delivery");
        Assert.Contains(services, s => s.Key == "consult");
    }

    [Fact]
    public void GetOperatingHours_ReturnsShifts()
    {
        var hours = _service.GetOperatingHours().ToList();

        Assert.NotEmpty(hours);
        Assert.Contains(hours, h => h.DaysEnglish.Contains("Saturday"));
        Assert.Contains(hours, h => h.DaysEnglish.Contains("Friday"));
    }
}

