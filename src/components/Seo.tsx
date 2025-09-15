import { useEffect } from "react";
import SocialCard from "@/assets/Social Card.png";

interface SeoProps {
  title: string;
  description?: string;
  path?: string; // e.g. "/skulpting"
  type?: "website" | "article";
  imageUrl?: string;
}

// Lightweight SEO component to set document title and common meta tags without extra deps
export function Seo({ title, description, path = "/", type = "website", imageUrl }: SeoProps) {
  useEffect(() => {
    const baseUrl = "https://www.skulptbrand.com"; // Provided domain
    const url = `${baseUrl}${path}`;
    // Build an absolute URL for the social card (works with Vite bundling)
    const defaultSocial = new URL(SocialCard, window.location.origin).toString();
    const img = imageUrl || defaultSocial;

    document.title = title;

    const upsertMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    };

    // Primary
    upsertMeta('meta[name="title"]', { name: "title", content: title });
    if (description) upsertMeta('meta[name="description"]', { name: "description", content: description });

    // Canonical
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Open Graph
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    if (description) upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "SKULPT" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_US" });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: img });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    if (description) upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: img });
  }, [title, description, path, type, imageUrl]);

  return null;
}
