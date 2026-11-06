using ServerApi.Core.Entities;

namespace ServerApi.Application.DTOs;

public class PharmacyInfoDto
{
    public string NameArabic { get; set; } = string.Empty;
    public string NameEnglish { get; set; } = string.Empty;
    public string ShortNameArabic { get; set; } = string.Empty;
    public string ShortNameEnglish { get; set; } = string.Empty;
    public string PhoneDisplay { get; set; } = string.Empty;
    public string PhoneHref { get; set; } = string.Empty;
    public string WhatsappNumber { get; set; } = string.Empty;
    public string FacebookUrl { get; set; } = string.Empty;
    public string AddressArabic { get; set; } = string.Empty;
    public string AddressEnglish { get; set; } = string.Empty;
    public string MapQuery { get; set; } = string.Empty;
    public string MapEmbedUrl { get; set; } = string.Empty;
    public string MapLink { get; set; } = string.Empty;
    public List<OperatingHourItem> Hours { get; set; } = new();
}

public class PharmacyServiceDto
{
    public string Key { get; set; } = string.Empty;
    public string TitleArabic { get; set; } = string.Empty;
    public string TitleEnglish { get; set; } = string.Empty;
    public string DescriptionArabic { get; set; } = string.Empty;
    public string DescriptionEnglish { get; set; } = string.Empty;
    public string? IconName { get; set; }
}

