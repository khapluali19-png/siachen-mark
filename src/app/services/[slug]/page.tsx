import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import Image from "next/image";
import { getSiteSettings } from "@/lib/settings";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import TrackedLink from "@/components/ui/TrackedLink";
import ServiceViewTracker from "@/components/analytics/ServiceViewTracker";
import MagneticCTA from "@/components/ui/MagneticCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    db.service.findUnique({ where: { slug } }),
    getSiteSettings(),
  ]);

  if (!service || !service.published) {
    return { title: "Service Not Found" };
  }

  const BASE = (settings.productionUrl || "https://siachenmark.com").replace(/\/$/, "");
  const title = service.seoTitle || `${service.title} | ${settings.siteName || "Siachen Mark"}`;
  const description =
    service.seoDescription ||
    service.shortDescription ||
    service.description.slice(0, 160);
  const canonical = `${BASE}/services/${service.slug}`;
  const image = service.image || settings.defaultOgImage || "/og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings.siteName,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    db.service.findUnique({ where: { slug } }),
    getSiteSettings(),
  ]);

  if (!service || !service.published) {
    notFound();
  }

  const BASE = (settings.productionUrl || "https://siachenmark.com").replace(/\/$/, "");
  const waNumber = (settings.whatsappNumber || "923488868517").replace(/[^0-9]/g, "");
  const waHref = `https://wa.me/${waNumber}`;

  const processSteps: string[] = Array.isArray(service.process)
    ? (service.process as string[])
    : [];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.shortDescription || service.description,
    provider: {
      "@type": "Organization",
      name: settings.siteName,
      url: BASE,
    },
    areaServed: ["PK", "AE", "GB", "US"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE },
          { name: "Services", url: `${BASE}/services` },
          { name: service.title, url: `${BASE}/services/${service.slug}` },
        ]}
      />
      <ServiceViewTracker serviceName={service.title} slug={service.slug} />

      <Navbar />
      <main className="flex-1 bg-[var(--color-background)]">

        {/* ── Hero ── */}
        <section className="bg-[var(--color-navy)] text-white py-20 px-6 relative overflow-hidden" aria-labelledby="service-detail-heading">
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <Container className="relative z-10 max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--color-on-navy)] opacity-70 mb-5">
              <Link href="/" className="hover:underline hover:opacity-100 transition-opacity">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services" className="hover:underline hover:opacity-100 transition-opacity">Services</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white font-semibold opacity-100">{service.title}</span>
            </nav>

            <h1 id="service-detail-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 max-w-3xl font-display leading-tight">
              {service.title}
            </h1>

            {service.shortDescription && (
              <p className="text-base sm:text-lg text-[var(--color-on-navy)] opacity-90 max-w-2xl font-medium leading-relaxed mb-8">
                {service.shortDescription}
              </p>
            )}

            <div className="flex flex-wrap gap-3 items-center">
              <MagneticCTA>
                <TrackedLink
                  href={service.ctaHref || "/contact"}
                  trackingType="strategy_call"
                  trackingLocation={`service_hero_${service.slug}`}
                  className="px-6 py-3 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-semibold text-sm hover:bg-[var(--color-off-white)] transition-colors shadow-md inline-flex items-center gap-2"
                >
                  {service.ctaText || "Book a Strategy Call"}
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </TrackedLink>
              </MagneticCTA>
              <TrackedLink
                href={waHref}
                trackingType="whatsapp"
                trackingLocation={`service_hero_${service.slug}`}
                className="px-6 py-3 rounded-[var(--radius-full)] border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                aria-label="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.35-.24-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp Us
              </TrackedLink>
            </div>
          </Container>
        </section>

        {/* ── Main Content ── */}
        <section className="py-16 px-6">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* ── Main Column ── */}
              <div className="lg:col-span-2 space-y-10">

                {/* Service image */}
                {service.image && (
                  <div className="group relative w-full h-64 sm:h-80 rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border)] shadow-sm">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="image-hover-zoom object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Overview / Description */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-navy)] mb-4 font-display">
                    Overview
                  </h2>
                  <p className="text-base text-[var(--color-muted)] whitespace-pre-line leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features Checklist */}
                {service.features && service.features.length > 0 && (
                  <div className="bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-[var(--color-navy)] mb-5 font-display">
                      What&apos;s Included
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(service.features as string[]).map((feat) => (
                        <div key={feat} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[var(--color-off-white)] border border-[var(--color-border)] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                            <svg viewBox="0 0 12 12" className="w-3 h-3 text-[var(--color-navy-bright)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 6l3 3 5-5" />
                            </svg>
                          </span>
                          <span className="text-sm text-[var(--color-foreground)] font-medium leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Outcomes / Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                  <div className="bg-[var(--color-off-white)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-[var(--color-navy)] mb-5 font-display">
                      Key Outcomes &amp; Benefits
                    </h2>
                    <div className="space-y-3">
                      {(service.benefits as string[]).map((benefit, i) => (
                        <div key={benefit} className="flex items-start gap-3 bg-white p-4 rounded-[var(--radius-md)] border border-[var(--color-border)]">
                          <span className="text-xs font-extrabold text-[var(--color-navy-bright)] shrink-0 w-6 h-6 rounded-full bg-[var(--color-off-white)] border border-[var(--color-border)] flex items-center justify-center" aria-hidden="true">
                            {i + 1}
                          </span>
                          <p className="text-sm font-semibold text-[var(--color-navy)] leading-snug">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process Steps */}
                {processSteps.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-6 font-display">
                      Our Process
                    </h2>
                    <ol className="space-y-4">
                      {processSteps.map((step, i) => (
                        <li key={step} className="flex items-start gap-4">
                          <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-navy)] text-white flex items-center justify-center text-sm font-bold" aria-hidden="true">
                            {i + 1}
                          </span>
                          <div className="flex-1 pt-1">
                            <p className="text-sm text-[var(--color-foreground)] leading-relaxed font-medium">{step}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* ── Sidebar ── */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="premium-card bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 sm:p-7 shadow-sm">
                  <h2 className="font-extrabold text-[var(--color-navy)] text-lg mb-2 font-display">
                    Ready to Get Started?
                  </h2>
                  <p className="text-xs text-[var(--color-muted)] mb-6 leading-relaxed">
                    Book a strategy session with our team. We&apos;ll audit your current situation and outline a clear growth plan.
                  </p>

                  <TrackedLink
                    href={service.ctaHref || "/contact"}
                    trackingType="strategy_call"
                    trackingLocation={`service_sidebar_${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-bold hover:bg-[var(--color-navy-bright)] transition-colors shadow-sm mb-3"
                  >
                    {service.ctaText || "Book a Strategy Call"}
                  </TrackedLink>

                  <TrackedLink
                    href={waHref}
                    trackingType="whatsapp"
                    trackingLocation={`service_sidebar_${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-navy)] text-sm font-semibold hover:bg-[var(--color-off-white)] transition-colors"
                    aria-label="Chat with us on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.35-.24-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    Chat on WhatsApp
                  </TrackedLink>

                  <div className="mt-6 pt-5 border-t border-[var(--color-border)] space-y-2.5">
                    {[
                      "Dedicated in-house strategy",
                      "Full tracking & reporting",
                      "No hidden fees",
                    ].map((item) => (
                      <p key={item} className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Back link */}
                <div className="mt-4">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors"
                  >
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M13 8H3M7 4L3 8l4 4" />
                    </svg>
                    All Services
                  </Link>
                </div>
              </div>

            </div>
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
