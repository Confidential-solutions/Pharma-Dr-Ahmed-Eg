using Scalar.AspNetCore;
using ServerApi.Extensions;
using ServerApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddResponseCompression(options => { options.EnableForHttps = true; });
builder.Services.AddResponseCaching();

// Register application services, Supabase client, CORS, and Rate Limiting
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Enable CORS at the beginning of the pipeline for immediate preflight OPTIONS handling
app.UseCors(ServiceCollectionExtensions.CorsPolicyName);

// Correlation ID middleware (generates/propagates X-Correlation-ID for distributed tracing)
app.UseMiddleware<CorrelationIdMiddleware>();

// Global exception handling middleware (safe envelopes, no internal leak)
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

// Rate limiting for abuse protection on public endpoints
app.UseRateLimiter();

// Performance: gzip / brotli compression & HTTP response caching
app.UseResponseCompression();
app.UseResponseCaching();

// Map native .NET 9 OpenAPI document: /openapi/v1.json
app.MapOpenApi();

// Modern Scalar API reference UI at /scalar/v1
app.MapScalarApiReference(options =>
{
    options.WithTitle("Dr. Ahmed Pharmacy API | صيدلية د. أحمد طارق سليم")
           .WithTheme(ScalarTheme.Moon);
});

// Interactive Swagger UI powered by OpenAPI spec: accessible at /swagger
app.MapGet("/swagger", () => Results.Content("""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dr. Ahmed Pharmacy API — Swagger UI</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    body { margin: 0; background: #fafafa; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .topbar { display: none !important; }
    .swagger-ui .info .title { font-size: 28px; color: #16a34a; }
    .header-banner { background: #16a34a; color: white; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
    .header-banner h1 { margin: 0; font-size: 18px; font-weight: 600; }
    .header-links a { color: #dcfce7; margin-left: 16px; text-decoration: none; font-size: 14px; font-weight: 500; }
    .header-links a:hover { text-decoration: underline; color: white; }
  </style>
</head>
<body>
  <div class="header-banner">
    <h1>💊 Dr. Ahmed Pharmacy API | صيدلية د. أحمد طارق سليم</h1>
    <div class="header-links">
      <a href="/scalar/v1" target="_blank">Scalar UI →</a>
      <a href="/openapi/v1.json" target="_blank">OpenAPI JSON</a>
      <a href="/api/health" target="_blank">Health Check</a>
    </div>
  </div>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        url: '/openapi/v1.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis],
        layout: "BaseLayout",
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1
      });
    };
  </script>
</body>
</html>
""", "text/html"));

// Root redirects to Swagger UI
app.MapGet("/", () => Results.Redirect("/swagger"));

app.UseAuthorization();

app.MapControllers();

app.Run();
