import { useEffect, useMemo, useState } from "react";
import { Radio, Sparkles } from "lucide-react";
import { profile } from "../data/profile";
import { ExternalButton } from "./ExternalButton";
import { SectionHeader } from "./SectionHeader";
import { AvatarGallery } from "./AvatarGallery";
import { StreamSchedule } from "./StreamSchedule";

type ShowroomApiData = {
  streakDays?: string;
  followerCount?: string;
  roomLevel?: string;
  showRank?: string;
  nextShow?: string;
  coverImage?: string;
  isLive?: boolean;
  updatedAt?: string;
};

const proxyImage = (url: string) =>
  `/api/showroom-image?url=${encodeURIComponent(url)}`;

const fallbackValue = (label: string) =>
  profile.showroom.stats.find((stat) => stat.label === label)?.value ?? "-";

export function ShowroomSection() {
  const [showroomData, setShowroomData] = useState<ShowroomApiData | null>(null);
  const [coverFailed, setCoverFailed] = useState(false);

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

  // SHOWROOMの現在のカバー画像に連動。取得失敗時は既定画像にフォールバック
  const coverSrc =
    !coverFailed && showroomData?.coverImage
      ? proxyImage(showroomData.coverImage)
      : profile.showroom.image;

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
        <SectionHeader kicker="SHOWROOM" title="ライブ配信で応援する" copy="秋田の優花子として配信中のSHOWROOM。ルームの現在値を取得できる範囲で表示します。" />
        <div className="riri-card mb-12 grid overflow-hidden border-rosefog/25 bg-porcelain lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative bg-porcelain lg:min-h-[480px]">
            <img
              src={coverSrc}
              alt="吉井優花子さん SHOWROOM"
              loading="eager"
              onError={() => setCoverFailed(true)}
              className="block w-full object-cover lg:absolute lg:inset-0 lg:h-full"
            />
            {showroomData?.isLive && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/30 bg-[#e0245e] px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-paper">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden="true" />
                Live 配信中
              </span>
            )}
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center gap-3 text-champagne">
              <span className="grid h-11 w-11 place-items-center border border-champagne/50 bg-white"><Radio className="h-5 w-5" aria-hidden="true" /></span>
              <div><p className="text-xs font-bold uppercase">Room</p><h3 className="font-display text-3xl text-ink">{profile.showroom.roomName}</h3></div>
            </div>
            <p className="text-sm font-bold text-ink/55">{profile.showroom.tagline}</p>
            <p className="mt-4 text-lg leading-9 text-ink/72">{profile.showroom.message}</p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat) => <div key={stat.label} className="riri-card border-white bg-white p-4"><p className="font-display text-2xl text-ink sm:text-3xl">{stat.value}</p><p className="mt-2 text-xs font-bold text-ink/55">{stat.label}</p></div>)}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalButton href={profile.showroom.url} variant="primary">SHOWROOMを開く</ExternalButton>
              <ExternalButton href={profile.showroom.liveUrl} variant="light">配信ルームへ</ExternalButton>
              <a href="#links" className="inline-flex min-h-12 items-center justify-center gap-2 border border-rosefog/40 bg-white px-4 py-3 text-sm font-bold text-ink transition hover:bg-porcelain"><Sparkles className="h-4 w-4" aria-hidden="true" />SNSも見る</a>
            </div>
          </div>
        </div>
        <StreamSchedule />
        <AvatarGallery />
      </div>
    </section>
  );
}
