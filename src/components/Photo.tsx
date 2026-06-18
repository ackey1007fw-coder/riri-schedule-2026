import { useState } from "react";
import { getResponsiveImageProps } from "../lib/responsiveImage";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: "lazy" | "eager";
};

export function Photo({
  src,
  alt,
  className = "",
  imageClassName = "",
  loading = "lazy"
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(135deg,#fff4f8_0%,#ece8ff_46%,#fff7e5_100%)] ${className}`}
    >
      {!failed && (
        <img
          {...getResponsiveImageProps(src, "100vw")}
          alt={alt}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0">
          <div className="absolute left-6 top-6 h-24 w-24 border border-white/70 bg-white/20" />
          <div className="absolute bottom-8 right-8 h-32 w-20 border border-champagne/50 bg-white/20" />
          <div className="absolute inset-x-8 top-1/2 h-px bg-champagne/40" />
          <div className="absolute inset-y-8 left-1/2 w-px bg-white/70" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_32%),linear-gradient(180deg,transparent,rgba(49,42,46,0.08))]" />
    </div>
  );
}
