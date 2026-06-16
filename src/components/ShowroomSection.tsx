import { useEffect, useMemo, useState } from "react";
import { Radio, Sparkles } from "lucide-react";
import { profile } from "../data/profile";
import { ExternalButton } from "./ExternalButton";
import { SectionHeader } from "./SectionHeader";
import { AvatarGallery } from "./AvatarGallery";

type ShowroomApiData = {
  streakDays?: string;
  followerCount?: string;
  roomLevel?: string;
  showRank?: string;
  nextShow?: string;
  updatedAt?: string;
};

const fallbackValue = (label: string) =>
  profile.showroom.stats.find((stat) => stat.label === label)?.value ?? "-";

export function ShowroomSection() {
  const [showroomData, setShowroomData] = useState<ShowroomApiData | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/showroom")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: ShowroomApiData | null) => {
        if (active && data) setShowroomData(data);
      })
      .catch(() => {
        if (active) setShowroomData(null);
      });
    return () => { active = false; };
  }, []);

  const stats = useMemo(
    () => [
      { label: "まいにち配信", value: showroomData?.streakDays ? `${showroomData.streakDays}日目` : fallbackValue("まいにち配信") },
      { label: "次回配信", value: showroomData?.nextShow || fallbackValue("次回配信") },
      { label: "フォロワー", value: showroomData?.followerCount || fallbackValue("フォロワー") },
      { label: "ルームLv", value: showroomData?.roomLevel || fallbackValue("ルームLv") },
      { label: "SHOWランク", value: showroomData?.showRank || fallbackValue("SHOWランク") }
    ],
    [showroomData]
  );

  return (
    <section id="showroom" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="SHOWROOM" title="ライブ配信で応援する" copy="毎日の配信で会えるSHOWROOM。ルームの最新情報やアバターはこちらから。" />
        <div className="mb-12 grid overflow-hidden border border-rosefog/25 bg-porcelain lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative bg-porcelain lg:min-h-[480px]">
            <img
              src={profile.showroom.image}
              alt="夏凪里季 SHOWROOM"
              loading="eager"
              className="block w-full object-cover lg:absolute lg:inset-0 lg:h-full"
            />
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center gap-3 text-champagne">
              <span className="grid h-11 w-11 place-items-center border border-champagne/50 bg-white"><Radio className="h-5 w-5" aria-hidden="true" /></span>
              <div><p className="text-xs font-bold uppercase">Room</p><h3 className="font-display text-3xl text-ink">{profile.showroom.roomName}</h3></div>
            </div>
            <p className="text-sm font-bold text-ink/55">{profile.showroom.tagline}</p>
            <p className="mt-4 text-lg leading-9 text-ink/72">{profile.showroom.message}</p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat) => <div key={stat.label} className="border border-white bg-white p-4"><p className="font-display text-2xl text-ink sm:text-3xl">{stat.value}</p><p className="mt-2 text-xs font-bold text-ink/55">{stat.label}</p></div>)}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalButton href={profile.showroom.url} variant="primary">SHOWROOMを開く</ExternalButton>
              <a href="#links" className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-white px-4 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"><Sparkles className="h-4 w-4" aria-hidden="true" />SNSも見る</a>
            </div>
          </div>
        </div>
        <AvatarGallery />
      </div>
    </section>
  );
}
