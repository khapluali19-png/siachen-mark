import { getSiteSettings } from "@/lib/settings";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function OrganizationJsonLd() {
  const settings = await getSiteSettings();
  const BASE = (settings.productionUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://siachenmark.com").replace(/\/$/, "");

  const sameAs = [
    settings.linkedinUrl,
    settings.facebookUrl,
    settings.instagramUrl,
    settings.youtubeUrl,
    settings.twitterUrl,
    settings.tiktokUrl,
  ].filter((url): url is string => Boolean(url && url.trim()));

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        name: settings.siteName,
        url: BASE,
        logo: `${BASE}${settings.logo.startsWith("/") ? "" : "/"}${settings.logo}`,
        description: settings.siteDescription || settings.defaultMetaDescription,
        telephone: settings.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Islamabad",
          addressCountry: "PK",
        },
        areaServed: ["PK", "AE", "GB", "US", "SA", "AU"],
        serviceType: [
          "Performance Marketing",
          "Meta Ads Management",
          "Google Ads Management",
          "SEO",
          "Social Media Marketing",
          "Web Design and Development",
          "Lead Generation",
          "E-commerce Marketing",
        ],
        sameAs: sameAs.length ? sameAs : undefined,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: settings.phone,
          contactType: "customer service",
          availableLanguage: ["English", "Urdu"],
        },
      }}
    />
  );
}

export async function WebSiteJsonLd() {
  const settings = await getSiteSettings();
  const BASE = (settings.productionUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://siachenmark.com").replace(/\/$/, "");

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: settings.siteName,
        url: BASE,
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  image,
  publishedAt,
  updatedAt,
}: {
  title: string;
  description?: string | null;
  slug: string;
  image?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
}) {
  const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://siachenmark.com").replace(/\/$/, "");

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: description ?? undefined,
        image: image ?? undefined,
        url: `${BASE}/blog/${slug}`,
        datePublished: publishedAt ? new Date(publishedAt).toISOString() : undefined,
        dateModified: updatedAt ? new Date(updatedAt).toISOString() : undefined,
        author: { "@type": "Organization", name: "Siachen Mark" },
        publisher: {
          "@type": "Organization",
          name: "Siachen Mark",
          logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
        },
      }}
    />
  );
}
