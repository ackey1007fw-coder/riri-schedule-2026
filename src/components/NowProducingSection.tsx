import {
  CalendarPlus,
  Clock3,
  MapPin,
  Music,
  PenLine,
  Palette,
  Sparkles,
  Ticket,
  Users
} from "lucide-react";
import { getGojetStatus } from "../lib/gojetStatus";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { googleCalendarUrl } from "../lib/share";
import type { ScheduleEvent } from "../types";
import { ActHeader } from "./ActHeader";
import { ExternalButton } from "./ExternalButton";

type NowProducingSectionProps = {
  event?: ScheduleEvent;
};

const roles = [
  { label: "プロデュース", Icon: Sparkles },
  { label: "脚色", Icon: PenLine },
  { label: "楽曲", Icon: Music },
  { label: "デザイン", Icon: Palette },
  { label: "出演（B班JET / C班早紀）", Icon: Users }
];

// ヒーロー直下の #ゆかJET 特設ブロック（Now Producing billboard）。
// ポスター + カウントダウン + 役割リスト + 予約CTA を、舞台看板風の1枚にまとめる。
export function NowProducingSection({ event }: NowProducingSectionProps) {
  const status = getGojetStatus();

  if (!event) {
    return (
      <section id="next" className="scroll-mt-24 bg-ink py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ActHeader
            act={1}
            eyebrow="Now Producing"
            title="#ゆかJET 公演情報"
            tone="dark"
            copy="新しい公演情報が決まり次第、ここに掲載します。"
          />
        </div>
      </section>
    );
  }

  const ticketLink =
    event.links.find((link) => link.kind === "ticket") ?? event.links[0];

  return (
    <section id="next" className="scroll-mt-24 bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActHeader
          act={1}
          eyebrow="Now Producing"
          title="#ゆかJET 公演情報"
          tone="dark"
          copy="吉井優花子が企画・脚色から出演まで手がけるプロデュース公演。次の舞台をここでチェック。"
        />

        <article className="yukako-billboard border border-champagne/30">
          <span className="yukako-billboard-spotlight" aria-hidden="true" />
          <div className="relative z-10 grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.86fr_1.14fr] lg:p-14">
            <div className="relative overflow-hidden border border-champagne/40 bg-black/20">
              {event.image ? (
                <img
                  {...getResponsiveImageProps(
                    event.image,
                    "(min-width: 1024px) 40vw, 100vw",
                  )}
                  alt={event.title}
                  className="block w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center">
                  <p className="font-display text-5xl text-white/20">
                    {event.shortTitle}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between text-white">
              <div>
                <h3 className="font-display text-3xl leading-tight sm:text-4xl">
                  {event.title}
                </h3>
                <p className="mt-4 flex items-center gap-2 text-sm font-bold text-champagne">
                  <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {event.displayDate}
                </p>
                {event.venue && (
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white/72">
                    <MapPin className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                    {event.venue}
                  </p>
                )}

                {status.phase !== "after" && (
                  <div className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-champagne/40 bg-white/8 px-4 py-3 text-sm font-bold backdrop-blur">
                    {status.phase === "before" ? (
                      <>
                        <span className="text-champagne">公演まで</span>
                        <span className="font-display text-3xl leading-none">
                          あと{status.daysLeft}日
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-champagne">本日の回</span>
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          {status.day.performances.map((performance) => (
                            <span key={`${performance.time}-${performance.team}`}>
                              {performance.time}〜 {performance.team}
                            </span>
                          ))}
                        </span>
                      </>
                    )}
                  </div>
                )}

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {roles.map((role) => (
                    <li
                      key={role.label}
                      className="flex items-center gap-2.5 border border-white/12 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/85"
                    >
                      <role.Icon className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                      {role.label}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-base leading-8 text-white/72">{event.summary}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {ticketLink && (
                  <ExternalButton href={ticketLink.url} variant="gold" className="w-full sm:w-auto">
                    <span className="inline-flex items-center gap-2">
                      <Ticket className="h-4 w-4" aria-hidden="true" />
                      {ticketLink.kind === "ticket" ? "チケット予約" : ticketLink.label}
                    </span>
                  </ExternalButton>
                )}
                <a
                  href={googleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
                >
                  <CalendarPlus className="h-4 w-4 text-champagne" aria-hidden="true" />
                  カレンダーに追加
                </a>
                <a
                  href="#support"
                  className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm"
                >
                  応援メニューを見る
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
