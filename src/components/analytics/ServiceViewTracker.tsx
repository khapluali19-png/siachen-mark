"use client";

import { useEffect } from "react";
import { trackServiceView } from "@/lib/tracking";

export default function ServiceViewTracker({
  serviceName,
  slug,
}: {
  serviceName: string;
  slug: string;
}) {
  useEffect(() => {
    trackServiceView(serviceName, slug);
  }, [serviceName, slug]);

  return null;
}
