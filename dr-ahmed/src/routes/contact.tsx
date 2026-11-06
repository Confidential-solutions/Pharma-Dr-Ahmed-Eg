import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Facebook, Phone, Send } from "lucide-react";
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
      <section className="container-page grid gap-8 py-20 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border bg-card p-6 shadow-soft md:p-8">
            <h2 className="text-2xl font-bold text-foreground">{t.contact.formTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input id="name" name="name" maxLength={100} className={field} aria-invalid={!!errors.name} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.contact.phone}</Label>
                <Input id="phone" name="phone" type="tel" dir="ltr" maxLength={16} className={field} aria-invalid={!!errors.phone} />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">{t.contact.type}</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" className={field}><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(t.contact.types).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea id="message" name="message" rows={5} maxLength={1000} className="rounded-xl bg-background" aria-invalid={!!errors.message} />
              {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full rounded-full sm:w-auto"><Send />{t.contact.send}</Button>
            {sent && <p className="text-sm text-primary" role="status">{t.contact.sentNote}</p>}
          </form>
        </Reveal>
        <Reveal delay={0.1} className="space-y-4">
          <div className="rounded-3xl border bg-card p-6 shadow-soft md:p-8">
            <h2 className="mb-5 text-xl font-bold text-foreground">{t.contact.direct}</h2>
            <div className="space-y-3">
              <Button asChild variant="whatsapp" size="xl" className="w-full rounded-full">
                <a href={whatsappLink(t.waMsg)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-5 w-5" />{t.cta.whatsapp}</a>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full rounded-full">
                <a href={siteConfig.phoneHref}><Phone /><span dir="ltr">{siteConfig.phoneDisplay}</span></a>
              </Button>
              <Button asChild variant="soft" size="xl" className="w-full rounded-full">
                <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook />{t.contact.facebook}</a>
              </Button>
            </div>
            <p className="mt-4 rounded-xl bg-secondary p-3 text-center text-sm text-secondary-foreground">⚠️ {t.contact.placeholderNote}</p>
          </div>
          <img src={images.delivery} alt={t.gallery.items[6]} loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
        </Reveal>
      </section>
    </>
  );
}
