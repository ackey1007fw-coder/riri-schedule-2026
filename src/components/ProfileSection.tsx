import { HeartHandshake, Star } from "lucide-react";
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
            copy="舞台への想い、プロデュース活動のこと。吉井優花子さんのプロフィールです。"
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
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
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
    </section>
  );
}
