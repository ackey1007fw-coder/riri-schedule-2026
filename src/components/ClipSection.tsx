import { useEffect, useRef, useState } from "react";
import { Music2, Play } from "lucide-react";
import { clips, type VideoClip } from "../data/clips";

// ショート動画クリップ（TikTokなど）をミュート自動ループで表示するセクション。
// ・音声は流さない（muted・コントロール非表示）。タップで元のTikTokへ。
// ・画面に入ったときだけ再生し、外れたら一時停止（通信量・電池に配慮）。
// ・動きを抑える設定(prefers-reduced-motion)の人には自動再生しない。
function ClipCard({ clip }: { clip: VideoClip }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <figure className="riri-card mx-auto w-full max-w-[320px] overflow-hidden p-0">
      <a
        href={clip.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[9/16] bg-ink/5"
        aria-label={`TikTok「${clip.title}」を見る`}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={clip.src}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={!reduceMotion}
          controls={reduceMotion}
          disablePictureInPicture
        />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[11px] font-black text-white backdrop-blur-sm">
          {clip.platform ?? "TikTok"}
        </span>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/85 text-ink shadow-lg">
            <Play className="h-5 w-5 translate-x-0.5" aria-hidden="true" />
          </span>
        </span>
        {clip.bgm && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-6 text-[11px] font-bold text-white">
            <Music2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="truncate">{clip.bgm}</span>
          </span>
        )}
      </a>
      <figcaption className="space-y-1 px-4 py-3 text-center">
        <p className="font-display text-lg text-ink">{clip.title}</p>
        <p className="text-xs text-ink/65">{clip.caption}</p>
        <a
          href={clip.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-champagne underline underline-offset-4"
        >
          {clip.date}・{clip.platform ?? "TikTok"}で見る →
        </a>
      </figcaption>
    </figure>
  );
}

export function ClipSection() {
  if (clips.length === 0) return null;

  return (
    <section id="clips" className="bg-porcelain px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">
            Short Movie
          </p>
          <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
            動く優花子さん
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            ショート動画。音声はオフで流しているので、本編はタップして元の投稿でどうぞ。
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((clip) => (
            <ClipCard key={clip.src} clip={clip} />
          ))}
        </div>
      </div>
    </section>
  );
}
