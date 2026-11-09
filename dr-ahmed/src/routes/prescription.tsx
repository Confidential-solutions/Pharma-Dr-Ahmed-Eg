import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  UploadCloud,
  FileImage,
  CheckCircle2,
  Lock,
  Truck,
  MessageCircle,
  Phone,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Card, Reveal } from "@/components/site/primitives";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { prescriptionService } from "@/services/api/prescriptionService";
import { storageService } from "@/services/api/storageService";
import type { CreatePrescriptionDto } from "@/types/api";
import { toast } from "sonner";

export const Route = createFileRoute("/prescription")({
  head: () => ({
    meta: [
      { title: "صرف واطلب روشتتك أونلاين | صيدلية د. أحمد طارق سليم" },
      {
        name: "description",
        content:
          "ارفع صورة الروشتة أو عبوة الدواء واستلم علاجك في بيتك مع صيدلية د. أحمد طارق سليم في ميت الرخا – زفتى.",
      },
      { property: "og:title", content: "صرف الروشتة – صيدلية د. أحمد طارق سليم" },
    ],
  }),
  component: PrescriptionPage,
});

function PrescriptionPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [requiresDelivery, setRequiresDelivery] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 10 * 1024 * 1024) {
        toast.error(isAr ? "حجم الصورة كبير جداً (الحد الأقصى 10 ميجابايت)" : "File too large (Max 10MB)");
        return;
      }
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      toast.error(isAr ? "يرجى إدخال اسم المريض" : "Please enter patient name");
      return;
    }

    if (!phone.trim()) {
      toast.error(isAr ? "يرجى إدخال رقم الهاتف للتواصل" : "Please enter phone number");
      return;
    }

    setLoading(true);
    try {
      let imageUrl: string | undefined = undefined;
      if (file) {
        try {
          const uploadRes = await storageService.uploadPrescriptionImage(file);
          imageUrl = uploadRes.url;
        } catch (uploadErr) {
          console.warn("Storage upload fallback:", uploadErr);
        }
      }

      // Build payload without explicit `undefined` so exactOptionalPropertyTypes is satisfied.
      const payload: CreatePrescriptionDto = {
        patientName: patientName.trim(),
        phoneNumber: phone.trim(),
        requiresDelivery,
      };
      const trimmedAddress = address.trim();
      if (trimmedAddress) payload.address = trimmedAddress;
      const trimmedNotes = notes.trim();
      if (trimmedNotes) payload.notes = trimmedNotes;
      if (imageUrl) payload.imageUrl = imageUrl;

      await prescriptionService.submit(payload);

      setSubmitted(true);
      toast.success(
        isAr ? "تم إرسال الروشتة بنجاح! سيتواصل معك الصيدلي فوراً." : "Prescription submitted! We will contact you shortly."
      );
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        isAr
          ? "تعذر إرسال الروشتة عبر الموقع، يمكنك إرسالها مباشرة عبر الواتساب."
          : "Submission failed, please send it directly via WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappMsg = `${isAr ? "السلام عليكم، روشتة جديدة باسم:" : "Hello, new prescription for:"} ${patientName || (isAr ? "مريض" : "Patient")}
${isAr ? "رقم الهاتف:" : "Phone:"} ${phone}
${isAr ? "العنوان:" : "Address:"} ${address || (isAr ? "ميت الرخا" : "Meet El-Rakha")}
${isAr ? "التوصيل:" : "Delivery:"} ${requiresDelivery ? (isAr ? "نعم مطلوب توصيل" : "Delivery requested") : (isAr ? "استلام من الصيدلية" : "Pickup")}
${notes ? `${isAr ? "ملاحظات:" : "Notes:"} ${notes}` : ""}`;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <span className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              {isAr ? "خدمة أهالينا في ميت الرخا وزفتى" : "Community Healthcare Service"}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {isAr ? "صرف واطلب روشتتك في بيتك" : "Order & Refill Your Prescription"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {isAr
                ? "صوّر الروشتة أو علبة الدواء، وسيقوم الدكتور أحمد طارق سليم بمراجعتها وتجهيزها وتوصيلها حتى باب بيتك بكل أمان ودقة."
                : "Upload your prescription or medicine box. Dr. Ahmed will review the dosage, prepare the order, and deliver to your doorstep."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          {submitted ? (
            <Reveal>
              <div className="rounded-3xl border border-primary/30 bg-card p-8 md:p-12 text-center space-y-6 shadow-soft">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {isAr ? "تم استلام روشتتك بنجاح!" : "Prescription Received Successfully!"}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {isAr
                    ? "يقوم الصيدلي بمراجعة وتجهيز طلبك حالياً. سيصلك اتصال أو رسالة واتساب لتأكيد الأسعار وميعاد التوصيل."
                    : "The pharmacist is currently reviewing and packing your medication. You will receive a call or WhatsApp message shortly."}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t">
                  <a
                    href={whatsappLink(whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-whatsapp-foreground shadow-soft transition hover:opacity-95"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isAr ? "متابعة الطلب على واتساب" : "Track Order on WhatsApp"}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFile(null);
                      setPreview(null);
                    }}
                    className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-accent"
                  >
                    {isAr ? "إرسال روشتة أخرى" : "Submit Another Prescription"}
                  </button>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <Card className="p-6 md:p-10 shadow-soft">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* File Upload Box */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      {isAr ? "صورة الروشتة أو علبة الدواء" : "Prescription or Medicine Box Photo"}
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 p-6 text-center transition hover:border-primary hover:bg-muted/40"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {preview ? (
                        <div className="space-y-3">
                          <img
                            src={preview}
                            alt="Prescription preview"
                            className="mx-auto max-h-48 rounded-xl object-contain shadow-soft"
                          />
                          <p className="text-xs text-primary font-medium">
                            {isAr ? "اضغط هنا لتغيير الصورة" : "Click to change photo"}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary transition group-hover:scale-105">
                            <UploadCloud className="h-6 w-6" />
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {isAr ? "اضغط لاختيار صورة من هاتفك أو جهازك" : "Click to select a photo from your device"}
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (حتى 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Patient Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      {isAr ? "اسم المريض *" : "Patient Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder={isAr ? "مثال: محمد السيد أحمد" : "e.g. Mohamed Ahmed"}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      {isAr ? "رقم الهاتف (واتساب) *" : "Phone Number (WhatsApp) *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={isAr ? "010xxxxxxxx أو 011xxxxxxxx" : "+20 102 304 3122"}
                      dir="ltr"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-start focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      {isAr ? "عنوان التوصيل (القرية والشارع والعلامة المميزة)" : "Delivery Address & Landmark"}
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={isAr ? "مثال: ميت الرخا – بجوار مسجد الشيخ إسماعيل" : "e.g. Meet El-Rakha, near Mosque"}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      {isAr ? "ملاحظات للصيدلي (اختياري)" : "Notes for the Pharmacist (Optional)"}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        isAr
                          ? "مثال: محتاج علبة واحدة، متاح بديل لو الصنف الأصلي مش متوفر، استفسار عن مواعيد الجرعات..."
                          : "e.g. Generic alternatives allowed, dose inquiries, quantity needed..."
                      }
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Delivery Checkbox */}
                  <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-4">
                    <input
                      type="checkbox"
                      id="requiresDelivery"
                      checked={requiresDelivery}
                      onChange={(e) => setRequiresDelivery(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor="requiresDelivery" className="cursor-pointer text-sm font-medium text-foreground">
                      {isAr ? "نعم، أرغب في توصيل الدواء للمنزل" : "Yes, I request home delivery"}
                    </label>
                  </div>

                  {/* Confidentiality notice */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-4 w-4 text-primary shrink-0" />
                    <span>
                      {isAr
                        ? "بياناتك وروشتتك في سرية وأمان تام وفقاً لأعلى المعايير المهنية."
                        : "Your prescription and personal details are handled with strict medical confidentiality."}
                    </span>
                  </div>

                  {/* Submit buttons */}
                  <div className="grid gap-3 sm:grid-cols-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:bg-primary/90 disabled:opacity-60"
                    >
                      {loading ? (
                        <span>{isAr ? "جاري الإرسال..." : "Submitting..."}</span>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{isAr ? "تأكيد وإرسال الروشتة" : "Submit Prescription"}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappLink(whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 text-sm font-bold text-whatsapp-foreground shadow-soft transition hover:opacity-95"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{isAr ? "إرسال عبر واتساب" : "Send via WhatsApp"}</span>
                    </a>
                  </div>
                </form>
              </Card>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}

