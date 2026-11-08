using ServerApi.Common;
using Xunit;

namespace ServerApi.Tests;

public class ApiResponseEnvelopeTests
{
    [Fact]
    public void ApiResponse_Ok_SetsSuccessAndCorrelationId()
    {
        var correlationId = Guid.NewGuid().ToString("N");
        var response = ApiResponse<string>.Ok("sample-data", "Operation successful", correlationId);

        Assert.True(response.Success);
        Assert.Equal("sample-data", response.Data);
        Assert.Equal("Operation successful", response.Message);
        Assert.Equal(correlationId, response.CorrelationId);
        Assert.Empty(response.Errors);
    }

    [Fact]
    public void ApiResponse_Fail_SetsFailureAndErrorsWithoutExposingInternals()
    {
        var correlationId = Guid.NewGuid().ToString("N");
        var errors = new List<string> { "First validation error" };
        var response = ApiResponse<object>.Fail("Validation failed", errors, correlationId);

        Assert.False(response.Success);
        Assert.Null(response.Data);
        Assert.Equal("Validation failed", response.Message);
        Assert.Equal(correlationId, response.CorrelationId);
        Assert.Single(response.Errors);
        Assert.Equal("First validation error", response.Errors[0]);
    }
}

