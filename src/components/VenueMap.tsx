import { ExternalLink, MapPin, Navigation, Train } from "lucide-react";
import { venueDirectionsUrl, venueEmbedUrl, venueSearchUrl } from "../lib/venueMap";

type VenueMapProps = {
  /** 会場名。そのまま地図の検索キーワードにも使う */
  venue: string;
  /** 最寄駅・徒歩分数など（本人・主催の公開情報の範囲で書く） */
  access?: string;
  /** 見出しの下に添える一言 */
  note?: string;
  /** 同じページ内からリンクしたいときのアンカー */
  id?: string;
  className?: string;
};

/**
 * 会場アクセス用の地図カード。
 * Google マップのキーレス埋め込み（output=embed）を使うので API キーは不要。
 * 「現在地からのルート」は origin を省略して Google マップ側に現在地を使わせる。
 */
export function VenueMap({ venue, access, note, id, className = "" }: VenueMapProps) {
  return (
    <div
      id={id}
      className={`riri-card scroll-mt-24 border-[#7c5a3a]/25 bg-white p-5 sm:p-7 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#7c5a3a]/20 pb-3">
        <h3 className="flex items-center gap-2 font-display text-xl leading-tight text-ink">
          <MapPin className="h-5 w-5 shrink-0 text-[#6f2f3c]" aria-hidden="true" />
          会場アクセス
        </h3>
        <p className="text-xs font-bold text-[#6f2f3c]">{venue}</p>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
        <div className="overflow-hidden border border-[#7c5a3a]/25 bg-[#f0ead9]">
          <iframe
            src={venueEmbedUrl(venue)}
            title={`${venue}の地図`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 sm:aspect-[16/9]"
          />
        </div>

        <div>
          {access && (
            <p className="flex items-start gap-2 text-sm leading-7 text-ink/80">
              <Train className="mt-1 h-4 w-4 shrink-0 text-[#6f2f3c]" aria-hidden="true" />
              <span>{access}</span>
            </p>
          )}

          <div className={`grid gap-2 ${access ? "mt-4" : ""}`}>
            <a
              href={venueDirectionsUrl(venue)}
              target="_blank"
              rel="noopener noreferrer"
              className="riri-button riri-button-gold min-h-12 px-4 py-3 text-sm"
            >
              <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
              現在地からのルートを見る
            </a>
            <a
              href={venueSearchUrl(venue)}
              target="_blank"
              rel="noopener noreferrer"
              className="riri-button riri-button-soft min-h-12 px-4 py-3 text-sm"
            >
              Googleマップで開く
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-3 text-xs leading-6 text-ink/50">
            {note ? `${note} ` : ""}
            「現在地からのルート」はGoogleマップが開き、今いる場所からの経路と所要時間が表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}
