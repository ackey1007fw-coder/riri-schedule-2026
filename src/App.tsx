import { useEffect, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ActionStrip } from "./components/ActionStrip";
import { BirthdayBanner } from "./components/BirthdayBanner";
import { BirthdayCelebration } from "./components/BirthdayCelebration";
import { BirthdayCountdown } from "./components/BirthdayCountdown";
import { BirthdayDayBanner } from "./components/BirthdayDayBanner";
import { CharmSection } from "./components/CharmSection";
import { ClipSection } from "./components/ClipSection";
import { Footer } from "./components/Footer";
import { FanLetterSection } from "./components/FanLetterSection";
import { Hero } from "./components/Hero";
import { HighlightsSection } from "./components/HighlightsSection";
import { InterviewSection } from "./components/InterviewSection";
import { LinksSection } from "./components/LinksSection";
import { LiveBanner } from "./components/LiveBanner";
import { MagazineSpread } from "./components/MagazineSpread";
import { MobileActionDock } from "./components/MobileActionDock";
import { NextEvent } from "./components/NextEvent";
import { NewsBar } from "./components/NewsBar";
import { PetSection } from "./components/PetSection";
import { QuickNav } from "./components/QuickNav";
import { ScrollToTop } from "./components/ScrollToTop";
import { SectionReveal } from "./components/SectionReveal";
import { Slideshow } from "./components/Slideshow";
import { PhotoGallerySection } from "./components/PhotoGallerySection";
import { ProfileSection } from "./components/ProfileSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { SearchSeoSection } from "./components/SearchSeoSection";
import { ShareSection } from "./components/ShareSection";
import { ShowroomSection } from "./components/ShowroomSection";
import { SiteHeader } from "./components/SiteHeader";
import { SpecialStreamBanner } from "./components/SpecialStreamBanner";
import { StructuredData } from "./components/StructuredData";
import { SupportersSection } from "./components/SupportersSection";
import { TodayDashboard } from "./components/TodayDashboard";
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
          <div className="riri-skeleton h-16 w-16 rounded-full" />
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-champagne">
              Riri Schedule 2026
            </p>
            <p className="font-display text-3xl">Fan Scheduleを準備中です</p>
          </div>
          <div className="mt-2 flex gap-3">
            <div className="riri-skeleton h-3 w-20 rounded" />
            <div className="riri-skeleton h-3 w-16 rounded" />
            <div className="riri-skeleton h-3 w-24 rounded" />
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
    <div className="min-h-screen bg-porcelain pb-24 text-ink md:pb-0">
      <BirthdayDayBanner />
      <SpecialStreamBanner />
      <LiveBanner />
      <SiteHeader socialLinks={socialLinks} />
      <NewsBar />
      <QuickNav />
      <main>
        {isLoading && (
          <div className="bg-ink px-4 py-2 text-center text-xs font-bold text-white">
            スケジュールを読み込み中です
          </div>
        )}
        <BirthdayBanner />
        <BirthdayCelebration />
        <Hero nextEvent={nextEvent} socialLinks={socialLinks} />
        <ActionStrip nextEvent={nextEvent} socialLinks={socialLinks} />
        <SectionReveal>
          <TodayDashboard events={events} socialLinks={socialLinks} />
        </SectionReveal>
        <SectionReveal>
          <MagazineSpread nextEvent={nextEvent} />
        </SectionReveal>
        <SectionReveal>
          <CharmSection />
        </SectionReveal>
        <Slideshow />
        <SectionReveal>
          <ClipSection />
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
          <PhotoGallerySection />
        </SectionReveal>
        <SectionReveal>
          <BirthdayCountdown />
        </SectionReveal>
        <SectionReveal>
          <ShowroomSection />
        </SectionReveal>
        <SectionReveal>
          <ProfileSection />
        </SectionReveal>
        <SectionReveal>
          <PetSection />
        </SectionReveal>
        <SectionReveal>
          <InterviewSection />
        </SectionReveal>
        <SectionReveal>
          <FanLetterSection />
        </SectionReveal>
        <SectionReveal>
          <SupportersSection />
        </SectionReveal>
        <SearchSeoSection />
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
      <MobileActionDock nextEvent={nextEvent} socialLinks={socialLinks} />
      <StructuredData />
      <Analytics />
    </div>
  );
}

export default App;
