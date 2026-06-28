import { ExternalLink, HeartHandshake, Star } from "lucide-react";
import { profile } from "../data/profile";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

export function ProfileSection() {
  return (
    <section id="profile" className="scroll-mt-24 bg-porcelain py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <SectionHeader
            kicker="Profile"
            title="プロフィール"
            copy="秋田出身。俳優・タレント・モデル・ライバーとして活動する吉井優花子さんのプロフィールです。"
          />
          <div className="riri-card border-champagne/40 bg-white p-5 shadow-paper">
            {profile.fanName && (
              <div className="mb-4 flex items-center gap-3">
                <Star className="h-5 w-5 text-champagne" aria-hidden="true" />
                <p className="text-sm font-bold text-ink/70">
                  ファンネーム：{profile.fanName} ／ ファンマーク {profile.fanMark}
                </p>
              </div>
            )}
            <p className="font-display text-4xl text-ink">{profile.name}</p>
            <p className="mt-2 text-lg text-ink/55">{profile.kana}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.aliases.map((alias) => (
                <span key={alias} className="border border-champagne/35 bg-porcelain px-3 py-1 text-xs font-black text-champagne">
                  {alias}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          {profile.portraitImage && (
            <div className="riri-card relative border-white bg-porcelain lg:min-h-[420px]">
              <img
                {...getResponsiveImageProps(
                  profile.portraitImage,
                  "(min-width: 1024px) 34vw, 100vw",
                )}
                alt={`${profile.name} portrait`}
                loading="lazy"
                className="block h-auto w-full object-contain lg:absolute lg:inset-0 lg:h-full lg:object-cover lg:object-top"
              />
            </div>
          )}
          <div className="grid gap-3">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="riri-card grid grid-cols-[88px_1fr] border-rosefog/20 bg-white">
                <div className="border-r border-rosefog/20 bg-porcelain px-4 py-4 text-xs font-bold text-champagne">
                  {fact.label}
                </div>
                <div className="px-4 py-4 text-sm font-semibold leading-7 text-ink/75">
                  {fact.value}
                </div>
              </div>
            ))}
            {profile.fanMark && (
              <div className="riri-card flex items-center gap-3 border-champagne/40 bg-white p-4 text-sm font-bold leading-7 text-ink/70">
                <HeartHandshake className="h-5 w-5 shrink-0 text-champagne" aria-hidden="true" />
                ファンマーク {profile.fanMark} をつけて、みんなで一緒に応援しよう。
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8">
        <div className="riri-card border-rosefog/25 bg-white p-5 shadow-paper sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">About</p>
          <div className="mt-4 grid gap-4 leading-8 text-ink/72">
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="border border-rosefog/35 bg-porcelain px-3 py-2 text-sm font-bold text-ink/70">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="riri-card border-rosefog/25 bg-porcelain p-5 shadow-paper sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">History</p>
          <div className="mt-5 grid gap-4">
            {profile.timeline.map((item) => (
              <div key={`${item.year}-${item.title}`} className="grid gap-2 border-b border-rosefog/35 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[5rem_1fr]">
                <p className="font-display text-2xl text-champagne">{item.year}</p>
                <div>
                  <p className="font-black text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-7 text-ink/66">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {profile.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-rosefog/35 bg-white px-3 py-2 text-sm font-bold text-ink transition hover:border-champagne"
              >
                {source.label}
                <ExternalLink className="h-4 w-4 text-champagne" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
