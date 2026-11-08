using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ServerApi.Models;

[Table("pharmacy_info")]
public class PharmacyInfoDb : BaseModel
{
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    [Column("name_ar")]
    public string NameArabic { get; set; } = string.Empty;

    [Column("name_en")]
    public string NameEnglish { get; set; } = string.Empty;

    [Column("short_name_ar")]
    public string ShortNameArabic { get; set; } = string.Empty;

    [Column("short_name_en")]
    public string ShortNameEnglish { get; set; } = string.Empty;

    [Column("phone_display")]
    public string PhoneDisplay { get; set; } = string.Empty;

    [Column("phone_href")]
    public string PhoneHref { get; set; } = string.Empty;

    [Column("whatsapp_number")]
    public string WhatsappNumber { get; set; } = string.Empty;

    [Column("facebook_url")]
    public string? FacebookUrl { get; set; }

    [Column("address_ar")]
    public string AddressArabic { get; set; } = string.Empty;

    [Column("address_en")]
    public string AddressEnglish { get; set; } = string.Empty;

    [Column("map_query")]
    public string MapQuery { get; set; } = string.Empty;

    [Column("hours")]
    public string? HoursJson { get; set; }
}

[Table("services")]
public class ServiceDb : BaseModel
{
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    [Column("key")]
    public string Key { get; set; } = string.Empty;

    [Column("title_ar")]
    public string TitleArabic { get; set; } = string.Empty;

    [Column("title_en")]
    public string TitleEnglish { get; set; } = string.Empty;

    [Column("description_ar")]
    public string DescriptionArabic { get; set; } = string.Empty;

    [Column("description_en")]
    public string DescriptionEnglish { get; set; } = string.Empty;

    [Column("icon_name")]
    public string? IconName { get; set; }

    [Column("image_url")]
    public string? ImageUrl { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; } = true;
}
