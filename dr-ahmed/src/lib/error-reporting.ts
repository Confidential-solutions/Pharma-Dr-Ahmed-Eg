/**
 * error-reporting.ts
 * ------------------
 * Lightweight client-side error reporter for Dr. Ahmed Pharmacy app.
 * Logs errors to the console. Swap this module to integrate an external
 * service (Sentry, Datadog, etc.) without touching any other file.
 */

type ErrorContext = Record<string, unknown>;

export function reportError(error: unknown, context: ErrorContext = {}): void {
  if (typeof window === "undefined") return;

  const message = describeThrown(error);
  const stack = error instanceof Error ? error.stack : undefined;

  console.error("[dr-ahmed] Unhandled error", {
    message,
    ...(stack ? { stack } : {}),
    route: window.location.pathname,
    ...context,
  });
}

const MAX_SERIALIZED_LENGTH = 2000;

function describeThrown(error: unknown): string {
  if (error instanceof Response) {
    return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const { message } = (error ?? {}) as { message?: unknown };
  if (typeof message === "string" && message.length > 0) return message;
  try {
    return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
  } catch {
    return String(error);
  }
}

