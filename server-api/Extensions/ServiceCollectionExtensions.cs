using ServerApi.Application.Interfaces;
using ServerApi.Application.Services;
using Supabase;

namespace ServerApi.Extensions;

public static class ServiceCollectionExtensions
{
    public const string CorsPolicyName = "AllowFrontendClient";

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Register application services
        services.AddSingleton<IPharmacyService, PharmacyService>();
        services.AddSingleton<IPrescriptionService, PrescriptionService>();
        services.AddSingleton<IContactService, ContactService>();

        // Configure Supabase Client
        var supabaseUrl = configuration["Supabase:Url"];
        var supabaseKey = configuration["Supabase:Key"];
        if (!string.IsNullOrWhiteSpace(supabaseUrl) && !string.IsNullOrWhiteSpace(supabaseKey))
        {
            var options = new SupabaseOptions
            {
                AutoRefreshToken = true,
                AutoConnectRealtime = false
            };
            services.AddScoped<Client>(_ => new Client(supabaseUrl, supabaseKey, options));
        }

        // Configure CORS for dr-ahmed frontend
        services.AddCors(options =>
        {
            options.AddPolicy(CorsPolicyName, policy =>
            {
                var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                    ?? new[] { "http://localhost:3000", "http://localhost:5173", "http://localhost:8080", "http://127.0.0.1:3000", "http://127.0.0.1:5173", "http://127.0.0.1:8080" };

                policy.SetIsOriginAllowed(origin =>
                {
                    if (string.IsNullOrWhiteSpace(origin)) return false;
                    try
                    {
                        var uri = new Uri(origin);
                        return uri.Host is "localhost" or "127.0.0.1"
                            || allowedOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase);
                    }
                    catch
                    {
                        return false;
                    }
                })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            });
        });

        return services;
    }
}

