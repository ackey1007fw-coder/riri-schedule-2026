import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "outputs");
const outputPath = path.join(outputDir, "riri_schedule_2026_manager.xlsx");

const eventHeaders = [
  "event_id",
  "表示",
  "ステータス",
  "重要",
  "種別",
  "タイトル",
  "短縮名",
  "開始日時",
  "終了日時",
  "表示日",
  "会場",
  "説明",
  "バッジ",
  "画像パス",
  "チケットURL",
  "配信URL",
  "詳細URL",
  "SNS URL",
  "メモ",
  "最終更新"
];

const events = [
  [
    "yofukashi-campus-2026-05-09",
    true,
    "",
    false,
    "ラジオ",
    "みつきとななこの夜ふかしキャンパス vol.2 春の新学期わくわくSP",
    "夜ふかしキャンパス",
    "2026-05-09 17:00",
    "2026-05-09 19:45",
    "2026年5月9日（土）17:00から",
    "WALLOP押上スタジオ",
    "公開収録と特典会を予定。公開収録は17:00から18:00、特典会は18:15から19:45です。",
    "NEXT, ラジオ, 公開収録, 特典会",
    "/images/event-yofukashi-campus.jpg",
    "https://tiget.net/events/481711",
    "",
    "https://www.wallop.tv/",
    "https://x.com/Riri_Natsunagi",
    "",
    "2026-05-02"
  ],
  [
    "theoridea-2026-05-14",
    true,
    "",
    true,
    "舞台",
    "劇場公演『ギリシャ神話戦記テオリデア アトランティスの残響』",
    "テオリデア",
    "2026-05-14 18:30",
    "2026-05-17 20:30",
    "2026年5月14日（木）から5月17日（日）",
    "萬劇場（大塚）",
    "初挑戦の舞台出演。5月16日はSpecial Live公演、5月17日は千秋楽。現地チケットと配信チケットがあります。",
    "舞台, チケット発売中, 配信あり, 重要",
    "/images/event-theoridea.jpg",
    "https://www.quartet-online.net/ticket/sankyou2026?m=03hggeh",
    "https://twitcasting.tv/",
    "https://yorozu-s.com/",
    "https://x.com/Riri_Natsunagi",
    "",
    "2026-05-02"
  ],
  [
    "aitoki-2026-05-29",
    true,
    "",
    true,
    "舞台",
    "月シア別冊第一集『I'm talking about lovin'』",
    "月シア別冊",
    "2026-05-29 19:00",
    "2026-06-02 21:00",
    "2026年5月29日（金）から6月2日（火）",
    "西荻窪 遊空間がざびぃ",
    "音楽と演劇が合わさった公演。Asideとして出演予定。全8回公演、前売券は6,000円です。",
    "舞台, 先行販売中, 全8回, アイトキ",
    "/images/event-aitoki.jpg",
    "https://livepocket.jp/t/aitoki",
    "",
    "https://x.com/kaigyacstage",
    "https://x.com/Riri_Natsunagi",
    "",
    "2026-05-02"
  ],
  [
    "birthday-2026-06-24",
    true,
    "",
    false,
    "特別",
    "りりちゃんのお誕生日",
    "誕生日",
    "2026-06-24 00:00",
    "2026-06-24 23:59",
    "2026年6月24日（水）",
    "",
    "SNSやSHOWROOMでお祝いの気持ちを届けたい日。カウントダウンと一緒に準備できます。",
    "特別, Birthday",
    "/images/event-birthday.jpg",
    "",
    "https://www.showroom-live.com/room/profile?room_id=550336",
    "",
    "https://x.com/Riri_Natsunagi",
    "",
    "2026-05-02"
  ],
  [
    "fukurow-fm-2026-04-21",
    true,
    "",
    false,
    "ラジオ",
    "ふくろうFM『ステラ HAPPYStyle！ CatchTheHeart』公開収録＆チェキ会＆特典会",
    "ふくろうFM公開収録",
    "2026-04-21 18:00",
    "2026-04-21 21:00",
    "2026年4月21日（火）",
    "曙橋スタジオ",
    "公開収録、チェキ会、特典会に出演。アーカイブがある場合は遠方からもチェックできます。",
    "ラジオ, 公開収録, 特典会, アーカイブ",
    "/images/event-fukurow-fm.jpg",
    "",
    "",
    "https://fukurowfm.co.jp/",
    "https://x.com/Riri_Natsunagi",
    "",
    "2026-05-02"
  ],
  [
    "tvk-nekohita-2026-04-16",
    true,
    "",
    false,
    "テレビ",
    "テレビ神奈川『猫のひたいほどワイドNEO』お天気コーナー",
    "tvk猫ひた",
    "2026-04-16 12:00",
    "2026-04-16 13:30",
    "2026年4月16日（木）12:00から13:30",
    "",
    "SHOWROOMイベントの特典として生放送テレビ出演。お天気コーナーに登場しました。",
    "テレビ, 生放送, お天気",
    "/images/event-tvk.jpg",
    "",
    "",
    "https://www.tvk-yokohama.com/",
    "",
    "",
    "2026-05-02"
  ],
  [
    "imacampus-2026-04-12",
    true,
    "",
    false,
    "ラジオ",
    "MBSラジオ『イマドキッ キャンパスナイト』",
    "イマキャン",
    "2026-04-12 23:30",
    "2026-04-13 00:00",
    "2026年4月12日（日）23:30から24:00",
    "",
    "青学周辺のおすすめグルメなどを語ったラジオ出演回。声の魅力を楽しめる放送です。",
    "ラジオ, 放送済み, radiko",
    "/images/event-imacampus.jpg",
    "",
    "https://radiko.jp/",
    "",
    "",
    "",
    "2026-05-02"
  ],
  [
    "steenz-2026-04-08",
    true,
    "",
    false,
    "WEB",
    "steenz 取材記事公開『フレキャン』",
    "steenz記事公開",
    "2026-04-08 10:00",
    "2026-04-08 23:59",
    "2026年4月8日（水）",
    "",
    "コンテストでの受賞や、青山学院大学生としての素顔、役者を目指す想いが読めるインタビュー記事です。",
    "WEB, インタビュー, 公開中",
    "/images/event-steenz.jpg",
    "",
    "",
    "https://steenz.jp/",
    "",
    "",
    "2026-05-02"
  ],
  [
    "kyanly-2026-03-14",
    true,
    "",
    false,
    "イベント",
    "KYANLYファン感謝祭2026 運動会＆チェキ会",
    "KYANLY感謝祭",
    "2026-03-14 11:00",
    "2026-03-14 16:00",
    "2026年3月14日（土）11:00から16:00",
    "東京都立川市 屋外施設",
    "スポーツデーとチェキ撮影会に出演。ランウェイ姿はKYANLYの動画でもチェックできます。",
    "イベント, 運動会, チェキ会",
    "/images/event-kyanly.jpg",
    "",
    "https://www.youtube.com/@kyanly_ch",
    "",
    "",
    "",
    "2026-05-02"
  ]
];

const links = [
  ["表示", "ラベル", "種別", "ハンドル", "URL", "説明"],
  [true, "X", "SNS", "@Riri_Natsunagi", "https://x.com/Riri_Natsunagi", "出演告知と当日の更新をチェック"],
  [true, "Instagram", "SNS", "@__ririri__24", "https://www.instagram.com/__ririri__24", "写真と日常の投稿を見る"],
  [true, "TikTok", "SNS", "@ririchannel__", "https://www.tiktok.com/@ririchannel__", "短い動画で近況を追う"],
  [true, "SHOWROOM", "配信", "夏凪里季", "https://www.showroom-live.com/room/profile?room_id=550336", "ライブ配信で応援する"],
  [true, "Lit.Link", "まとめ", "ririchannel", "https://lit.link/ririchannel", "リンク一覧をまとめて見る"],
  [true, "note", "コンテンツ", "natsunagiriri", "https://note.com/natsunagiriri", "特典やコンテンツを確認"],
  [true, "FRECページ", "掲載", "Entry No.306", "https://2025.frecam.jp/entry/306", "フレッシュキャンパスコンテストの掲載情報"],
  [true, "KYANLY YouTube", "動画", "@kyanly_ch", "https://www.youtube.com/@kyanly_ch", "ランウェイ出演動画を探す"]
];

const profileRows = [
  ["項目", "内容"],
  ["サイト名", "Riri Schedule 2026"],
  ["表示名", "夏凪 里季"],
  ["よみ", "なつなぎ りり"],
  ["英字", "Natsunagi Riri"],
  ["表現", "応援スケジュール / Fan Schedule"],
  ["キャッチコピー", "透明感のある笑顔とまっすぐな表現力で、次の舞台へ。"],
  ["誕生日", "6月24日"],
  ["ファンネーム", "ナギイチサマー"],
  ["大学", "青山学院大学 2年生"],
  ["出身", "三重県生まれ、神奈川県育ち"],
  ["身長", "163cm"],
  ["夢", "世界中の人の心を動かす役者になること"],
  ["趣味", "数独、映画鑑賞、スポーツ、お菓子作り"],
  ["特技", "表情筋を動かすこと"]
];

const optionRows = [
  ["種別", "バッジ例", "画像パス例"],
  ["舞台", "NEXT, 舞台, チケット発売中, 重要", "/images/event-theoridea.jpg"],
  ["ラジオ", "ラジオ, 公開収録, 特典会", "/images/event-yofukashi-campus.jpg"],
  ["テレビ", "テレビ, 生放送, お天気", "/images/event-tvk.jpg"],
  ["イベント", "イベント, チェキ会", "/images/event-kyanly.jpg"],
  ["WEB", "WEB, インタビュー, 公開中", "/images/event-steenz.jpg"],
  ["特別", "特別, Birthday", "/images/event-birthday.jpg"]
];

const guideRows = [
  ["Riri Schedule 2026 管理シート"],
  ["スマホで予定を更新しやすいように、左から順に編集しやすい列を並べています。"],
  [""],
  ["基本の使い方"],
  ["1. 予定を追加するときは「予定管理」タブの一番下に行を追加します。"],
  ["2. 表示したい予定は「表示」をオン、目立たせたい予定は「重要」をオンにします。"],
  ["3. 種別は「舞台」「ラジオ」「テレビ」「イベント」「WEB」「特別」から選びます。"],
  ["4. チケットURL、配信URL、詳細URL、SNS URLは分かるものだけ入れれば大丈夫です。"],
  ["5. サイト側と連携すれば、このシートを更新するだけでFan Scheduleに反映できます。"],
  [""],
  ["注意"],
  ["このシートでは「公式」という表現は使わず、「応援スケジュール」「Fan Schedule」として管理します。"]
];

const dashboardRows = [
  ["Riri Schedule 2026 Dashboard", ""],
  ["項目", "値"],
  ["今後の表示予定数", ""],
  ["重要イベント数", ""],
  ["次の出演", ""],
  ["次の出演日時", ""],
  ["次のチケットURL", ""],
  ["", ""],
  ["管理メモ", "予定を足すときは「予定管理」タブだけ見ればOKです。"]
];

function writeRows(sheet, rows, startCell = "A1") {
  const width = Math.max(...rows.map((row) => row.length));
  const padded = rows.map((row) => [...row, ...Array(width - row.length).fill("")]);
  const startColumn = startCell.match(/[A-Z]+/)?.[0] ?? "A";
  const startRow = Number(startCell.match(/\d+/)?.[0] ?? 1);
  const startIndex = columnNameToIndex(startColumn);
  const endColumn = columnIndexToName(startIndex + width - 1);
  const endRow = startRow + rows.length - 1;
  sheet.getRange(`${startCell}:${endColumn}${endRow}`).values = padded;
}

function columnNameToIndex(name) {
  return name.split("").reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0);
}

function columnIndexToName(index) {
  let name = "";
  while (index > 0) {
    const remainder = (index - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    index = Math.floor((index - 1) / 26);
  }
  return name;
}

function addSheet(workbook, name, rows) {
  const sheet = workbook.worksheets.add(name);
  writeRows(sheet, rows);
  return sheet;
}

const workbook = Workbook.create();

addSheet(workbook, "使い方", guideRows);
addSheet(workbook, "ダッシュボード", dashboardRows);
addSheet(workbook, "予定管理", [eventHeaders, ...events]);
addSheet(workbook, "SNSリンク", links);
addSheet(workbook, "プロフィール", profileRows);
addSheet(workbook, "選択肢", optionRows);

await fs.mkdir(outputDir, { recursive: true });

const inspection = await workbook.inspect({
  kind: "table",
  range: "予定管理!A1:T10",
  include: "values",
  tableMaxRows: 10,
  tableMaxCols: 20
});
console.log(inspection.ndjson);

await workbook.render({ sheetName: "予定管理", range: "A1:T10", scale: 1 });
await workbook.render({ sheetName: "使い方", range: "A1:A12", scale: 1 });

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
