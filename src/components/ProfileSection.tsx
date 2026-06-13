import { HeartHandshake, Star } from "lucide-react";
import { profile } from "../data/profile";
import { SectionHeader } from "./SectionHeader";

export function ProfileSection() {
  return (
    <section id="profile" className="bg-porcelain py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <SectionHeader
            kicker="Profile"
            title="プロフィール"
            copy="初めて見る人にも、いつも応援している人にも分かりやすく。活動の軸と人柄が伝わる情報を整理しています。"
          />
          <div className="border border-champagne/40 bg-white p-5 shadow-paper">
            <div className="mb-4 flex items-center gap-3">
              <Star className="h-5 w-5 text-champagne" aria-hidden="true" />
              <p className="text-sm font-bold text-ink/70">
                ファンネーム：{profile.fanName}
              </p>
            </div>
            <p className="font-display text-4xl text-ink">{profile.name}</p>
            <p className="mt-2 text-lg text-ink/55">{profile.kana}</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative border border-white bg-porcelain shadow-sm lg:min-h-[420px]">
            <img
              src={profile.portraitImage}
              alt={`${profile.name} portrait`}
              loading="lazy"
              className="block w-full object-cover object-top lg:absolute lg:inset-0 lg:h-full"
            />
          </div>
          <div className="grid gap-3">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[88px_1fr] border border-rosefog/20 bg-white">
                <div className="border-r border-rosefog/20 bg-porcelain px-4 py-4 text-xs font-bold text-champagne">
                  {fact.label}
                </div>
                <div className="px-4 py-4 text-sm font-semibold leading-7 text-ink/75">
                  {fact.value}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 border border-champagne/40 bg-white p-4 text-sm font-bold leading-7 text-ink/70">
              <HeartHandshake className="h-5 w-5 shrink-0 text-champagne" aria-hidden="true" />
              応援の入口は、次の出演、配信、SNSの3つを分かりやすく配置しています。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
