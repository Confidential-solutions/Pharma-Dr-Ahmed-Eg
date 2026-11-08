using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace ServerApi.Common;

/// <summary>
/// Validates Egyptian mobile phone numbers (010, 011, 012, 015) with or without country code (+20/0020/20/0),
/// or standard international phone numbers.
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
public class EgyptianPhoneAttribute : ValidationAttribute
{
    private static readonly Regex EgyptianPhoneRegex = new(
        @"^(?:\+20|0020|20|0)?(1[0125][0-9]{8})$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    private static readonly Regex InternationalPhoneRegex = new(
        @"^\+[1-9]\d{7,14}$",
        RegexOptions.Compiled);

    public EgyptianPhoneAttribute()
        : base("رقم الهاتف يجب أن يكون رقم محمول مصري صحيح (مثال: 01012345678) / Invalid Egyptian phone number format (e.g. 01012345678)")
    {
    }

    public override bool IsValid(object? value)
    {
        if (value is null) return true;
        if (value is not string phone || string.IsNullOrWhiteSpace(phone)) return true;

        var clean = phone.Trim().Replace(" ", "").Replace("-", "");
        return EgyptianPhoneRegex.IsMatch(clean) || InternationalPhoneRegex.IsMatch(clean);
    }

    /// <summary>
    /// Normalizes valid Egyptian numbers into standard E.164 (+201XXXXXXXXX) format.
    /// </summary>
    public static string Normalize(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone)) return phone;
        var clean = phone.Trim().Replace(" ", "").Replace("-", "");
        var match = EgyptianPhoneRegex.Match(clean);
        if (match.Success)
        {
            var nationalPart = match.Groups[1].Value;
            return $"+20{nationalPart}";
        }
        return clean.StartsWith('+') ? clean : $"+{clean}";
    }
}
