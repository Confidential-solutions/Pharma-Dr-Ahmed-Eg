using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ServerApi.Models;

[Table("todos")]
public class Todo : BaseModel
{
    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("is_complete")]
    public bool IsComplete { get; set; }

    [Column("inserted_at")]
    public DateTime InsertedAt { get; set; } = DateTime.UtcNow;
}
