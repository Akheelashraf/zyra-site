"use client";

/**
 * Contact form: POSTs to /api/inquiry, then redirects to /[lang]/thank-you on success.
 * Env vars (Resend, optional WhatsApp) must be set in Netlify – see INQUIRY_SETUP.md.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections/footer/Footer";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { useLang, useTranslations } from "@/contexts/LangContext";

const INPUT_STYLE =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-zyra-primary focus:outline-none focus:ring-1 focus:ring-zyra-primary";

function validateForm(form: FormData): string | null {
  const name = (form.get("name") as string)?.trim() ?? "";
  const phone = (form.get("phone") as string)?.trim() ?? "";
  const email = (form.get("email") as string)?.trim() ?? "";
  const message = (form.get("message") as string)?.trim() ?? "";
  if (name.length < 2) return "Full name is required.";
  if (phone.length < 5) return "Phone / WhatsApp is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Valid email is required.";
  if (message.length < 10) return "Message is required (at least 10 characters).";
  return null;
}

export default function ContactPage() {
  const router = useRouter();
  const { lang } = useLang();
  const t = useTranslations();
  const c = t.contact;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const validationError = validateForm(formData);
    if (validationError) {
      setError(c.formValidationError);
      return;
    }
    setIsSubmitting(true);
    try {
      const body = {
        name: (formData.get("name") as string)?.trim() ?? "",
        company: (formData.get("company") as string)?.trim() || undefined,
        phone: (formData.get("phone") as string)?.trim() ?? "",
        email: (formData.get("email") as string)?.trim() ?? "",
        projectType: (formData.get("projectType") as string)?.trim() || undefined,
        location: (formData.get("location") as string)?.trim() || undefined,
        message: (formData.get("message") as string)?.trim() ?? "",
        lang,
        sourcePage: `/${lang}/contact`,
      };
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : c.formError);
        return;
      }
      if (!data.success) {
        setError(typeof data.error === "string" ? data.error : c.formError);
        return;
      }
      router.push(`/${lang}/thank-you`);
    } catch {
      setError(c.formError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main role="main">
        <section className="section-padding border-b border-gray-200/80">
          <Container>
            <div className="section-intro max-w-2xl">
              <h1 className="section-heading mb-5">{c.heroHeading}</h1>
              <p className="section-subtext">{c.heroSubtext}</p>
            </div>
          </Container>
        </section>

        <section className="section-padding bg-zyra-neutral/20">
          <Container>
            <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-5 lg:gap-20">
              <div className="lg:col-span-2">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">
                  {c.contactInfo}
                </h2>
                <ul className="space-y-6 text-gray-600">
                  <li>
                    <a
                      href={company.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 transition-colors hover:text-zyra-primary"
                    >
                      <Instagram className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
                      <span className="font-medium text-gray-900">{company.instagramHandle}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className="flex items-center gap-3 transition-colors hover:text-zyra-primary"
                    >
                      <Mail className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
                      <span className="font-medium text-gray-900">{company.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={company.whatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 transition-colors hover:text-zyra-primary"
                    >
                      <Phone className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
                      <span className="font-medium text-gray-900">{company.whatsApp}</span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden />
                    <div>
                      <span className="block text-sm font-medium text-gray-500">{c.serviceArea}</span>
                      <p className="mt-0.5 text-gray-700">{company.region}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                        {c.fullName}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder={c.placeholders.fullName}
                        className={INPUT_STYLE}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
                        {c.companyName}
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder={c.placeholders.company}
                        className={INPUT_STYLE}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                        {c.phoneWhatsapp}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder={c.placeholders.phone}
                        className={INPUT_STYLE}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        {c.emailAddress}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={c.placeholders.email}
                        className={INPUT_STYLE}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-gray-700">
                        {c.projectType}
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        className={INPUT_STYLE}
                        disabled={isSubmitting}
                      >
                        {c.projectTypes.map((opt) => (
                          <option key={opt.value || "empty"} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-700">
                        {c.location}
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder={c.placeholders.location}
                        className={INPUT_STYLE}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                      {c.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder={c.placeholders.message}
                      className={`${INPUT_STYLE} min-h-[120px] resize-y`}
                      disabled={isSubmitting}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-zyra-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-zyra-primary/25 transition-all duration-300 hover:scale-[1.02] hover:bg-zyra-deep hover:shadow-lg hover:shadow-zyra-primary/30 disabled:pointer-events-none disabled:opacity-70"
                  >
                    {isSubmitting ? c.sending : c.sendInquiry}
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
