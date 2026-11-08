using System.Text.Json;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Core.Entities;
using ServerApi.Models;

namespace ServerApi.Application.Services;

public class PharmacyService : IPharmacyService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<PharmacyService> _logger;

    private readonly PharmacyInfo _fallbackInfo = new()
    {
        NameArabic = "صيدلية د. أحمد طارق سليم",
        NameEnglish = "Dr. Ahmed Tarek Selim Pharmacy",
        ShortNameArabic = "صيدلية د. أحمد طارق",
        ShortNameEnglish = "Dr. Ahmed Tarek Pharmacy",
        PhoneDisplay = "+20 102 304 3122",
        PhoneHref = "tel:+201023043122",
        WhatsappNumber = "201023043122",
        FacebookUrl = "https://www.facebook.com/profile.php?id=61596102338642",
        AddressArabic = "ميت الرخا، مركز زفتى، محافظة الغربية – وسط البلد بجوار مسجد الشيخ إسماعيل",
        AddressEnglish = "Mit Al-Rakha, Zifta, Gharbia Governorate – Town Center next to Sheikh Ismail Mosque",
        MapQuery = "مسجد الشيخ إسماعيل ميت الرخا زفتى الغربية",
        Hours = new List<OperatingHourItem>
        {
            new() { DaysArabic = "السبت – الخميس", DaysEnglish = "Saturday – Thursday", TimeArabic = "٩ صباحًا – ١٢ منتصف الليل", TimeEnglish = "9:00 AM – 12:00 AM" },
            new() { DaysArabic = "الجمعة", DaysEnglish = "Friday", TimeArabic = "١ ظهرًا – ١٢ منتصف الليل", TimeEnglish = "1:00 PM – 12:00 AM" }
        }
    };

    private readonly List<PharmacyServiceDto> _fallbackServices = new()
    {
        new() { Key = "meds", TitleArabic = "أدوية", TitleEnglish = "Prescription & OTC Medicines", DescriptionArabic = "أدوية أصلية ومضمونة بأسعار رسمية، ونساعدك تلاقي البديل المناسب.", DescriptionEnglish = "Authentic pharmaceuticals, generic alternatives, and trusted medicine supply.", IconName = "Pill", ImageUrl = "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/medicines.jpg" },
        new() { Key = "beauty", TitleArabic = "مستحضرات تجميل", TitleEnglish = "Dermocosmetics & Skincare", DescriptionArabic = "منتجات عناية بالبشرة والشعر من ماركات موثوقة.", DescriptionEnglish = "Medical skincare, haircare, and certified beauty essentials.", IconName = "Sparkles", ImageUrl = "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/beauty-care.jpg" },
        new() { Key = "baby", TitleArabic = "رعاية الأم والطفل", TitleEnglish = "Mother & Baby Care", DescriptionArabic = "ألبان أطفال، حفاضات، ومستلزمات العناية بالأم والطفل.", DescriptionEnglish = "Baby formulas, pediatric nutrition, and maternal healthcare essentials.", IconName = "Baby", ImageUrl = "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/baby-care.jpg" },
        new() { Key = "chronic", TitleArabic = "الأدوية المزمنة", TitleEnglish = "Chronic Disease Support", DescriptionArabic = "متابعة أدوية الضغط والسكر والقلب وتجهيزها شهريًا.", DescriptionEnglish = "Monthly medication refills, blood pressure & diabetic regimen monitoring.", IconName = "HeartPulse", ImageUrl = "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/pharmacist.jpg" },
        new() { Key = "delivery", TitleArabic = "توصيل للبيت", TitleEnglish = "Home Delivery", DescriptionArabic = "ابعت الروشتة على واتساب ونوصّلك طلبك داخل المنطقة.", DescriptionEnglish = "Rapid door-to-door delivery across Mit Al-Rakha and surrounding areas.", IconName = "Truck", ImageUrl = "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/delivery.jpg" },
        new() { Key = "consult", TitleArabic = "استشارة صيدلانية", TitleEnglish = "Pharmacist Consultation", DescriptionArabic = "اسأل عن جرعتك أو تداخلات الأدوية ببساطة ومن غير تعقيد.", DescriptionEnglish = "Professional clinical advice on dosages, drug interactions, and usage instructions.", IconName = "Stethoscope", ImageUrl = "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/bp-check.jpg" }
    };

    public PharmacyService(IServiceProvider serviceProvider, ILogger<PharmacyService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    public async Task<PharmacyInfoDto> GetPharmacyInfoAsync()
    {
        try
        {
            using var scope = _serviceProvider.CreateScope();
            var supabase = scope.ServiceProvider.GetService<Supabase.Client>();
            if (supabase != null)
            {
                var response = await supabase.From<PharmacyInfoDb>().Get();
                var model = response.Models.FirstOrDefault();
                if (model != null)
                {
                    var hours = ParseHoursJson(model.HoursJson) ?? _fallbackInfo.Hours;
                    var mapQuery = string.IsNullOrWhiteSpace(model.MapQuery) ? _fallbackInfo.MapQuery : model.MapQuery;
                    var encodedQuery = Uri.EscapeDataString(mapQuery);

                    return new PharmacyInfoDto
                    {
                        NameArabic = model.NameArabic,
                        NameEnglish = model.NameEnglish,
                        ShortNameArabic = model.ShortNameArabic,
                        ShortNameEnglish = model.ShortNameEnglish,
                        PhoneDisplay = model.PhoneDisplay,
                        PhoneHref = model.PhoneHref,
                        WhatsappNumber = model.WhatsappNumber,
                        FacebookUrl = model.FacebookUrl,
                        AddressArabic = model.AddressArabic,
                        AddressEnglish = model.AddressEnglish,
                        MapQuery = mapQuery,
                        MapEmbedUrl = $"https://maps.google.com/maps?q={encodedQuery}&z=16&output=embed",
                        MapLink = $"https://www.google.com/maps/search/?api=1&query={encodedQuery}",
                        Hours = hours ?? _fallbackInfo.Hours
                    };
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to load pharmacy_info from Supabase; using validated fallback.");
        }

        return GetPharmacyInfo();
    }

    public async Task<IEnumerable<PharmacyServiceDto>> GetServicesAsync()
    {
        try
        {
            using var scope = _serviceProvider.CreateScope();
            var supabase = scope.ServiceProvider.GetService<Supabase.Client>();
            if (supabase != null)
            {
                var response = await supabase.From<ServiceDb>()
                    .Where(x => x.IsActive == true)
                    .Get();

                if (response.Models.Count > 0)
                {
                    return response.Models.Select(m => new PharmacyServiceDto
                    {
                        Key = m.Key,
                        TitleArabic = m.TitleArabic,
                        TitleEnglish = m.TitleEnglish,
                        DescriptionArabic = m.DescriptionArabic,
                        DescriptionEnglish = m.DescriptionEnglish,
                        IconName = m.IconName ?? "Pill",
                        ImageUrl = m.ImageUrl
                    }).ToList();
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to load services from Supabase; using validated fallback.");
        }

        return GetServices();
    }

    public async Task<IEnumerable<OperatingHourItem>> GetOperatingHoursAsync()
    {
        var info = await GetPharmacyInfoAsync();
        return info.Hours;
    }

    public PharmacyInfoDto GetPharmacyInfo()
    {
        var encodedQuery = Uri.EscapeDataString(_fallbackInfo.MapQuery);
        return new PharmacyInfoDto
        {
            NameArabic = _fallbackInfo.NameArabic,
            NameEnglish = _fallbackInfo.NameEnglish,
            ShortNameArabic = _fallbackInfo.ShortNameArabic,
            ShortNameEnglish = _fallbackInfo.ShortNameEnglish,
            PhoneDisplay = _fallbackInfo.PhoneDisplay,
            PhoneHref = _fallbackInfo.PhoneHref,
            WhatsappNumber = _fallbackInfo.WhatsappNumber,
            FacebookUrl = _fallbackInfo.FacebookUrl,
            AddressArabic = _fallbackInfo.AddressArabic,
            AddressEnglish = _fallbackInfo.AddressEnglish,
            MapQuery = _fallbackInfo.MapQuery,
            MapEmbedUrl = $"https://maps.google.com/maps?q={encodedQuery}&z=16&output=embed",
            MapLink = $"https://www.google.com/maps/search/?api=1&query={encodedQuery}",
            Hours = _fallbackInfo.Hours
        };
    }

    public IEnumerable<PharmacyServiceDto> GetServices() => _fallbackServices;

    public IEnumerable<OperatingHourItem> GetOperatingHours() => _fallbackInfo.Hours;

    private static List<OperatingHourItem>? ParseHoursJson(string? json)
    {
        if (string.IsNullOrWhiteSpace(json)) return null;
        try
        {
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            return JsonSerializer.Deserialize<List<OperatingHourItem>>(json, options);
        }
        catch
        {
            return null;
        }
    }
}
