import { useEffect, useMemo, useState } from "react";
import { CalendarClock, Radio } from "lucide-react";
import { profile } from "../data/profile";
import { streamSchedule, type StreamSlot } from "../data/streamSchedule";

// ページ最上部のステータスバー。
// ・配信中 → 赤「配信中！」
// ・今日に配信予定あり → ピンク「今日の配信は HH:MM〜 予定」
// ・どちらも無ければ非表示
// すべて自動（/api/showroom を定期確認、予定は手入力＋フレキャン自動取得をマージ）。
const POLL_MS = 60000;

const todayKey = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());

// SHOWROOMの次回配信(nextShow: 例 "6/24(水) 21:30〜")が「今日」なら HH:MM を返す
const todayTimeFromNextShow = (nextShow?: string): string | null => {
  if (!nextShow) return null;
  const m = nextShow.match(/(\d{1,2})\/(\d{1,2}).*?(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    month: "numeric",
    day: "numeric"
  })
    .formatToParts(new Date())
    .reduce<Record<string, string>>((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});
  if (Number(m[1]) === Number(parts.month) && Number(m[2]) === Number(parts.day)) {
    return `${m[3].padStart(2, "0")}:${m[4]}`;
  }
  return null;
};

export function LiveBanner() {
  const [isLive, setIsLive] = useState(false);
  const [nextShow, setNextShow] = useState<string | undefined>(undefined);
  const [autoSlots, setAutoSlots] = useState<StreamSlot[]>([]);

  useEffect(() => {
    let active = true;

    const checkLive = () => {
      fetch("/api/showroom")
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { isLive?: boolean; nextShow?: string } | null) => {
          if (active && data) {
            setIsLive(Boolean(data.isLive));
            setNextShow(data.nextShow ?? undefined);
          }
        })
        .catch(() => {});
    };

    checkLive();
    const timer = window.setInterval(checkLive, POLL_MS);

    fetch("/api/frecam-schedule")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { slots?: StreamSlot[] } | null) => {
        if (active && Array.isArray(data?.slots)) setAutoSlots(data.slots);
      })
      .catch(() => {});

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  // 今日の、まだ終わっていない最も早い配信予定（手入力＋フレキャン自動取得）
  const todayStream = useMemo(() => {
    const today = todayKey();
    const now = Date.now();
    const map = new Map<string, StreamSlot>();
    [...streamSchedule, ...autoSlots].forEach((slot) => {
      const key = `${slot.date}T${slot.time}`;
      if (!map.has(key)) map.set(key, slot);
    });
    return [...map.values()]
      .filter((slot) => slot.date === today)
      .map((slot) => ({
        ...slot,
        ms: new Date(`${slot.date}T${slot.time}:00+09:00`).getTime()
      }))
      .filter((slot) => slot.ms + 3 * 3600 * 1000 > now)
      .sort((a, b) => a.ms - b.ms)[0];
  }, [autoSlots]);

  // 表示する「今日の配信時刻」：手入力/フレキャン → 無ければ SHOWROOMの次回配信
  const todayTime = todayStream?.time ?? todayTimeFromNextShow(nextShow);
  const todayNote = todayStream?.note;

  if (isLive) {
    return (
      <a
        href={profile.showroom.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-[#e0245e] text-white transition hover:bg-[#c81f52]"
        aria-label="SHOWROOMで配信中。いますぐ見る"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-sm font-black tracking-wide sm:px-6 lg:px-8">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
          <Radio className="h-4 w-4" aria-hidden="true" />
          ただいまSHOWROOMで配信中！
          <span className="underline underline-offset-4">いますぐ見る →</span>
        </div>
      </a>
    );
  }

  if (todayTime) {
    return (
      <a
        href={profile.showroom.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block border-b border-champagne/30 bg-[#fdeef4] text-ink transition hover:bg-[#fbe3ee]"
        aria-label={`今日の配信予定は${todayTime}から。SHOWROOMをフォロー`}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-sm font-bold sm:px-6 lg:px-8">
          <CalendarClock className="h-4 w-4 text-champagne" aria-hidden="true" />
          <span className="text-champagne">今日の配信</span>
          <span className="font-black">{todayTime}〜 予定</span>
          {todayNote && <span className="text-ink/60">（{todayNote}）</span>}
          <span className="text-ink/70 underline underline-offset-4">
            SHOWROOMをフォロー →
          </span>
        </div>
      </a>
    );
  }

  return null;
}
