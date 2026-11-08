using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using ServerApi.Application.Interfaces;
using ServerApi.Application.Services;
using Supabase;

namespace ServerApi.Extensions;

public static class ServiceCollectionExtensions
{
    public const string CorsPolicyName = "AllowFrontendClient";
    public const string PublicFormsRateLimitPolicy = "public-forms";

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Register application services
        services.AddSingleton<IPharmacyService, PharmacyService>();
        services.AddSingleton<IPrescriptionService, PrescriptionService>();
        services.AddSingleton<IContactService, ContactService>();

        // Configure Supabase Client safely (reads from config, User Secrets, or ENV vars)
        var supabaseUrl = configuration["Supabase:Url"]
            ?? Environment.GetEnvironmentVariable("SUPABASE_URL");
        var supabaseKey = configuration["Supabase:Key"]
            ?? Environment.GetEnvironmentVariable("SUPABASE_KEY");

        var isPlaceholder = string.IsNullOrWhiteSpace(supabaseUrl)
            || string.IsNullOrWhiteSpace(supabaseKey)
            || supabaseUrl.Contains("YOUR_SUPABASE")
            || supabaseKey.Contains("YOUR_SUPABASE");

        if (!isPlaceholder)
        {
            var options = new SupabaseOptions
            {
                AutoRefreshToken = true,
                AutoConnectRealtime = false
            };
            services.AddScoped<Client>(_ => new Client(supabaseUrl!, supabaseKey!, options));
        }

        // Configure CORS for local development and production deployments
        services.AddCors(options =>
        {
            options.AddPolicy(CorsPolicyName, policy =>
            {
                var configuredOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                    ?? Array.Empty<string>();

                var defaultOrigins = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
                {
                    "http://localhost:3000",
                    "http://localhost:5173",
                    "http://localhost:4173",
                    "http://localhost:8080",
                    "http://127.0.0.1:3000",
                    "http://127.0.0.1:5173",
                    "http://127.0.0.1:4173",
                    "http://127.0.0.1:8080",
                    "https://pharma-dr-ahmed.vercel.app",
                    "https://pharma-dr-ahmed.pages.dev",
                    "https://dr-ahmed.com"
                };

                foreach (var origin in configuredOrigins)
                {
                    if (!string.IsNullOrWhiteSpace(origin))
                    {
                        defaultOrigins.Add(origin.TrimEnd('/'));
                    }
                }

                policy.SetIsOriginAllowed(origin =>
                {
                    if (string.IsNullOrWhiteSpace(origin)) return false;
                    try
                    {
                        var uri = new Uri(origin);
                        if (uri.Host is "localhost" or "127.0.0.1") return true;
                        if (defaultOrigins.Contains(origin.TrimEnd('/'))) return true;
                        // Allow Cloudflare Pages and Vercel preview deployments
                        if (uri.Host.EndsWith(".pages.dev", StringComparison.OrdinalIgnoreCase)
                            || uri.Host.EndsWith(".vercel.app", StringComparison.OrdinalIgnoreCase))
                        {
                            return true;
                        }
                        return false;
                    }
                    catch
                    {
                        return false;
                    }
                })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithExposedHeaders("X-Correlation-ID")
                .AllowCredentials();
            });
        });

        // Configure Rate Limiting for public endpoints (Issue #3)
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.AddFixedWindowLimiter(PublicFormsRateLimitPolicy, opt =>
            {
                opt.PermitLimit = 10;
                opt.Window = TimeSpan.FromMinutes(1);
                opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                opt.QueueLimit = 0;
            });
        });

        return services;
    }
}
