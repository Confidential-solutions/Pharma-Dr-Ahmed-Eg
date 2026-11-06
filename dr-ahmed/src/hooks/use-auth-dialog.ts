/**
 * useAuthDialog
 * Encapsulates modal dialog state, active tab, sign-in/up/out form fields,
 * and submit handlers with user feedback toasts.
 */
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";

export function useAuthDialog() {
  const { user, signInWithEmail, signUpWithEmail, signOut, loading: authLoading } = useAuth();
  const { t } = useI18n();

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t.auth.errEmailPassRequired);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t.auth.toastSignInSuccess);
        setOpen(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error(t.auth.errAllRequiredFields);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await signUpWithEmail(email, password, {
        full_name: fullName,
        phone,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t.auth.toastSignUpSuccess);
        setOpen(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    setSubmitting(true);
    try {
      await signOut();
      toast.success(t.auth.toastSignOutSuccess);
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    user,
    authLoading,
    open,
    setOpen,
    activeTab,
    setActiveTab,
    submitting,
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    phone,
    setPhone,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    t,
  };
}
