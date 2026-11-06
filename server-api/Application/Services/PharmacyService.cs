using System.Web;
using ServerApi.Application.DTOs;
using ServerApi.Application.Interfaces;
using ServerApi.Core.Entities;

namespace ServerApi.Application.Services;

public class PharmacyService : IPharmacyService
{
    private readonly PharmacyInfo _info = new()
    {
        NameArabic = "صيدلية د. أحمد طارق سليم",
        NameEnglish = "Dr. Ahmed Tarek Selim Pharmacy",
        ShortNameArabic = "صيدلية د. أحمد طارق",
        ShortNameEnglish = "Dr. Ahmed Tarek Pharmacy",
        PhoneDisplay = "+20 1XX XXX XXXX",
        PhoneHref = "tel:+201000000000",
        WhatsappNumber = "201000000000",
        FacebookUrl = "https://facebook.com/",
        AddressArabic = "ميت الرخا، مركز زفتى، محافظة الغربية – وسط البلد بجوار مسجد الشيخ إسماعيل",
        AddressEnglish = "Mit Al-Rakha, Zifta, Gharbia Governorate – Town Center next to Sheikh Ismail Mosque",
        MapQuery = "مسجد الشيخ إسماعيل ميت الرخا زفتى الغربية",
        Hours = new List<OperatingHourItem>
        {
            new() { DaysArabic = "السبت – الخميس", DaysEnglish = "Saturday – Thursday", TimeArabic = "٩ صباحًا – ١٢ منتصف الليل", TimeEnglish = "9:00 AM – 12:00 AM" },
            new() { DaysArabic = "الجمعة", DaysEnglish = "Friday", TimeArabic = "١ ظهرًا – ١٢ منتصف الليل", TimeEnglish = "1:00 PM – 12:00 AM" }
        }
    };

    private readonly List<PharmacyServiceDto> _services = new()
    {
        new() { Key = "meds", TitleArabic = "أدوية", TitleEnglish = "Prescription & OTC Medicines", DescriptionArabic = "أدوية أصلية ومضمونة بأسعار رسمية، ونساعدك تلاقي البديل المناسب.", DescriptionEnglish = "Authentic pharmaceuticals, generic alternatives, and trusted medicine supply.", IconName = "Pill" },
        new() { Key = "beauty", TitleArabic = "مستحضرات تجميل", TitleEnglish = "Dermocosmetics & Skincare", DescriptionArabic = "منتجات عناية بالبشرة والشعر من ماركات موثوقة.", DescriptionEnglish = "Medical skincare, haircare, and certified beauty essentials.", IconName = "Sparkles" },
        new() { Key = "baby", TitleArabic = "رعاية الأم والطفل", TitleEnglish = "Mother & Baby Care", DescriptionArabic = "ألبان أطفال، حفاضات، ومستلزمات العناية بالأم والطفل.", DescriptionEnglish = "Baby formulas, pediatric nutrition, and maternal healthcare essentials.", IconName = "Baby" },
        new() { Key = "chronic", TitleArabic = "الأدوية المزمنة", TitleEnglish = "Chronic Disease Support", DescriptionArabic = "متابعة أدوية الضغط والسكر والقلب وتجهيزها شهريًا.", DescriptionEnglish = "Monthly medication refills, blood pressure & diabetic regimen monitoring.", IconName = "HeartPulse" },
        new() { Key = "delivery", TitleArabic = "توصيل للبيت", TitleEnglish = "Home Delivery", DescriptionArabic = "ابعت الروشتة على واتساب ونوصّلك طلبك داخل المنطقة.", DescriptionEnglish = "Rapid door-to-door delivery across Mit Al-Rakha and surrounding areas.", IconName = "Truck" },
        new() { Key = "consult", TitleArabic = "استشارة صيدلانية", TitleEnglish = "Pharmacist Consultation", DescriptionArabic = "اسأل عن جرعتك أو تداخلات الأدوية ببساطة ومن غير تعقيد.", DescriptionEnglish = "Professional clinical advice on dosages, drug interactions, and usage instructions.", IconName = "Stethoscope" }
    };

    public PharmacyInfoDto GetPharmacyInfo()
    {
        var encodedQuery = Uri.EscapeDataString(_info.MapQuery);
        return new PharmacyInfoDto
        {
            NameArabic = _info.NameArabic,
            NameEnglish = _info.NameEnglish,
            ShortNameArabic = _info.ShortNameArabic,
            ShortNameEnglish = _info.ShortNameEnglish,
            PhoneDisplay = _info.PhoneDisplay,
            PhoneHref = _info.PhoneHref,
            WhatsappNumber = _info.WhatsappNumber,
            FacebookUrl = _info.FacebookUrl,
            AddressArabic = _info.AddressArabic,
            AddressEnglish = _info.AddressEnglish,
            MapQuery = _info.MapQuery,
            MapEmbedUrl = $"https://maps.google.com/maps?q={encodedQuery}&z=16&output=embed",
            MapLink = $"https://www.google.com/maps/search/?api=1&query={encodedQuery}",
            Hours = _info.Hours
        };
    }

    public IEnumerable<PharmacyServiceDto> GetServices() => _services;

    public IEnumerable<OperatingHourItem> GetOperatingHours() => _info.Hours;
}

