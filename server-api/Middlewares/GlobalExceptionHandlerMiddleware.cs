using System.Net;
using System.Text.Json;
using ServerApi.Common;

namespace ServerApi.Middlewares;

public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public GlobalExceptionHandlerMiddleware(
        RequestDelegate next,
        ILogger<GlobalExceptionHandlerMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            var correlationId = context.Items[CorrelationIdMiddleware.CorrelationIdHeader]?.ToString()
                ?? context.TraceIdentifier;

            _logger.LogError(ex, "Unhandled server error occurred. CorrelationId: {CorrelationId}, Path: {Path}",
                correlationId, context.Request.Path);

            await HandleExceptionAsync(context, ex, correlationId);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception, string correlationId)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var errors = new List<string>();
        if (_env.IsDevelopment())
        {
            errors.Add(exception.Message);
            if (exception.StackTrace != null)
            {
                errors.Add(exception.StackTrace);
            }
        }

        var response = ApiResponse<object>.Fail(
            "An unexpected server error occurred. Please try again later.",
            errors.Count > 0 ? errors : null,
            correlationId
        );

        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        return context.Response.WriteAsync(json);
    }
}
