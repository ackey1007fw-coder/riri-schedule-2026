import { CalendarCheck, MessageCircleHeart, Ticket } from "lucide-react";
import { profile } from "../data/profile";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import type { ScheduleEvent, SocialLink } from "../types";
import { ExternalButton } from "./ExternalButton";

type HeroProps = {
  nextEvent?: ScheduleEvent;
  socialLinks: SocialLink[];
};

const socialShortLabels: Record<string, string> = {
  x: "X",
  instagram: "IG",
  threads: "Th",
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
  const mainSocials = socialLinks.slice(0, 5);

  return (
    <section
      id="top"
      className="relative border-b border-rosefog/20 bg-porcelain"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 lg:items-stretch">
        {profile.heroImage && (
          <div className="relative order-1 overflow-hidden lg:order-2 lg:min-h-[90svh]">
            <img
              {...getResponsiveImageProps(
                profile.heroImage,
                "(min-width: 1024px) 50vw, 100vw",
              )}
              alt={profile.name}
              loading="eager"
              fetchPriority="high"
              className="block w-full object-cover object-[50%_20%] lg:absolute lg:inset-0 lg:h-full"
            />
            <p className="absolute right-4 top-4 hidden border border-white/60 bg-white/30 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-ink backdrop-blur lg:block">
              Fan Schedule / Yukako 2026
            </p>
          </div>
        )}

        <div className="order-2 flex flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:order-1 lg:px-10 lg:py-20">
          <p className="gold-kicker mb-5 inline-flex self-start px-3 py-2 text-xs font-bold uppercase">
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

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#next"
                className="yukako-button yukako-button-primary min-h-12 px-5 py-3 text-sm shadow-paper"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                公演情報を見る
              </a>
              {ticketLink && (
                <ExternalButton href={ticketLink.url} variant="gold" className="px-5">
                  <span className="inline-flex items-center gap-2">
                    <Ticket className="h-4 w-4" aria-hidden="true" />
                    {ticketLink.kind === "ticket" ? "チケット予約" : ticketLink.label}
                  </span>
                </ExternalButton>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="#links"
                className="yukako-button yukako-button-soft min-h-12 px-4 py-3 text-sm shadow-sm"
              >
                <MessageCircleHeart className="h-4 w-4 text-champagne" aria-hidden="true" />
                SNSを見る
              </a>
            </div>
          </div>

          {mainSocials.length > 0 && (
            <div className="mt-7 flex items-center gap-2">
              {mainSocials.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${link.label} ${link.handle}`}
                  className="grid h-11 w-11 place-items-center border border-rosefog/30 bg-white text-xs font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-champagne"
                >
                  {socialShortLabels[link.kind]}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
