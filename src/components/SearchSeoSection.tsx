import { CalendarDays, Radio, Search, Sparkles } from "lucide-react";

const searchTopics = [
  {
    icon: CalendarDays,
    title: "出演情報",
    body: "夏凪里季さんの次の出演、舞台予定、イベント、チケット予約先を確認できます。"
  },
  {
    icon: Radio,
    title: "SHOWROOM",
    body: "SHOWROOM配信、ルーム情報、アバター、フォロー導線をまとめています。"
  },
  {
    icon: Sparkles,
    title: "フレキャン",
    body: "フレキャン2025 Entry No.306としての活動や関連リンクを見つけやすく整理しています。"
  }
];

export function SearchSeoSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8" aria-label="検索用サイト説明">
      <div className="mx-auto max-w-7xl border-y border-champagne/35 py-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase text-champagne">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search Guide
            </p>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              夏凪里季さんを応援するためのFan Schedule
            </h2>
            <p className="mt-5 leading-8 text-ink/70">
              このサイトは、夏凪里季さんの出演情報、舞台、フレキャン関連情報、
              SHOWROOM、SNSリンク、プロフィールを応援者目線で見やすくまとめた
              応援スケジュールです。次に見る予定、チケット予約、配信、SNS告知へ
              スマホからすぐ移動できるように整理しています。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {searchTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <div key={topic.title} className="border border-rosefog/25 bg-porcelain p-4">
                  <Icon className="mb-4 h-5 w-5 text-champagne" aria-hidden="true" />
                  <h3 className="text-sm font-bold text-ink">{topic.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/65">{topic.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
