using ServerApi.Common;
using Xunit;

namespace ServerApi.Tests;

public class EgyptianPhoneValidationTests
{
    private readonly EgyptianPhoneAttribute _validator = new();

    [Theory]
    [InlineData("01012345678")]
    [InlineData("01112345678")]
    [InlineData("01212345678")]
    [InlineData("01512345678")]
    [InlineData("+201012345678")]
    [InlineData("201012345678")]
    [InlineData("00201012345678")]
    [InlineData("+20 102 304 3122")]
    [InlineData("+966501234567")] // International format
    public void IsValid_WithValidEgyptianOrInternationalNumber_ReturnsTrue(string phone)
    {
        var isValid = _validator.IsValid(phone);
        Assert.True(isValid);
    }

    [Theory]
    [InlineData("12345")]
    [InlineData("01312345678")] // 013 is not mobile (landline)
    [InlineData("01412345678")] // 014 doesn't exist
    [InlineData("invalid-phone")]
    [InlineData("0101234567")]   // 10 digits instead of 11
    public void IsValid_WithInvalidNumber_ReturnsFalse(string phone)
    {
        var isValid = _validator.IsValid(phone);
        Assert.False(isValid);
    }

    [Theory]
    [InlineData("01012345678", "+201012345678")]
    [InlineData("+201012345678", "+201012345678")]
    [InlineData("201012345678", "+201012345678")]
    [InlineData("00201012345678", "+201012345678")]
    [InlineData("010 1234 5678", "+201012345678")]
    public void Normalize_ValidEgyptianNumber_ReturnsE164Format(string input, string expected)
    {
        var normalized = EgyptianPhoneAttribute.Normalize(input);
        Assert.Equal(expected, normalized);
    }
}

