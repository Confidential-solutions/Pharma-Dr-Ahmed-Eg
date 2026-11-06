import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, MessageCircleHeart, Phone, Stethoscope } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { images } from "@/lib/images";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Card, IconBadge, Reveal, SectionHeading, serviceIcons } from "@/components/site/primitives";
import { HoursCard, MapCard, OrderCta } from "@/components/site/InfoBlocks";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "صيدلية د. أحمد طارق سليم | صيدلية ميت الرخا – زفتى" },
      { name: "description", content: "صيدلية ميت الرخا وزفتى: أدوية أصلية، استشارة صيدلانية، أدوية مزمنة، رعاية الأم والطفل، وتوصيل. بجوار مسجد الشيخ إسماعيل." },
      { name: "keywords", content: "صيدلية ميت الرخا, صيدلية زفتى, دكتور أحمد طارق سليم, صيدلية الغربية" },
      { property: "og:title", content: "صيدلية د. أحمد طارق سليم – ميت الرخا" },
      { property: "og:description", content: "خدمة صيدلانية متميزة في ميت الرخا، بجوار مسجد الشيخ إسماعيل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const stats = [
    { icon: MapPin, a: t.hero.stat1, b: t.hero.stat1d },
    { icon: Stethoscope, a: t.hero.stat2, b: t.hero.stat2d },
    { icon: MessageCircleHeart, a: t.hero.stat3, b: t.hero.stat3d },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="container-page grid items-center gap-12 py-12 md:py-20 lg:grid-cols-2">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-soft">
              <span className="h-2 w-2 animate-pulse rounded-full bg-whatsapp" />{t.hero.badge}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {t.hero.title} <span className="text-gradient">{t.hero.titleAccent}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.hero.text}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="whatsapp" size="xl" className="rounded-full">
                <a href={whatsappLink(t.waMsg)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-5 w-5" />{t.cta.whatsapp}</a>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full">
                <a href={siteConfig.phoneHref}><Phone />{t.cta.call}</a>
              </Button>
            </motion.div>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-lg">
              {stats.map((s, i) => (
                <motion.div key={s.a} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                  className="rounded-2xl border bg-card/70 p-3 text-center shadow-soft sm:p-4">
                  <s.icon className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm font-bold text-foreground">{s.a}</p>
                  <p className="text-xs text-muted-foreground">{s.b}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-2xl" />
            <img src={images.hero} alt={t.gallery.items[0]} width={1600} height={1104} fetchPriority="high"
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-elegant" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="glass absolute -bottom-6 start-6 flex items-center gap-3 rounded-2xl border p-4 shadow-elegant">
              <CheckCircle2 className="h-8 w-8 shrink-0 text-primary" />
              <div><p className="font-bold text-foreground">{t.brandShort}</p><p className="text-sm text-muted-foreground">{t.footer.tagline}</p></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-20">
        <SectionHeading title={t.servicesTitle} sub={t.servicesSub} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <Card className="h-full">
                <IconBadge icon={serviceIcons[s.k]} />
                <h3 className="mt-5 text-xl font-bold text-foreground">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="soft" size="lg" className="rounded-full"><Link to="/services">{t.cta.allServices}<Arrow /></Link></Button>
        </div>
      </section>

      {/* About preview */}
      <section className="bg-secondary/50 py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-md">
            <img src={images.pharmacist} alt={t.gallery.items[1]} loading="lazy" width={1200} height={1408}
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-elegant" />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="mb-4 block h-1 w-12 rounded-full bg-gradient-primary" />
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.aboutTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.aboutText}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.about.values.map((v) => (
                <li key={v.t} className="flex items-center gap-2 font-medium text-foreground"><CheckCircle2 className="h-5 w-5 text-primary" />{v.t}</li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg" className="mt-8 rounded-full"><Link to="/about">{t.cta.more}<Arrow /></Link></Button>
          </Reveal>
        </div>
      </section>

      {/* Hours + Map */}
      <section className="container-page py-20">
        <SectionHeading title={t.locationTitle} sub={t.address} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <Reveal><HoursCard /></Reveal>
          <Reveal delay={0.1}><MapCard /></Reveal>
        </div>
      </section>

      <OrderCta />
    </>
  );
}
