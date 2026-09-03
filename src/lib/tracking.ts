"use client";

// Window declaration extensions for tracking libraries
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
    };
    lintrk?: (action: string, data?: Record<string, unknown>) => void;
  }
}

export type StandardEvent =
  | "page_view"
  | "generate_lead"
  | "contact_form_submit"
  | "whatsapp_click"
  | "book_strategy_call"
  | "phone_click"
  | "email_click"
  | "view_service"
  | "portfolio_interaction"
  | "cta_click"
  | "lead"
  | "contact"
  | "view_content";

export interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  currency?: string;
  source?: string;
  service?: string;
  location?: string;
  project?: string;
  [key: string]: unknown;
}

/**
 * Dispatches a tracking event across all active analytics and pixel integrations
 */
export function trackEvent(eventName: StandardEvent | string, params?: EventParams) {
  if (typeof window === "undefined") return;

  const eventData = {
    ...params,
    page_path: window.location.pathname,
    page_title: document.title,
    timestamp: new Date().toISOString(),
  };

  // 1. Google Analytics 4 (gtag)
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, eventData);
    } catch {
      // Ignore tracker runtime exceptions
    }
  }

  // 2. Google Tag Manager (dataLayer)
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
      });
    } catch {
      // Ignore dataLayer push exceptions
    }
  }

  // 3. Meta Pixel (fbq)
  if (typeof window.fbq === "function") {
    try {
      const metaEventMap: Record<string, string> = {
        page_view: "PageView",
        generate_lead: "Lead",
        lead: "Lead",
        contact_form_submit: "Lead",
        whatsapp_click: "Contact",
        book_strategy_call: "Schedule",
        phone_click: "Contact",
        email_click: "Contact",
        view_service: "ViewContent",
        view_content: "ViewContent",
        cta_click: "Contact",
      };
      const mappedMetaEvent = metaEventMap[eventName] || "CustomEvent";
      if (mappedMetaEvent === "CustomEvent") {
        window.fbq("trackCustom", eventName, eventData);
      } else {
        window.fbq("track", mappedMetaEvent, eventData);
      }
    } catch {
      // Ignore Meta Pixel exceptions
    }
  }

  // 4. TikTok Pixel (ttq)
  if (window.ttq && typeof window.ttq.track === "function") {
    try {
      const tiktokEventMap: Record<string, string> = {
        page_view: "PageView",
        generate_lead: "SubmitForm",
        lead: "SubmitForm",
        contact_form_submit: "SubmitForm",
        whatsapp_click: "Contact",
        book_strategy_call: "ClickButton",
        phone_click: "Contact",
        email_click: "Contact",
        view_service: "ViewContent",
        view_content: "ViewContent",
        cta_click: "ClickButton",
      };
      const mappedTiktokEvent = tiktokEventMap[eventName] || eventName;
      window.ttq.track(mappedTiktokEvent, eventData);
    } catch {
      // Ignore TikTok exceptions
    }
  }

  // 5. LinkedIn Insight (lintrk)
  if (typeof window.lintrk === "function") {
    try {
      window.lintrk("track", { conversion_id: eventName });
    } catch {
      // Ignore LinkedIn exceptions
    }
  }
}

/**
 * Convenient helpers for primary and secondary conversions
 */
export function trackWhatsAppClick(location?: string, extra?: Record<string, unknown>) {
  trackEvent("whatsapp_click", {
    category: "conversion",
    label: location || "global",
    location: location || "unknown",
    ...extra,
  });
}

export function trackStrategyCallClick(location?: string, extra?: Record<string, unknown>) {
  trackEvent("book_strategy_call", {
    category: "conversion",
    label: location || "global",
    location: location || "unknown",
    ...extra,
  });
}

export function trackPhoneClick(location?: string) {
  trackEvent("phone_click", {
    category: "contact_method",
    label: location || "global",
    location: location || "unknown",
  });
}

export function trackEmailClick(location?: string) {
  trackEvent("email_click", {
    category: "contact_method",
    label: location || "global",
    location: location || "unknown",
  });
}

export function trackServiceView(serviceName: string, slug: string) {
  trackEvent("view_service", {
    category: "content",
    label: serviceName,
    service: slug,
  });
}

export function trackPortfolioInteraction(projectName: string, action = "click") {
  trackEvent("portfolio_interaction", {
    category: "engagement",
    label: projectName,
    project: projectName,
    action,
  });
}
