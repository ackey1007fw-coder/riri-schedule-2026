import { useEffect } from "react";
import type { ScheduleEvent } from "../types";
import { createEventGraph, SITE_BASE } from "../lib/eventStructuredData";
import { searchFaqs } from "../data/searchFaq";

// 表示中の予定から、根拠のある Event 情報を実行時に <head> へ出力する。
const BASE = SITE_BASE;
const SCRIPT_ID = "riri-events-jsonld";

export function StructuredData({ events }: { events: ScheduleEvent[] }) {
  useEffect(() => {
    const graph = createEventGraph(events);

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
  }, [events]);

  return null;
}
