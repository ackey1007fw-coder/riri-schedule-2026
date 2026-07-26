import { Map, Navigation } from "lucide-react";
import { isMappableVenue, venueDirectionsUrl, venueSearchUrl } from "../lib/venueMap";

type VenueLinksProps = {
  venue?: string;
  className?: string;
};

/**
 * イベントカード用の軽量な地図リンク。
 * 一覧に地図を何枚も埋め込むと重くなるので、ここは Google マップを開くリンクだけにする。
 * 埋め込み地図が必要な場所では VenueMap を使う。
 */
export function VenueLinks({ venue, className = "" }: VenueLinksProps) {
  if (!isMappableVenue(venue)) return null;

  return (
    <span className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
      <a
        href={venueDirectionsUrl(venue)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-8 items-center gap-1 border border-champagne/50 bg-porcelain/70 px-2.5 py-1 text-xs font-bold text-champagneInk transition hover:bg-champagne/20"
      >
        <Navigation className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        現在地からのルート
      </a>
      <a
        href={venueSearchUrl(venue)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-8 items-center gap-1 border border-champagne/50 bg-porcelain/70 px-2.5 py-1 text-xs font-bold text-champagneInk transition hover:bg-champagne/20"
        aria-label={`${venue}を地図で見る`}
      >
        <Map className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        地図
      </a>
    </span>
  );
}
