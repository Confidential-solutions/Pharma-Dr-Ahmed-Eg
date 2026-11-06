import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Facebook, Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { images } from "@/lib/images";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHero, Reveal } from "@/components/site/primitives";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";

/** TikTok SVG — not in Lucide */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.98a8.26 8.26 0 0 0 4.83 1.55V7.08a4.84 4.84 0 0 1-1.06-.39z" />
    </svg>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | صيدلية د. أحمد طارق سليم – ميت الرخا" },
      { name: "description", content: "تواصل مع صيدلية د. أحمد طارق سليم عبر واتساب أو الهاتف لطلب الأدوية أو الاستشارة في ميت الرخا وزفتى." },
      { property: "og:title", content: "تواصل مع صيدلية د. أحمد طارق سليم" },
      { property: "og:description", content: "اطلب دواءك أو اسأل الصيدلي عبر واتساب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "phone" | "message", string>>;

function Contact() {
  const { t } = useI18n();
  const [type, setType] = useState("order");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const schema = z.object({
    name: z.string().trim().min(2, t.contact.errName).max(100),
    phone: z.string().trim().regex(/^\+?[0-9\s-]{8,16}$/, t.contact.errPhone),
    message: z.string().trim().min(3, t.contact.errMsg).max(1000),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = schema.safeParse(Object.fromEntries(fd));
    if (!res.success) {
      const errs: Errors = {};
      res.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const typeLabel = t.contact.types[type as keyof typeof t.contact.types];
    const text = `${t.contact.name}: ${res.data.name}\n${t.contact.phone}: ${res.data.phone}\n${t.contact.type}: ${typeLabel}\n\n${res.data.message}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field = "h-12 rounded-xl bg-background";

  return (
    <>
      <PageHero title={t.contact.title} sub={t.contact.sub} image={images.pharmacist} />
      <section className="container-page section-py grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form onSubmit={onSubmit} noValidate className="card-surface space-y-5 p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t.contact.formTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 text-start">
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input id="name" name="name" maxLength={100} className={field} aria-invalid={!!errors.name} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2 text-start">
                <Label htmlFor="phone">{t.contact.phone}</Label>
                <Input id="phone" name="phone" type="tel" dir="ltr" maxLength={16} className={field} aria-invalid={!!errors.phone} />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>
            <div className="space-y-2 text-start">
              <Label htmlFor="type">{t.contact.type}</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" className={field}><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(t.contact.types).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-start">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea id="message" name="message" rows={5} maxLength={1000} className="rounded-xl bg-background" aria-invalid={!!errors.message} />
              {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full rounded-full sm:w-auto">
              <Send className="me-2 h-4 w-4" />
              {t.contact.send}
            </Button>
            {sent && <p className="text-sm font-medium text-primary" role="status">{t.contact.sentNote}</p>}
          </form>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6">
          <div className="card-surface p-6 sm:p-8">
            <h2 className="mb-5 text-xl font-bold text-foreground">{t.contact.direct}</h2>
            <div className="space-y-3">
              <Button asChild variant="whatsapp" size="xl" className="w-full rounded-full">
                <a href={whatsappLink(t.waMsg)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="me-2 h-5 w-5" />
                  {t.cta.whatsapp}
                </a>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full rounded-full">
                <a href={siteConfig.phoneHref}>
                  <Phone className="me-2 h-4 w-4" />
                  <span dir="ltr" className="unicode-isolate">{siteConfig.phoneDisplay}</span>
                </a>
              </Button>
              <Button asChild variant="soft" size="xl" className="w-full rounded-full">
                <a href={siteConfig.emailHref}>
                  <Mail className="me-2 h-5 w-5" />
                  <span dir="ltr" className="unicode-isolate">{siteConfig.email}</span>
                </a>
              </Button>
              {/* Social links row */}
              <div className="flex gap-2 pt-1">
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.tiktokUrl}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border/50 shadow-soft">
            <img
              src={images.delivery}
              alt={t.gallery.items[6]}
              loading="lazy"
              decoding="async"
              width={1200}
              height={912}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
