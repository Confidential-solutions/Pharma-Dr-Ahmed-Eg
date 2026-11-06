import { Clock, MapPin, Navigation } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { mapEmbedUrl, mapLink, siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Reveal } from "./primitives";
import { WhatsAppIcon } from "./WhatsAppFab";

export function HoursCard() {
  const { t, lang } = useI18n();
  return (
    <div className="h-full rounded-3xl border bg-card p-7 shadow-soft">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground"><Clock className="h-6 w-6" /></span>
        <h3 className="text-xl font-bold text-foreground">{t.hoursTitle}</h3>
      </div>
      <ul className="divide-y">
        {siteConfig.hours.map((h) => (
          <li key={h.days.en} className="flex flex-wrap items-center justify-between gap-2 py-4">
            <span className="font-medium text-foreground">{h.days[lang]}</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">{h.time[lang]}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">{t.hoursNote}</p>
    </div>
  );
}

export function MapCard({ tall = false }: { tall?: boolean }) {
  const { t } = useI18n();
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-soft">
      <iframe
        title={t.locationTitle}
        src={mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`w-full border-0 ${tall ? "h-96 md:h-[28rem]" : "h-64"} grow`}
      />
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex gap-2 text-muted-foreground"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />{t.address}</p>
        <Button asChild variant="soft" className="shrink-0 rounded-full">
          <a href={mapLink} target="_blank" rel="noopener noreferrer"><Navigation />{t.cta.directions}</a>
        </Button>
      </div>
    </div>
  );
}

export function OrderCta() {
  const { t } = useI18n();
  return (
    <Reveal className="container-page">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 text-center text-primary-foreground shadow-elegant md:p-16">
        <div className="pointer-events-none absolute -top-20 -end-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -start-16 h-72 w-72 rounded-full bg-primary-foreground/10 blur-2xl" />
        <h2 className="relative text-3xl font-bold md:text-4xl">{t.orderTitle}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg opacity-90">{t.orderText}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="whatsapp" size="xl" className="rounded-full">
            <a href={whatsappLink(t.waMsg)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-5 w-5" />{t.cta.order}</a>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
