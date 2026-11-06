using Microsoft.AspNetCore.Mvc;
using ServerApi.Common;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public ActionResult<ApiResponse<object>> Check()
    {
        return Ok(ApiResponse<object>.Ok(new
        {
            status = "Healthy",
            service = "Dr. Ahmed Pharmacy API (server-api)",
            environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
            timestamp = DateTime.UtcNow,
            framework = ".NET 9.0 (ASP.NET Core)"
        }, "Server is up and running"));
    }
}

