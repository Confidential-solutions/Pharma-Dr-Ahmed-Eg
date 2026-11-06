/**
 * useContactForm
 * Encapsulates the entire contact-page form logic:
 *   - local field state (type selector)
 *   - Zod validation
 *   - WhatsApp deep-link submission
 *   - sent / error state
 *
 * The component only renders — all data flow lives here.
 */
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { whatsappLink } from "@/lib/site-config";

type Errors = Partial<Record<"name" | "phone" | "message", string>>;

interface UseContactFormOptions {
  /** Translated labels used in the WhatsApp message and validation messages. */
  labels: {
    name: string;
    phone: string;
    type: string;
    message: string;
    errName: string;
    errPhone: string;
    errMsg: string;
    types: Record<string, string>;
    waMsg: string;
  };
}

interface UseContactFormReturn {
  type: string;
  setType: (v: string) => void;
  errors: Errors;
  sent: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function useContactForm({ labels }: UseContactFormOptions): UseContactFormReturn {
  const [type, setType] = useState("order");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const schema = z.object({
    name: z.string().trim().min(2, labels.errName).max(100),
    phone: z.string().trim().regex(/^\+?[0-9\s-]{8,16}$/, labels.errPhone),
    message: z.string().trim().min(3, labels.errMsg).max(1000),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse(Object.fromEntries(fd));

    if (!result.success) {
      const errs: Errors = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }

    setErrors({});
    const typeLabel = labels.types[type] ?? type;
    const text =
      `${labels.name}: ${result.data.name}\n` +
      `${labels.phone}: ${result.data.phone}\n` +
      `${labels.type}: ${typeLabel}\n\n` +
      result.data.message;

    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return { type, setType, errors, sent, onSubmit };
}

