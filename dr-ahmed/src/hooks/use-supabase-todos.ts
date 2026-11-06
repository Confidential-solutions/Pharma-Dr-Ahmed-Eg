/**
 * useSupabaseTodos
 * Full Supabase CRUD for the SupabaseHealthCheck dev component.
 * Keeps all async logic and state out of the UI layer.
 */
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types";

export type { Todo };

interface UseSupabaseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  newTodoName: string;
  setNewTodoName: (v: string) => void;
  adding: boolean;
  fetchTodos: () => Promise<void>;
  handleAddTodo: (e: React.FormEvent) => Promise<void>;
  handleToggleTodo: (todo: Todo) => Promise<void>;
}

export function useSupabaseTodos(): UseSupabaseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodoName, setNewTodoName] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("todos")
        .select("*")
        .order("inserted_at", { ascending: false });

      if (dbError) {
        setError(dbError.message);
      } else {
        setTodos(data ?? []);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Connection failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddTodo = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTodoName.trim()) return;

      setAdding(true);
      try {
        const { data, error: dbError } = await supabase
          .from("todos")
          .insert([{ name: newTodoName.trim(), is_complete: false }])
          .select();

        if (dbError) {
          toast.error(`Error: ${dbError.message}`);
        } else {
          toast.success("Todo added to Supabase!");
          setNewTodoName("");
          if (data) setTodos((prev) => [data[0] as Todo, ...prev]);
        }
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setAdding(false);
      }
    },
    [newTodoName],
  );

  const handleToggleTodo = useCallback(async (todo: Todo) => {
    try {
      const { error: dbError } = await supabase
        .from("todos")
        .update({ is_complete: !todo.is_complete })
        .eq("id", todo.id);

      if (dbError) {
        toast.error(dbError.message);
      } else {
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? { ...t, is_complete: !t.is_complete } : t)),
        );
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    newTodoName,
    setNewTodoName,
    adding,
    fetchTodos,
    handleAddTodo,
    handleToggleTodo,
  };
}

