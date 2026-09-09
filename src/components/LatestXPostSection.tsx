import { useEffect } from "react";
import { ExternalLink, Newspaper } from "lucide-react";
import { news } from "../data/news";

const X_WIDGET_SCRIPT_ID = "x-widgets-js";
const KINDai_MAHJONG_POST_URL =
  "https://x.com/frecam2025_0306/status/2097456673581584515";
const kindaiMahjongPost = news.find(
  (item) => item.url === KINDai_MAHJONG_POST_URL,
);

export function LatestXPostSection() {
  useEffect(() => {
    if (document.getElementById(X_WIDGET_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = X_WIDGET_SCRIPT_ID;
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.setAttribute("charset", "utf-8");
    document.body.appendChild(script);
  }, []);

  if (!kindaiMahjongPost) return null;

  return (
    <section
      id="latest-x-post"
      aria-labelledby="latest-x-post-title"
      className="bg-porcelain py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-8">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-champagneInk">
            <Newspaper className="h-4 w-4" aria-hidden="true" />
            Latest X ・ {kindaiMahjongPost.date}
          </p>
          <h2
            id="latest-x-post-title"
            className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl"
          >
            『近代麻雀』掲載のお知らせ
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-ink/70">
            9月6日発売の『近代麻雀』に掲載されたことを、里季さん本人がXでお知らせ。撮影時のオフショットも公開されています。
          </p>
          <a
            href={kindaiMahjongPost.url}
            target="_blank"
            rel="noopener noreferrer"
            className="riri-button riri-button-gold mt-6 min-h-12 px-5 py-3 text-sm"
          >
            Xで元の投稿を見る
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="riri-card overflow-hidden border-rosefog/30 bg-white p-3 sm:p-5">
          <blockquote className="twitter-tweet" data-dnt="true" data-theme="light">
            <a href={kindaiMahjongPost.url}>{kindaiMahjongPost.text}</a>
          </blockquote>
          <noscript>
            <a
              href={kindaiMahjongPost.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-4 text-sm font-bold text-champagneInk underline"
            >
              Xで投稿と写真を見る
            </a>
          </noscript>
        </div>
      </div>
    </section>
  );
}
