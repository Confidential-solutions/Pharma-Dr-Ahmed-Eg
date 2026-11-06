import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, Database, RefreshCw, Plus } from "lucide-react";
import { useSupabaseTodos } from "@/hooks";

export function SupabaseHealthCheck() {
  const {
    todos,
    loading,
    error,
    newTodoName,
    setNewTodoName,
    adding,
    fetchTodos,
    handleAddTodo,
    handleToggleTodo,
  } = useSupabaseTodos();

  return (
    <Card className="w-full max-w-xl mx-auto shadow-soft border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Supabase Live Status & Seeds
          </CardTitle>
          <CardDescription>
            Target: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">jqckzibvkggwfvsdzawa</code>
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchTodos} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? (
          <div className="p-3 bg-destructive/10 text-destructive rounded-lg flex items-start gap-2 text-sm">
            <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Table Not Created in Database</p>
              <p className="text-xs mt-1 opacity-90">{error}</p>
              <p className="text-xs mt-2 font-medium">
                👉 Run the script <code className="bg-destructive/20 px-1 rounded">database/schema.sql</code> in your Supabase SQL Editor to initialize tables and seeds.
              </p>
            </div>
          </div>
        ) : loading ? (
          <div className="py-6 flex justify-center text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-primary bg-primary/10 border-primary/20 gap-1.5 py-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                Connected ({todos.length} items loaded)
              </Badge>
            </div>

            <form onSubmit={handleAddTodo} className="flex gap-2">
              <Input
                placeholder="Add test item to Supabase..."
                value={newTodoName}
                onChange={(e) => setNewTodoName(e.target.value)}
                disabled={adding}
              />
              <Button type="submit" size="sm" disabled={adding || !newTodoName.trim()}>
                {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              </Button>
            </form>

            <div className="max-h-48 overflow-y-auto space-y-1.5 divide-y divide-border">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => handleToggleTodo(todo)}
                  className="pt-1.5 flex items-center justify-between text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded"
                >
                  <span className={todo.is_complete ? "line-through text-muted-foreground" : "text-foreground font-medium"}>
                    {todo.name}
                  </span>
                  <Badge variant={todo.is_complete ? "secondary" : "outline"} className="text-xs">
                    {todo.is_complete ? "Done" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

