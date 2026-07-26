import { CalendarDays, CalendarPlus, Instagram, MapPin } from "lucide-react";
import { categoryMeta } from "../lib/eventMeta";
import { isEventPast } from "../lib/date";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { googleCalendarUrl } from "../lib/share";
import type { ScheduleEvent } from "../types";
import { Badge } from "./Badge";
import { ExternalButton } from "./ExternalButton";
import { VenueLinks } from "./VenueLinks";

type EventCardProps = {
  event: ScheduleEvent;
  isNext?: boolean;
  compact?: boolean;
};

export function EventCard({ event, isNext = false, compact = false }: EventCardProps) {
  const meta = categoryMeta[event.category];
  const Icon = meta.Icon;
  const upcoming = !isEventPast(event);
  // レポート系カードは本文・写真が長くなるため、サイドの細い帯に画像を詰めず
  // 上部いっぱいに大きく表示する（顔やケーキが不自然に切れないように）。
  const hasReportContent = Boolean(
    (event.gallery && event.gallery.length > 0) || event.reportQuote,
  );

  return (
    <article
      className={`riri-card riri-card-interactive group relative grid overflow-hidden bg-white ${
        event.isImportant || isNext
          ? "border-champagne/70"
          : "border-rosefog/25"
      } ${
        hasReportContent
          ? ""
          : compact
            ? "sm:grid-cols-[160px_1fr]"
            : "sm:grid-cols-[220px_1fr]"
      }`}
    >
      {(event.isImportant || isNext) && (
        <div className="absolute left-0 top-0 z-10 h-full w-1 bg-champagne" />
      )}

      <div className={`relative bg-porcelain ${hasReportContent ? "sm:aspect-[3/4]" : ""}`}>
        <img
          {...getResponsiveImageProps(
            event.image,
            hasReportContent
              ? "(min-width: 640px) 50vw, 100vw"
              : compact
                ? "(min-width: 640px) 160px, 100vw"
                : "(min-width: 640px) 220px, 100vw",
          )}
          alt={event.imageAlt ?? event.title}
          loading="lazy"
          decoding="async"
          className={`block w-full object-cover object-top ${
            hasReportContent ? "sm:h-full" : "sm:absolute sm:inset-0 sm:h-full"
          }`}
        />
      </div>

      <div className={`${compact ? "p-5" : "p-6"} flex flex-col`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {isNext && <Badge strong>NEXT</Badge>}
          <Badge category={event.category}>{meta.label}</Badge>
          {event.badges
            .filter((badge) => badge !== "NEXT" && badge !== meta.label)
            .slice(0, compact ? 3 : 5)
            .map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
        </div>

        <div className="flex items-start gap-3">
          <span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center border ${meta.tone}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3
              className={`font-display leading-tight text-ink ${
                compact ? "text-xl" : "text-2xl"
              }`}
            >
              {event.title}
            </h3>
            {event.subtitle && (
              <p className="mt-1 text-sm font-bold text-champagneInk">
                {event.subtitle}
              </p>
            )}
            <div className="mt-3 grid gap-2 text-sm text-ink/62">
              <p className="flex gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                <span>{event.displayDate}</span>
              </p>
              {event.venue && (
                <p className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <MapPin className="h-4 w-4 shrink-0 text-champagne" />
                  <span>{event.venue}</span>
                  <VenueLinks venue={event.venue} />
                </p>
              )}
            </div>
          </div>
        </div>

        <p className={`${compact ? "mt-4" : "mt-5"} leading-8 text-ink/72`}>
          {event.summary}
        </p>

        {event.reportQuote && (
          <div className="mt-5 border border-champagne/30 bg-porcelain/70 p-4 sm:p-5">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-champagneInk">
              <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
              投稿本文より
            </p>
            <p className="whitespace-pre-line text-sm leading-7 text-ink/80">
              {event.reportQuote}
            </p>
          </div>
        )}

        {event.reportNote && (
          <p className="mt-4 border-l-2 border-rosefog/40 pl-3 text-sm italic leading-7 text-ink/55">
            {event.reportNote}
          </p>
        )}

        {event.gallery && event.gallery.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {event.gallery.map((photo) => (
              <span
                key={photo.src}
                className="relative block aspect-[3/4] overflow-hidden border border-rosefog/20 bg-porcelain"
              >
                <img
                  {...getResponsiveImageProps(
                    photo.src,
                    "(min-width: 640px) 33vw, 50vw",
                  )}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 block h-full w-full object-cover"
                />
              </span>
            ))}
          </div>
        )}

        {(event.links.length > 0 || upcoming) && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {event.links.map((link, index) => (
              <ExternalButton
                key={link.url}
                href={link.url}
                variant={link.kind === "ticket" ? "gold" : index === 0 ? "primary" : "light"}
              >
                {link.label}
              </ExternalButton>
            ))}
            {upcoming && (
              <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-button riri-button-soft min-h-12 px-4 py-3 text-sm"
              >
                <CalendarPlus className="h-4 w-4 text-champagne" aria-hidden="true" />
                カレンダー
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
