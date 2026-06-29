import { CalendarCheck, Clapperboard, MapPin, MessageCircleHeart } from "lucide-react";
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
  const showroomLink = socialLinks.find((link) => link.kind === "showroom");
  const mainSocials = socialLinks.slice(0, 5);

  return (
    <section
      id="top"
      className="yukako-hero relative overflow-hidden border-b border-champagne/25 bg-ink text-white"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:h-[calc(100svh-7rem)] lg:min-h-[560px] lg:max-h-[700px] lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <div className="order-1 flex flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:min-h-0 lg:px-10 lg:py-20">
          <div className="yukako-hero-panel">
            <p className="yukako-kicker mb-5 inline-flex self-start px-3 py-2 text-xs font-bold uppercase">
              非公式応援ポータル / Akita to Stage
            </p>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {profile.catchCopy}
            </h1>
            <p className="mt-5 font-display text-2xl text-champagne sm:text-3xl">
              {profile.name}
              <span className="ml-3 align-middle text-base text-white/56">
                {profile.romaji}
              </span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/78 sm:mt-7 sm:text-lg sm:leading-9">
              {profile.intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-white/68">
              <span className="inline-flex items-center gap-1.5 border border-white/18 bg-white/8 px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
                秋田出身
              </span>
              <span className="border border-white/18 bg-white/8 px-3 py-1.5">
                元公務員から舞台へ
              </span>
              <span className="border border-white/18 bg-white/8 px-3 py-1.5">
                #ゆかJET
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#schedule"
                  className="yukako-button yukako-button-primary min-h-12 px-5 py-3 text-sm shadow-paper"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  今日の予定を見る
                </a>
                {showroomLink && (
                  <ExternalButton href={showroomLink.url} variant="gold" className="px-5">
                    <span className="inline-flex items-center gap-2">
                      <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
                      SHOWROOMを開く
                    </span>
                  </ExternalButton>
                )}
                <a
                  href="#next"
                  className="yukako-button yukako-button-ghost min-h-12 px-4 py-3 text-sm shadow-sm"
                >
                  <Clapperboard className="h-4 w-4 text-champagne" aria-hidden="true" />
                  #ゆかJET / 舞台情報を見る
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
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/10 text-xs font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:border-champagne hover:bg-white/16"
                  >
                    {socialShortLabels[link.kind]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {profile.heroImage && (
          <div className="relative order-2 overflow-hidden bg-ink px-4 pb-8 sm:px-6 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:px-8 lg:py-8">
            <div className="yukako-photo-stage relative overflow-hidden border border-champagne/45 bg-white/8 p-2 shadow-paper lg:min-h-0 lg:flex-1">
            <img
              {...getResponsiveImageProps(
                profile.heroImage,
                "(min-width: 1024px) 50vw, 100vw",
              )}
              alt={profile.name}
              loading="eager"
              fetchPriority="high"
              className="block w-full object-cover object-[50%_18%] lg:absolute lg:inset-2 lg:h-[calc(100%-1rem)] lg:w-[calc(100%-1rem)]"
            />
            <p className="absolute bottom-5 left-5 z-10 border border-white/45 bg-ink/52 px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
              Voice / Stage / Produce
            </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
