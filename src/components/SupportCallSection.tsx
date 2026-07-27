import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  Heart,
  Instagram,
  MessageCircle,
  Play,
  Quote,
  Repeat2,
  Timer
} from "lucide-react";
import { supportCall } from "../data/supportCall";

const formatRemaining = (ms: number) => {
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `あと${h}時間${m}分`;
  if (m > 0) return `あと${m}分`;
  return "まもなく締切";
};

const actions = [
  { Icon: Play, label: "再生", note: "5回でも嬉しい" },
  { Icon: Heart, label: "いいね", note: "" },
  { Icon: MessageCircle, label: "コメント", note: "「りりの拡散から来ました！」でもOK" },
  { Icon: Repeat2, label: "再投稿・保存", note: "" }
];

/**
 * 里季さんからの期限つきの応援呼びかけ。
 * 締切（JST）を過ぎたら自動的に消える。呼びかけが無いときは supportCall を null にする。
 */
export function SupportCallSection() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  if (!supportCall) return null;

  const deadlineMs = new Date(supportCall.deadline).getTime();
  if (now > deadlineMs) return null;

  const remaining = formatRemaining(deadlineMs - now);

  return (
    <section
      id="support-call"
      className="scroll-mt-24 border-y border-[#d4708f]/30 bg-[#fdf1f4] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="riri-card overflow-hidden border-[#d4708f]/35 bg-white shadow-paper">
          <div className="h-1.5 bg-[linear-gradient(90deg,#d4708f_0%,#f0a8bc_50%,#c9a24b_100%)]" />

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            {/* リール埋め込み */}
            <div className="border-b border-[#d4708f]/20 bg-[#fdf1f4] p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="mx-auto w-full max-w-[400px] overflow-hidden border border-[#d4708f]/25 bg-white">
                <iframe
                  src={supportCall.reelEmbedUrl}
                  title={`${supportCall.account}のリール動画`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                  className="block h-[640px] w-full border-0"
                />
              </div>
              <p className="mt-3 text-center text-xs leading-6 text-ink/55">
                動画が表示されないときは下のボタンからInstagramで開いてください。
              </p>
            </div>

            {/* 呼びかけ内容 */}
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#c2185b] px-2.5 py-1 text-xs font-bold text-white">
                  <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                  里季さんからのお願い
                </span>
                <span className="inline-flex items-center gap-1.5 border border-[#c2185b]/40 bg-[#fdf1f4] px-2.5 py-1 text-xs font-bold text-[#c2185b]">
                  <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                  {supportCall.deadlineLabel}・{remaining}
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
                里季さんのお友達を、いっしょに応援しませんか
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink/70">
                里季さんの高校からのお友達（
                <a
                  href={supportCall.accountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#c2185b] underline decoration-[#d4708f] underline-offset-2"
                >
                  {supportCall.account}
                </a>
                ）がダンスの大会に出場中。投稿がどれだけ伸びるかが結果に関わるそうで、里季さんご本人がファンに拡散を呼びかけています。現在
                <span className="font-bold text-[#c2185b]">{supportCall.standing}</span>
                、あと少し伸びれば1位を狙えるとのことです。
              </p>

              <blockquote className="mt-5 border border-[#d4708f]/35 bg-[#fdf1f4] p-5">
                <Quote className="h-5 w-5 text-[#c2185b]" aria-hidden="true" />
                <p className="mt-2 whitespace-pre-line text-sm leading-8 text-ink/85">
                  {supportCall.message}
                </p>
                <footer className="mt-3 text-xs text-ink/50">
                  夏凪里季さん・{supportCall.askedAt}（ファンルーム「ナギイチサマーの集い」より）
                </footer>
              </blockquote>

              {/* できること */}
              <div className="mt-5">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#c2185b]">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  できること
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {actions.map(({ Icon, label, note }) => (
                    <li
                      key={label}
                      className="flex items-start gap-2 border border-[#d4708f]/25 bg-white px-3 py-2 text-sm"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#c2185b]" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="font-bold text-ink">{label}</span>
                        {note && (
                          <span className="mt-0.5 block text-xs leading-5 text-ink/55">{note}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <a
                  href={supportCall.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="riri-button riri-button-rose min-h-12 px-4 py-3 text-sm"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Instagramで動画を見る
                </a>
                <a
                  href={supportCall.accountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="riri-button riri-button-soft min-h-12 px-4 py-3 text-sm"
                >
                  {supportCall.account}のプロフィール
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>

              <p className="mt-3 text-xs leading-6 text-ink/50">
                大会名は「{supportCall.contest}」。締切を過ぎるとこのお知らせは自動的に消えます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
