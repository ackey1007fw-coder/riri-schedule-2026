import { useEffect } from "react";
import { events } from "../data/events";
import { profile } from "../data/profile";
import { searchFaqs } from "../data/searchFaq";

// events.ts の内容を schema.org Event の構造化データ(JSON-LD)として
// 実行時に <head> へ出力する。データを足すだけで検索向けにも反映される。
const BASE = "https://yukako-schedule-2026.vercel.app";
const PERSON_ID = `${BASE}/#person`;
const SCRIPT_ID = "yukako-events-jsonld";

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

    const website = {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      name: "Yukako Schedule 2026",
      alternateName: ["吉井優花子 応援スケジュール", "吉井優花子 活動情報", "秋田の優花子"],
      url: BASE,
      inLanguage: "ja",
      description: "吉井優花子さんのプロフィール、舞台、SHOWROOM、SNS、#ゆかJET 公演情報を整理する応援ページです。"
    };

    const person = {
      "@type": "Person",
      "@id": PERSON_ID,
      name: profile.name.replace(/\s/g, ""),
      alternateName: ["吉井 優花子", profile.kana, profile.romaji, ...profile.aliases],
      url: BASE,
      image: toAbsolute(profile.portraitImage),
      birthDate: profile.birthday,
      birthPlace: "秋田県秋田市",
      height: "161 cm",
      jobTitle: ["俳優", "タレント", "モデル", "ライバー"],
      description: "秋田県秋田市出身。舞台、テレビ、CM、モデル、SHOWROOM配信、プロデュース公演などで活動。",
      sameAs: profile.sources.map((source) => source.url)
    };

    const payload = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [website, person, ...graph, faqPage],
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
