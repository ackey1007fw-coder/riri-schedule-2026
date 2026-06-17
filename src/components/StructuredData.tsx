import { useEffect } from "react";
import { events } from "../data/events";
import { searchFaqs } from "../data/searchFaq";

// events.ts の内容を schema.org Event の構造化データ(JSON-LD)として
// 実行時に <head> へ出力する。データを足すだけで検索向けにも反映される。
const BASE = "https://riri-schedule-2026.vercel.app";
const PERSON_ID = `${BASE}/#person`;
const SCRIPT_ID = "riri-events-jsonld";

const toAbsolute = (path: string) =>
  path.startsWith("http") ? path : `${BASE}${path}`;

export function StructuredData() {
  useEffect(() => {
    const graph = events.map((event) => {
      const node: Record<string, unknown> = {
        "@type": "Event",
        "@id": `${BASE}/#event-${event.id}`,
        name: event.title,
        startDate: event.startAt,
        endDate: event.endAt ?? event.startAt,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: event.venue
          ? "https://schema.org/OfflineEventAttendanceMode"
          : "https://schema.org/OnlineEventAttendanceMode",
        description: event.summary,
        performer: { "@id": PERSON_ID },
        url: `${BASE}/#schedule`,
      };
      if (event.image) node.image = [toAbsolute(event.image)];
      if (event.venue) node.location = { "@type": "Place", name: event.venue };
      return node;
    });

    const faqPage = {
      "@type": "FAQPage",
      "@id": `${BASE}/#faq`,
      mainEntity: searchFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
          url: `${BASE}${faq.href}`
        }
      }))
    };

    const payload = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [...graph, faqPage],
    });

    document.getElementById(SCRIPT_ID)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCRIPT_ID;
    script.textContent = payload;
    document.head.appendChild(script);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, []);

  return null;
}
