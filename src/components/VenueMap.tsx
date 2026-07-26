import { Building2, ExternalLink, MapPin, Navigation, Train } from "lucide-react";
import { getVenueInfo } from "../data/venues";
import { venueDirectionsUrl, venueEmbedUrl, venueSearchUrl } from "../lib/venueMap";

type VenueMapProps = {
  /** 会場名。src/data/venues.ts のキーと一致すれば住所・アクセスを自動で拾う */
  venue: string;
  /** venues.ts の access を上書きしたいときだけ指定 */
  access?: string;
  /** 見出しの下に添える一言 */
  note?: string;
  /** 同じページ内からリンクしたいときのアンカー */
  id?: string;
  className?: string;
};

/**
 * 会場アクセスの地図カード。
 * Google マップのキーレス埋め込み（output=embed）なので API キーは不要。
 * 「会場の地図を開く」「現在地からのルート」はスマホだとマップアプリが開く。
 */
export function VenueMap({ venue, access, note, id, className = "" }: VenueMapProps) {
  const info = getVenueInfo(venue);
  const accessText = access ?? info?.access;

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
          <dl className="grid gap-3 text-sm">
            {info?.address && (
              <div className="flex items-start gap-2">
                <dt className="mt-1 shrink-0">
                  <Building2 className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                  <span className="sr-only">住所</span>
                </dt>
                <dd className="leading-7 text-ink/80">{info.address}</dd>
              </div>
            )}
            {accessText && (
              <div className="flex items-start gap-2">
                <dt className="mt-1 shrink-0">
                  <Train className="h-4 w-4 text-[#6f2f3c]" aria-hidden="true" />
                  <span className="sr-only">アクセス</span>
                </dt>
                <dd className="leading-7 text-ink/80">{accessText}</dd>
              </div>
            )}
          </dl>

          <div className="mt-4 grid gap-2">
            <a
              href={venueSearchUrl(venue)}
              target="_blank"
              rel="noopener noreferrer"
              className="riri-button riri-button-gold min-h-12 px-4 py-3 text-sm"
            >
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              会場の地図を開く
            </a>
            <a
              href={venueDirectionsUrl(venue)}
              target="_blank"
              rel="noopener noreferrer"
              className="riri-button riri-button-soft min-h-12 px-4 py-3 text-sm"
            >
              <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
              現在地からのルートを見る
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-3 text-xs leading-6 text-ink/50">
            {note}
            {info?.source && `（出典：${info.source}）`}
          </p>
        </div>
      </div>
    </div>
  );
}
