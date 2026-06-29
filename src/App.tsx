import { useEffect, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ActionStrip } from "./components/ActionStrip";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HighlightsSection } from "./components/HighlightsSection";
import { LinksSection } from "./components/LinksSection";
import { NextEvent } from "./components/NextEvent";
import { NewsBar } from "./components/NewsBar";
import { PhotoGallerySection } from "./components/PhotoGallerySection";
import { PortalIntroSection } from "./components/PortalIntroSection";
import { QuickNav } from "./components/QuickNav";
import { ScrollToTop } from "./components/ScrollToTop";
import { SectionReveal } from "./components/SectionReveal";
import { ProfileSection } from "./components/ProfileSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { SearchSeoSection } from "./components/SearchSeoSection";
import { ShareSection } from "./components/ShareSection";
import { ShowroomSection } from "./components/ShowroomSection";
import { SiteHeader } from "./components/SiteHeader";
import { StructuredData } from "./components/StructuredData";
import { LiveBanner } from "./components/LiveBanner";
import {
  getMonthKeysFromEvents,
  isEventPast,
  sortEventsAsc,
  sortEventsDesc
} from "./lib/date";
import { fetchSchedule } from "./lib/scheduleApi";
import type { ScheduleData } from "./types/schedule";

function App() {
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchSchedule().then((data) => {
      if (!isMounted) return;
      setSchedule(data);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!schedule) {
    return (
      <div className="grid min-h-screen place-items-center bg-porcelain px-6 text-center text-ink">
        <div className="flex flex-col items-center gap-5">
          <div className="yukako-skeleton h-16 w-16 rounded-full" />
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-champagne">
              Yoshii Yukako Portal
            </p>
            <p className="font-display text-3xl">スケジュールを準備中です</p>
          </div>
          <div className="mt-2 flex gap-3">
            <div className="yukako-skeleton h-3 w-20 rounded" />
            <div className="yukako-skeleton h-3 w-16 rounded" />
            <div className="yukako-skeleton h-3 w-24 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const { events, socialLinks, mediaLinks, source, updatedAt } = schedule;
  const now = new Date();
  const upcomingEvents = sortEventsAsc(
    events.filter((event) => !isEventPast(event, now)),
  );
  const pastEvents = sortEventsDesc(
    events.filter((event) => isEventPast(event, now)),
  );
  const nextEvent = upcomingEvents[0];
  const monthKeys = getMonthKeysFromEvents(events);

  return (
    <div className="min-h-screen bg-porcelain text-ink">
      <SiteHeader socialLinks={socialLinks} />
      <LiveBanner />
      <NewsBar />
      <QuickNav />
      <main>
        {isLoading && (
          <div className="bg-ink px-4 py-2 text-center text-xs font-bold text-white">
            スケジュールを読み込み中です
          </div>
        )}
        <Hero nextEvent={nextEvent} socialLinks={socialLinks} />
        <ActionStrip
          nextEvent={nextEvent}
          upcomingEvents={upcomingEvents}
          socialLinks={socialLinks}
        />
        <SectionReveal>
          <PortalIntroSection />
        </SectionReveal>
        <SectionReveal>
          <NextEvent event={nextEvent} />
        </SectionReveal>
        <SectionReveal>
          <ScheduleSection
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            allEvents={events}
            monthKeys={monthKeys}
          />
        </SectionReveal>
        <SectionReveal>
          <HighlightsSection />
        </SectionReveal>
        <SectionReveal>
          <ProfileSection />
        </SectionReveal>
        <SectionReveal>
          <PhotoGallerySection />
        </SectionReveal>
        <SearchSeoSection />
        <SectionReveal>
          <ShowroomSection />
        </SectionReveal>
        <SectionReveal>
          <LinksSection socialLinks={socialLinks} mediaLinks={mediaLinks} />
        </SectionReveal>
        <SectionReveal>
          <ShareSection />
        </SectionReveal>
      </main>
      <Footer
        socialLinks={socialLinks}
        source={source}
        updatedAt={updatedAt}
      />
      <ScrollToTop />
      <StructuredData />
      <Analytics />
    </div>
  );
}

export default App;
