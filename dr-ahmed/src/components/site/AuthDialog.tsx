import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User as UserIcon, LogOut, Loader2 } from "lucide-react";

export function AuthDialog() {
  const { user, signInWithEmail, signUpWithEmail, signOut, loading: authLoading } = useAuth();
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(isAr ? "يرجى ملء البريد وكلمة المرور" : "Please fill in email and password");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(isAr ? "تم تسجيل الدخول بنجاح" : "Signed in successfully");
        setOpen(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error(isAr ? "يرجى ملء كافة الحقول المطلوبة" : "Please fill in all required fields");
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
        toast.success(
          isAr
            ? "تم إنشاء الحساب بنجاح! راجع بريدك للتأكيد إذا تطلب الأمر."
            : "Account created successfully! Check your email if verification is required.",
        );
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
      toast.success(isAr ? "تم تسجيل الخروج" : "Signed out");
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (user) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 font-medium">
            <UserIcon className="w-4 h-4 text-emerald-600" />
            <span className="max-w-[120px] truncate">
              {user.user_metadata?.["full_name"] || user.email?.split("@")[0]}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isAr ? "حسابك الشخصي" : "Your Account"}</DialogTitle>
            <DialogDescription>
              {isAr ? "أنت مسجل الدخول حاليًا" : "You are currently logged in"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2 text-sm">
            <p>
              <strong>{isAr ? "البريد الإلكتروني:" : "Email:"}</strong> {user.email}
            </p>
            {user.user_metadata?.["full_name"] && (
              <p>
                <strong>{isAr ? "الاسم:" : "Name:"}</strong> {user.user_metadata["full_name"]}
              </p>
            )}
            {user.user_metadata?.["phone"] && (
              <p>
                <strong>{isAr ? "رقم الهاتف:" : "Phone:"}</strong> {user.user_metadata["phone"]}
              </p>
            )}
          </div>
          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={handleSignOut}
            disabled={submitting}
          >
            <LogOut className="w-4 h-4" />
            {isAr ? "تسجيل الخروج" : "Sign Out"}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-1.5 shadow-sm">
          <UserIcon className="w-4 h-4" />
          <span>{isAr ? "تسجيل الدخول" : "Sign In"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isAr ? "صيدلية د. أحمد طارق" : "Dr. Ahmed Pharmacy"}
          </DialogTitle>
          <DialogDescription>
            {isAr
              ? "سجّل دخولك لمتابعة الروشتات والاستشارات الخاصة بك"
              : "Sign in to track your prescriptions and consultations"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "signin" | "signup")}
          className="w-full pt-2"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{isAr ? "دخول" : "Sign In"}</TabsTrigger>
            <TabsTrigger value="signup">{isAr ? "حساب جديد" : "Sign Up"}</TabsTrigger>
          </TabsList>

          {/* SIGN IN */}
          <TabsContent value="signin" className="space-y-4 pt-3">
            <form onSubmit={handleSignIn} className="space-y-3">
              <div className="space-y-1 text-start">
                <Label htmlFor="signin-email">{isAr ? "البريد الإلكتروني" : "Email"}</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1 text-start">
                <Label htmlFor="signin-password">{isAr ? "كلمة المرور" : "Password"}</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 animate-spin me-2" />}
                {isAr ? "تسجيل الدخول" : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          {/* SIGN UP */}
          <TabsContent value="signup" className="space-y-4 pt-3">
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="space-y-1 text-start">
                <Label htmlFor="signup-name">{isAr ? "الاسم بالكامل" : "Full Name"}</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder={isAr ? "أحمد محمد" : "John Doe"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1 text-start">
                <Label htmlFor="signup-phone">{isAr ? "رقم الهاتف" : "Phone Number"}</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="+20 100 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1 text-start">
                <Label htmlFor="signup-email">{isAr ? "البريد الإلكتروني" : "Email"}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1 text-start">
                <Label htmlFor="signup-password">{isAr ? "كلمة المرور" : "Password"}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 animate-spin me-2" />}
                {isAr ? "إنشاء حساب جديد" : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
