// 配信予定（手入力。フレキャン掲載ページと同じく「登録した予定を並べる」方式）
// ・SHOWROOM等で配信予定が決まったら、ここに追記/編集するだけで反映されます。
// ・過去になった予定は自動で非表示になります（開始から約3時間で消えます）。
// ・日付はJST。time は24時間表記。
export type StreamSlot = {
  date: string; // "2026-06-17"（JSTの日付）
  time: string; // "21:30"
  note?: string; // 任意（例:「特別配信」）
};

export const streamSchedule: StreamSlot[] = [
  { date: "2026-06-17", time: "21:30" },
  { date: "2026-06-18", time: "22:45" },
  { date: "2026-06-19", time: "21:30" },
  { date: "2026-06-23", time: "23:30", note: "20歳 誕生日またぎ 乾杯ライブ🥂" }
];

// 特別配信（誕生日またぎ など、いつもより特別な配信）。
// ・該当日のあいだ＋配信が終わる頃まで、専用の華やかなバナーを最上部に表示します。
// ・不要になったら null にすると非表示になります。
export type SpecialStream = {
  date: string; // JSTの日付 "2026-06-23"
  time: string; // 開始時刻 "23:30"
  title: string; // バナー見出し
  note: string; // ひとことメッセージ
};

export const specialStream: SpecialStream | null = {
  date: "2026-06-23",
  time: "23:30",
  title: "20歳 誕生日またぎ 乾杯ライブ",
  note: "みんなで飲み物を用意して、ハタチの瞬間をいっしょにお祝い🥂🎂"
};
