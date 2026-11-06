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
  const { t } = useI18n();

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

  const handleSignUp = async (e: React.FormEvent) => {
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
            <DialogTitle>{t.auth.yourAccount}</DialogTitle>
            <DialogDescription>{t.auth.currentlyLoggedIn}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2 text-sm text-start">
            <p>
              <strong>{t.auth.email}:</strong> <span dir="ltr">{user.email}</span>
            </p>
            {user.user_metadata?.["full_name"] && (
              <p>
                <strong>{t.auth.fullName}:</strong> {user.user_metadata["full_name"]}
              </p>
            )}
            {user.user_metadata?.["phone"] && (
              <p>
                <strong>{t.auth.phone}:</strong>{" "}
                <span dir="ltr" className="unicode-isolate">
                  {user.user_metadata["phone"]}
                </span>
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
            {t.auth.signOut}
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
          <span>{t.auth.signIn}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{t.brandShort}</DialogTitle>
          <DialogDescription>{t.auth.signInDesc}</DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "signin" | "signup")}
          className="w-full pt-2"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{t.auth.signIn}</TabsTrigger>
            <TabsTrigger value="signup">{t.auth.signUp}</TabsTrigger>
          </TabsList>

          {/* SIGN IN */}
          <TabsContent value="signin" className="space-y-4 pt-3">
            <form onSubmit={handleSignIn} className="space-y-3">
              <div className="space-y-1 text-start">
                <Label htmlFor="signin-email">{t.auth.email}</Label>
                <Input
                  id="signin-email"
                  type="email"
                  dir="ltr"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1 text-start">
                <Label htmlFor="signin-password">{t.auth.password}</Label>
                <Input
                  id="signin-password"
                  type="password"
                  dir="ltr"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 animate-spin me-2" />}
                {t.auth.signIn}
              </Button>
            </form>
          </TabsContent>

          {/* SIGN UP */}
          <TabsContent value="signup" className="space-y-4 pt-3">
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="space-y-1 text-start">
                <Label htmlFor="signup-name">{t.auth.fullName}</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="د. أحمد محمد"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1 text-start">
                <Label htmlFor="signup-phone">
                  {t.auth.phone}{" "}
                  <span className="text-xs text-muted-foreground">{t.auth.optional}</span>
                </Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  dir="ltr"
                  placeholder="+20 100 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1 text-start">
                <Label htmlFor="signup-email">{t.auth.email}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  dir="ltr"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1 text-start">
                <Label htmlFor="signup-password">{t.auth.password}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  dir="ltr"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 animate-spin me-2" />}
                {t.auth.signUp}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
