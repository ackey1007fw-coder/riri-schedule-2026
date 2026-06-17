import { ArrowUpRight, MessageCircleHeart } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

// 推薦コメントの掲載先（フレキャン2025 エントリーページ）
const RECOMMEND_URL = "https://2025.frecam.jp/entry/306";

export function SupportersSection() {
  return (
    <section className="bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Messages"
          title="推薦コメント"
          copy="フレキャン2025で里季ちゃんに寄せられた、応援・推薦コメント。たくさんの「好き」が集まっています。"
        />
        <a
          href={RECOMMEND_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 border border-champagne/40 bg-white p-5 transition hover:-translate-y-1 hover:border-champagne hover:shadow-paper sm:p-6"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne">
            <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 font-display text-2xl text-ink">
              フレキャンページで読む
              <ArrowUpRight className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
            </span>
            <span className="mt-1 block text-sm leading-7 text-ink/65">
              FRESH CAMPUS CONTEST 2025・Entry No.306 のページで推薦コメントを見られます。
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
