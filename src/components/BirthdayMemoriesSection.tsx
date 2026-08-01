import { Cake, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { birthdayMemoryEvents } from "../data/birthdayMemories";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { EventCard } from "./EventCard";
import { SectionHeader } from "./SectionHeader";

export function BirthdayMemoriesSection() {
  const [activeId, setActiveId] = useState(
    birthdayMemoryEvents[0]?.id ?? "",
  );
  const activeEvent =
    birthdayMemoryEvents.find((event) => event.id === activeId) ??
    birthdayMemoryEvents[0];

  if (!activeEvent) return null;

  return (
    <section
      id="birthday"
      className="scroll-mt-24 overflow-hidden border-y border-rosefog/20 bg-[linear-gradient(145deg,#fffafc_0%,#fff4f7_48%,#fdf4e8_100%)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <SectionHeader
            kicker="20th Birthday Memories"
            title="ハタチのお祝い、その全部をひとつに"
            copy="家族とのクルーズディナーから生誕祭まで。20歳を迎えた里季ちゃんの、幸せな誕生日の思い出をまとめました。"
          />
          <div className="riri-card relative overflow-hidden border-champagne/35 bg-white/80 p-5 shadow-paper">
            <div className="pointer-events-none absolute -right-5 -top-6 text-rosefog/20" aria-hidden="true">
              <Heart className="h-28 w-28 fill-current" />
            </div>
            <div className="relative flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne">
                <Cake className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
                  Birthday Story Archive
                </p>
                <p className="mt-1 font-display text-xl text-ink">
                  {birthdayMemoryEvents.length}つの大切な思い出
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          role="tablist"
          aria-label="誕生日の思い出を選ぶ"
        >
          {birthdayMemoryEvents.map((event, index) => {
            const selected = event.id === activeEvent.id;
            return (
              <button
                key={event.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="birthday-memory-panel"
                onClick={() => setActiveId(event.id)}
                className={`riri-card riri-card-interactive group grid min-h-24 grid-cols-[76px_1fr] overflow-hidden text-left transition ${
                  selected
                    ? "border-champagne bg-white shadow-paper"
                    : "border-rosefog/25 bg-white/70 hover:border-champagne/60"
                }`}
              >
                <span className="relative h-full min-h-24 overflow-hidden bg-porcelain">
                  <img
                    {...getResponsiveImageProps(event.image, "76px", [360])}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex min-w-0 flex-col justify-center px-3 py-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide text-champagneInk">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Story {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-ink">
                    {event.shortTitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="birthday-memory-panel"
          role="tabpanel"
          className="mt-6"
          aria-live="polite"
        >
          <EventCard key={activeEvent.id} event={activeEvent} />
        </div>
      </div>
    </section>
  );
}
