import { Clock3, MapPin, Ticket } from "lucide-react";
import { categoryMeta } from "../lib/eventMeta";
import type { ScheduleEvent } from "../types";
import { Badge } from "./Badge";
import { ExternalButton } from "./ExternalButton";
import { Photo } from "./Photo";
import { SectionHeader } from "./SectionHeader";

type NextEventProps = {
  event?: ScheduleEvent;
};

export function NextEvent({ event }: NextEventProps) {
  if (!event) {
    return null;
  }

  const meta = categoryMeta[event.category];
  const Icon = meta.Icon;
  const ticketLink =
    event.links.find((link) => link.kind === "ticket") ?? event.links[0];

  return (
    <section id="next" className="relative overflow-hidden bg-porcelain py-16 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-champagne/40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Next Appearance"
          title="次に見るべき出演情報"
          copy="ファンが最初に迷わないよう、直近の予定と予約導線を大きくまとめています。"
        />

        <article className="zine-panel grid overflow-hidden border border-champagne/70 bg-white lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative min-h-[420px] overflow-hidden bg-ink sm:min-h-[560px]">
            <Photo
              src={event.image}
              alt={event.title}
              className="absolute inset-0 h-full w-full"
              imageClassName="object-top transition duration-700 hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,42,46,0.02),rgba(49,42,46,0.52))]" />
            <div className="absolute left-4 top-4 border border-white/50 bg-white/18 px-3 py-2 text-xs font-black uppercase text-white backdrop-blur">
              NEXT
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
              <p className="font-display text-4xl leading-tight sm:text-5xl">
                {event.shortTitle}
              </p>
              <p className="mt-3 flex gap-2 text-sm font-bold text-white/82">
                <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                {event.displayDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge strong>NEXT</Badge>
                <Badge category={event.category}>{meta.label}</Badge>
                {event.badges
                  .filter((badge) => badge !== "NEXT" && badge !== meta.label)
                  .map((badge) => (
                    <Badge key={badge}>{badge}</Badge>
                  ))}
              </div>

              <div className="mb-6 flex items-start gap-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center border ${meta.tone}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                    {event.title}
                  </h3>
                  <p className="mt-4 flex gap-2 text-sm font-bold text-champagne">
                    <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {event.displayDate}
                  </p>
                </div>
              </div>

              <p className="text-lg leading-9 text-ink/72">{event.summary}</p>
              {event.venue && (
                <p className="mt-5 flex gap-2 border-l-2 border-champagne pl-4 text-sm font-bold text-ink/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
                  {event.venue}
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              {ticketLink && (
                <ExternalButton href={ticketLink.url} variant="gold" className="w-full sm:w-auto">
                  <span className="inline-flex items-center gap-2">
                    <Ticket className="h-4 w-4" aria-hidden="true" />
                    {ticketLink.kind === "ticket" ? "チケット予約" : ticketLink.label}
                  </span>
                </ExternalButton>
              )}
              <a
                href="#schedule"
                className="inline-flex min-h-12 items-center justify-center border border-rosefog/40 bg-porcelain px-4 py-3 text-sm font-bold text-ink transition hover:bg-white"
              >
                ほかの予定も見る
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
