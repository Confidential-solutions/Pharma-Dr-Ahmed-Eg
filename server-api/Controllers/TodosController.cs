using Microsoft.AspNetCore.Mvc;
using ServerApi.Common;
using ServerApi.Models;

namespace ServerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly Supabase.Client _supabase;

    public TodosController(Supabase.Client supabase)
    {
        _supabase = supabase;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<Todo>>>> GetAll()
    {
        try
        {
            var result = await _supabase.From<Todo>().Get();
            return Ok(ApiResponse<IEnumerable<Todo>>.Ok(result.Models, "Todos retrieved successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<IEnumerable<Todo>>.Fail(
                "Failed to fetch todos from Supabase",
                new List<string> { ex.Message }
            ));
        }
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<Todo>>> Create([FromBody] Todo newTodo)
    {
        try
        {
            var response = await _supabase.From<Todo>().Insert(newTodo);
            var inserted = response.Models.FirstOrDefault() ?? newTodo;
            return Ok(ApiResponse<Todo>.Ok(inserted, "Todo created successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<Todo>.Fail(
                "Failed to insert todo into Supabase",
                new List<string> { ex.Message }
            ));
        }
    }
}

