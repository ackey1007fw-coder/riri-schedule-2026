import { Share2 } from "lucide-react";
import { news } from "../data/news";
import { profile } from "../data/profile";
import { SITE_URL, xShareUrl } from "../lib/share";
import type { SocialLink } from "../types";

type FooterProps = {
  socialLinks: SocialLink[];
  source?: "fallback" | "sheets";
  updatedAt?: string;
};

export function Footer({ socialLinks, source, updatedAt }: FooterProps) {
  const year = new Date().getFullYear();
  const displayUpdatedAt = updatedAt
    ? new Date(updatedAt).toLocaleString("ja-JP")
    : news[0]?.date ?? "—";

  return (
    <footer className="border-t border-rosefog/20 bg-ink px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-2xl">{profile.name}</p>
            <p className="mt-1 text-sm text-white/60">
              {profile.theme}｜非公式応援ポータル（ファン制作）
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
              本サイトは吉井優花子さんの活動予定、出演歴、SHOWROOM、SNSをまとめた非公式の応援サイトです。本人公式サイトではありません。
            </p>
            <p className="mt-4 text-xs text-white/45">
              掲載情報更新：{displayUpdatedAt}
              （データ: {source === "sheets" ? "Google Sheets" : "内蔵データ"}）
            </p>
          </div>

          <div className="sm:text-right">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-champagne">
              Follow &amp; Share
            </p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/18 px-3 py-2 text-xs font-bold text-white/75 transition hover:border-champagne hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={xShareUrl(
                  `心に届く声の俳優。${profile.name}さんの応援ポータル`,
                  SITE_URL,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-champagne bg-champagne/15 px-3 py-2 text-xs font-bold text-white transition hover:bg-champagne/25"
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                シェア
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.romaji} Fan Portal ・ Produced by あっきー</p>
          <p>
            本サイトはファンによる非公式の応援ページです。掲載情報は変更される場合があります。
          </p>
        </div>
      </div>
    </footer>
  );
}
