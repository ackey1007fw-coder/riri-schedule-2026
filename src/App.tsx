import { useEffect, useMemo, useState } from "react";
import { ActionStrip } from "./components/ActionStrip";
import { BirthdayBanner } from "./components/BirthdayBanner";
import { BirthdayCountdown } from "./components/BirthdayCountdown";
import { Footer } from "./components/Footer";
import { FanLetterSection } from "./components/FanLetterSection";
import { Hero } from "./components/Hero";
import { InterviewSection } from "./components/InterviewSection";
import { LinksSection } from "./components/LinksSection";
import { MobileActionDock } from "./components/MobileActionDock";
import { NextEvent } from "./components/NextEvent";
import { PhotoStrip } from "./components/PhotoStrip";
import { PhotoGallerySection } from "./components/PhotoGallerySection";
import { ProfileSection } from "./components/ProfileSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { SearchSeoSection } from "./components/SearchSeoSection";
import { ShowroomSection } from "./components/ShowroomSection";
import { SiteHeader } from "./components/SiteHeader";
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

  const normalizedSchedule = useMemo(() => schedule, [schedule]);

  if (!normalizedSchedule) {
    return (
      <div className="grid min-h-screen place-items-center bg-porcelain px-6 text-center text-ink">
        <div>
          <p className="mb-3 text-xs font-bold uppercase text-champagne">
            Riri Schedule 2026
          </p>
          <p className="font-display text-3xl">Fan Scheduleを準備中です</p>
        </div>
      </div>
    );
  }

  const { events, socialLinks, mediaLinks, source, updatedAt } = normalizedSchedule;
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
      <SiteHeader socialLinks={socialLinks} />
      <main>
        {isLoading && (
          <div className="bg-ink px-4 py-2 text-center text-xs font-bold text-white">
            スケジュールを読み込み中です
          </div>
        )}
        <BirthdayBanner />
        <Hero nextEvent={nextEvent} socialLinks={socialLinks} />
        <ActionStrip nextEvent={nextEvent} socialLinks={socialLinks} />
        <PhotoStrip />
        <NextEvent event={nextEvent} />
        <ScheduleSection
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
          allEvents={events}
          monthKeys={monthKeys}
        />
        <PhotoGallerySection />
        <BirthdayCountdown />
        <ShowroomSection />
        <ProfileSection />
        <InterviewSection />
        <FanLetterSection />
        <SearchSeoSection />
        <LinksSection socialLinks={socialLinks} mediaLinks={mediaLinks} />
      </main>
      <Footer
        socialLinks={socialLinks}
        source={source}
        updatedAt={updatedAt}
      />
      <MobileActionDock nextEvent={nextEvent} socialLinks={socialLinks} />
    </div>
  );
}

export default App;
