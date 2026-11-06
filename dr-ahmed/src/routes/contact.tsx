import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useContactForm } from "@/hooks";
import { images } from "@/lib/images";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero, Reveal } from "@/components/site/primitives";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";
import { SocialLinks } from "@/components/site/SocialLinks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | صيدلية د. أحمد طارق سليم – ميت الرخا" },
      {
        name: "description",
        content:
          "تواصل مع صيدلية د. أحمد طارق سليم عبر واتساب أو الهاتف لطلب الأدوية أو الاستشارة في ميت الرخا وزفتى.",
      },
      { property: "og:title", content: "تواصل مع صيدلية د. أحمد طارق سليم" },
      { property: "og:description", content: "اطلب دواءك أو اسأل الصيدلي عبر واتساب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const { type, setType, errors, sent, onSubmit } = useContactForm({
    labels: { ...t.contact, waMsg: t.waMsg },
  });

  const field = "h-12 rounded-xl bg-background";

  return (
    <>
      <PageHero title={t.contact.title} sub={t.contact.sub} image={images.pharmacist} />
      <section className="container-page section-py grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form
            onSubmit={onSubmit}
            noValidate
            className="card-surface space-y-5 p-6 sm:p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {t.contact.formTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 text-start">
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input
                  id="name"
                  name="name"
                  maxLength={100}
                  className={field}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2 text-start">
                <Label htmlFor="phone">{t.contact.phone}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  maxLength={16}
                  className={field}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>
            <div className="space-y-2 text-start">
              <Label htmlFor="type">{t.contact.type}</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" className={field}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.contact.types).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-start">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                className="rounded-xl bg-background"
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            </div>
            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full rounded-full sm:w-auto"
            >
              <Send className="me-2 h-4 w-4" />
              {t.contact.send}
            </Button>
            {sent && (
              <p className="text-sm font-medium text-primary" role="status">
                {t.contact.sentNote}
              </p>
            )}
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
                  <span dir="ltr" className="unicode-isolate">
                    {siteConfig.phoneDisplay}
                  </span>
                </a>
              </Button>
              <Button asChild variant="soft" size="xl" className="w-full rounded-full">
                <a href={siteConfig.emailHref}>
                  <Mail className="me-2 h-5 w-5" />
                  <span dir="ltr" className="unicode-isolate">
                    {siteConfig.email}
                  </span>
                </a>
              </Button>
              {/* Social links */}
              <SocialLinks className="pt-1" itemClassName="h-11 w-11" />
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
