import {
  ArrowDown,
  CalendarCheck,
  MessageCircleHeart,
  Ticket,
  Users
} from "lucide-react";
import { profile } from "../data/profile";
import type { ScheduleEvent, SocialLink } from "../types";
import { ExternalButton } from "./ExternalButton";
import { Photo } from "./Photo";

type HeroProps = {
  nextEvent?: ScheduleEvent;
  socialLinks: SocialLink[];
};

const socialShortLabels: Record<string, string> = {
  x: "X",
  instagram: "IG",
  tiktok: "TT",
  showroom: "SR",
  link: "LN",
  note: "NO",
  youtube: "YT",
  web: "WEB"
};

export function Hero({ nextEvent, socialLinks }: HeroProps) {
  const ticketLink =
    nextEvent?.links.find((link) => link.kind === "ticket") ??
    nextEvent?.links[0];
  const mainSocials = socialLinks.slice(0, 4);

  return (
    <section
      id="top"
      className="relative isolate min-h-[94svh] overflow-hidden border-b border-rosefog/20 bg-porcelain"
    >
      <Photo
        src={profile.heroImage}
        alt={`${profile.name} hero`}
        loading="eager"
        className="absolute inset-0 -z-20 h-full w-full"
        imageClassName="object-[62%_18%] sm:object-[68%_20%]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,250,252,0.05)_0%,rgba(255,250,252,0.2)_38%,rgba(255,250,252,0.96)_78%,#fffafc_100%)] sm:bg-[linear-gradient(90deg,rgba(255,250,252,0.98)_0%,rgba(255,250,252,0.9)_34%,rgba(255,250,252,0.45)_61%,rgba(255,250,252,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-56 bg-[linear-gradient(180deg,rgba(255,250,252,0),#fffafc_82%)] sm:block" />
      <div className="absolute left-4 top-24 hidden h-[58svh] w-px bg-champagne/50 sm:block lg:left-8" />
      <p className="absolute left-6 top-24 hidden origin-left rotate-90 text-[11px] font-black uppercase tracking-[0.22em] text-champagne sm:block lg:left-10">
        Fan Schedule / Riri 2026
      </p>

      <div className="mx-auto flex min-h-[94svh] max-w-7xl flex-col justify-end px-4 pb-6 pt-28 sm:px-6 sm:pb-8 sm:pt-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="max-w-3xl pb-6">
            <p className="gold-kicker mb-5 inline-flex px-3 py-2 text-xs font-bold uppercase">
              {profile.theme}
            </p>
            <h1 className="font-display text-6xl leading-[0.96] text-ink sm:text-7xl lg:text-8xl">
              {profile.name}
            </h1>
            <p className="mt-4 font-display text-2xl text-ink/65 sm:text-3xl">
              {profile.romaji}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-ink/78 sm:mt-7 sm:text-xl sm:leading-9">
              {profile.catchCopy}
            </p>
            <p className="mt-3 max-w-xl leading-8 text-ink/62">{profile.intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#next"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink bg-ink px-5 py-3 text-sm font-bold text-white shadow-paper transition hover:-translate-y-0.5 hover:bg-[#4a3942]"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                次の出演を見る
              </a>
              {ticketLink && (
                <ExternalButton href={ticketLink.url} variant="gold" className="px-5">
                  <span className="inline-flex items-center gap-2">
                    <Ticket className="h-4 w-4" aria-hidden="true" />
                    チケット予約
                  </span>
                </ExternalButton>
              )}
              <a
                href="#links"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/70 bg-white/80 px-5 py-3 text-sm font-bold text-ink shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
                SNSを見る
              </a>
            </div>
          </div>

          <div className="zine-panel mb-4 hidden border border-white/75 bg-white/58 p-4 backdrop-blur-md lg:block">
            <div className="grid min-h-[210px] grid-cols-[1fr_auto] gap-5">
              {nextEvent && (
                <a href="#next" className="group flex items-start gap-4 text-left text-ink">
                  <span className="mt-1 grid h-12 w-12 shrink-0 place-items-center border border-champagne bg-white/85">
                    <ArrowDown className="h-5 w-5 text-champagne" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-black uppercase text-champagne">
                      Next Appearance
                    </span>
                    <span className="mt-2 block font-display text-3xl leading-tight">
                      {nextEvent.shortTitle}
                    </span>
                    <span className="mt-3 block text-sm font-bold text-ink/62">
                      {nextEvent.displayDate}
                    </span>
                  </span>
                </a>
              )}

              <div className="flex flex-col items-end justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-ink/50" aria-hidden="true" />
                  {mainSocials.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${link.label} ${link.handle}`}
                      className="grid h-11 w-11 place-items-center border border-white/90 bg-white/82 text-xs font-black text-ink shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-champagne"
                    >
                      {socialShortLabels[link.kind]}
                    </a>
                  ))}
                </div>
                <p className="max-w-52 text-right text-xs font-bold leading-6 text-ink/56">
                  出演、配信、SNSをここからすぐ確認できます。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-champagne/30 pt-5 lg:hidden">
          {nextEvent && (
            <a href="#next" className="min-w-0 text-left text-ink">
              <span className="block text-xs font-bold uppercase text-champagne">
                Next Appearance
              </span>
              <span className="mt-1 block truncate text-base font-bold">
                {nextEvent.shortTitle}
              </span>
            </a>
          )}
          <div className="flex shrink-0 items-center gap-2">
            {mainSocials.slice(0, 3).map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${link.label} ${link.handle}`}
                className="grid h-11 w-11 place-items-center border border-white/80 bg-white/80 text-xs font-black text-ink shadow-sm backdrop-blur"
              >
                {socialShortLabels[link.kind]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
