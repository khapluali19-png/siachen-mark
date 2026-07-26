const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://siachenmark.com";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Siachen Mark",
        url: BASE,
        logo: `${BASE}/logo.png`,
        description:
          "Siachen Mark is a digital growth agency delivering performance marketing, SEO, branding, and web development.",
        sameAs: [
          "https://www.linkedin.com/company/siachen-mark",
          "https://www.facebook.com/siachenmark",
          "https://www.instagram.com/siachenmark",
        ],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Siachen Mark",
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
