import { CalendarDays, CalendarPlus, MapPin, MessageCircle, Share2 } from "lucide-react";
import { categoryMeta } from "../lib/eventMeta";
import { isEventPast } from "../lib/date";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { googleCalendarUrl, SITE_URL, xShareUrl } from "../lib/share";
import type { ScheduleEvent } from "../types";
import { Badge } from "./Badge";
import { ExternalButton } from "./ExternalButton";

type EventCardProps = {
  event: ScheduleEvent;
  isNext?: boolean;
  compact?: boolean;
};

export function EventCard({ event, isNext = false, compact = false }: EventCardProps) {
  const meta = categoryMeta[event.category];
  const Icon = meta.Icon;
  const upcoming = !isEventPast(event);
  const ticketLink = event.links.find((link) => link.kind === "ticket");
  const streamLink = event.links.find((link) => link.kind === "stream");
  const infoLink = event.links.find((link) => link.kind === "info") ?? event.links[0];
  const shareText = upcoming
    ? `${event.title}を応援しています`
    : `${event.title}の活動記録を見ました`;
  const supportActions = [
    ...(streamLink ? [{ label: "配信を見る", href: streamLink.url, external: true }] : []),
    ...(ticketLink ? [{ label: "チケット予約", href: ticketLink.url, external: true }] : []),
    ...(infoLink ? [{ label: infoLink.label, href: infoLink.url, external: true }] : []),
    {
      label: upcoming ? "Xで拡散" : "感想投稿",
      href: xShareUrl(shareText, `${SITE_URL}#event-${event.id}`),
      external: true
    },
    ...(upcoming
      ? [{ label: "カレンダー追加", href: googleCalendarUrl(event), external: true }]
      : [])
  ];

  return (
    <article
      className={`riri-card riri-card-interactive group relative grid overflow-hidden bg-white ${
        event.isImportant || isNext
          ? "border-champagne/70"
          : "border-rosefog/25"
      } ${compact ? "sm:grid-cols-[160px_1fr]" : "sm:grid-cols-[220px_1fr]"}`}
    >
      {(event.isImportant || isNext) && (
        <div className="absolute left-0 top-0 z-10 h-full w-1 bg-champagne" />
      )}

      {event.image ? (
        <div className="relative bg-porcelain">
          <img
            {...getResponsiveImageProps(
              event.image,
              compact
                ? "(min-width: 640px) 160px, 100vw"
                : "(min-width: 640px) 220px, 100vw",
            )}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="block w-full object-cover object-top sm:absolute sm:inset-0 sm:h-full"
          />
        </div>
      ) : (
        <div className="hidden bg-porcelain sm:flex sm:items-center sm:justify-center">
          <span className="font-display text-2xl text-ink/15">{event.shortTitle}</span>
        </div>
      )}

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
            <div className="mt-3 grid gap-2 text-sm text-ink/62">
              <p className="flex gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                <span>{event.displayDate}</span>
              </p>
              {event.venue && (
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                  <span>{event.venue}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <p className={`${compact ? "mt-4" : "mt-5"} leading-8 text-ink/72`}>
          {event.summary}
        </p>

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

        <div className="mt-6 border-t border-rosefog/15 pt-5">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase text-champagne">
            {upcoming ? (
              <Share2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            )}
            {upcoming ? "応援アクション" : "活動の記録"}
          </p>
          <div className="flex flex-wrap gap-2">
            {supportActions.map((action) => (
              <a
                key={`${action.label}-${action.href}`}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-10 items-center justify-center border border-rosefog/25 bg-porcelain px-3 py-2 text-xs font-bold text-ink/72 transition hover:border-champagne hover:bg-white hover:text-ink"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
