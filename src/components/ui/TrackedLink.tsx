"use client";

import React from "react";
import Link from "next/link";
import {
  trackWhatsAppClick,
  trackStrategyCallClick,
  trackPhoneClick,
  trackEmailClick,
  trackEvent,
} from "@/lib/tracking";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  trackingType?: "whatsapp" | "strategy_call" | "phone" | "email" | "custom";
  trackingLocation?: string;
  eventName?: string;
  eventParams?: Record<string, unknown>;
  isExternal?: boolean;
  children: React.ReactNode;
}

export default function TrackedLink({
  href,
  trackingType,
  trackingLocation,
  eventName,
  eventParams,
  isExternal,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    switch (trackingType) {
      case "whatsapp":
        trackWhatsAppClick(trackingLocation, eventParams);
        break;
      case "strategy_call":
        trackStrategyCallClick(trackingLocation, eventParams);
        break;
      case "phone":
        trackPhoneClick(trackingLocation);
        break;
      case "email":
        trackEmailClick(trackingLocation);
        break;
      case "custom":
        if (eventName) trackEvent(eventName, eventParams);
        break;
      default:
        break;
    }

    if (onClick) {
      onClick(e);
    }
  };

  const isExt = isExternal || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExt) {
    return (
      <a
        href={href}
        onClick={handleClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
