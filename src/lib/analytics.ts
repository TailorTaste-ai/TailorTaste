export const analyticsEvents = {
  ctaClicked: "cta_clicked",
  contactFormStarted: "contact_form_started",
  contactFormSubmittedLocal: "contact_form_submitted_local",
  contactFormSubmittedBackend: "contact_form_submitted_backend",
  routeViewed: "route_viewed",
} as const;

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsPayload = {
  label?: string;
  href?: string;
  location?: string;
  inquiryType?: string;
};

type QueuedAnalyticsEvent = {
  event: AnalyticsEventName;
  payload: AnalyticsPayload;
  timestamp: number;
};

declare global {
  interface Window {
    __TT_ANALYTICS_QUEUE__?: QueuedAnalyticsEvent[];
  }
}

export function trackEvent(event: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.__TT_ANALYTICS_QUEUE__) {
    window.__TT_ANALYTICS_QUEUE__ = [];
  }

  window.__TT_ANALYTICS_QUEUE__.push({
    event,
    payload,
    timestamp: Date.now(),
  });
}
