namespace ServerApi.Core.Entities;

public class OperatingHourItem
{
    public string DaysArabic { get; set; } = string.Empty;
    public string DaysEnglish { get; set; } = string.Empty;
    public string TimeArabic { get; set; } = string.Empty;
    public string TimeEnglish { get; set; } = string.Empty;
}

public class PharmacyInfo
{
    public string NameArabic { get; set; } = "صيدلية د. أحمد طارق سليم";
    public string NameEnglish { get; set; } = "Dr. Ahmed Tarek Selim Pharmacy";
    public string ShortNameArabic { get; set; } = "صيدلية د. أحمد طارق";
    public string ShortNameEnglish { get; set; } = "Dr. Ahmed Tarek Pharmacy";
    public string PhoneDisplay { get; set; } = "+20 102 304 3122";
    public string PhoneHref { get; set; } = "tel:+201023043122";
    public string WhatsappNumber { get; set; } = "201023043122";
    public string FacebookUrl { get; set; } = "https://www.facebook.com/profile.php?id=61596102338642";
    public string AddressArabic { get; set; } = "ميت الرخا، مركز زفتى، محافظة الغربية – وسط البلد بجوار مسجد الشيخ إسماعيل";
    public string AddressEnglish { get; set; } = "Mit Al-Rakha, Zifta, Gharbia Governorate – Town Center next to Sheikh Ismail Mosque";
    public string MapQuery { get; set; } = "مسجد الشيخ إسماعيل ميت الرخا زفتى الغربية";
    public List<OperatingHourItem> Hours { get; set; } = new()
    {
        new() { DaysArabic = "السبت – الخميس", DaysEnglish = "Saturday – Thursday", TimeArabic = "٩ صباحًا – ١٢ منتصف الليل", TimeEnglish = "9:00 AM – 12:00 AM" },
        new() { DaysArabic = "الجمعة", DaysEnglish = "Friday", TimeArabic = "١ ظهرًا – ١٢ منتصف الليل", TimeEnglish = "1:00 PM – 12:00 AM" }
    };
}

public class PharmacyServiceItem
{
    public string Key { get; set; } = string.Empty;
    public string TitleArabic { get; set; } = string.Empty;
    public string TitleEnglish { get; set; } = string.Empty;
    public string DescriptionArabic { get; set; } = string.Empty;
    public string DescriptionEnglish { get; set; } = string.Empty;
    public string? IconName { get; set; }
    public string? ImageUrl { get; set; }
}
