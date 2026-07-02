type ActHeaderProps = {
  act: number;
  eyebrow: string;
  title: string;
  copy?: string;
  tone?: "light" | "dark";
};

// 劇場プログラム（公演パンフレット）風のセクション見出し。
// 「ACT 01」等の演目番号 + Playfair Display の大見出し + 細い金罫線。
export function ActHeader({ act, eyebrow, title, copy, tone = "light" }: ActHeaderProps) {
  const isDark = tone === "dark";

  return (
    <div className="mb-10 max-w-3xl">
      <div className="mb-4 flex items-center gap-4">
        <span className="font-display text-sm tracking-[0.4em] text-champagne">
          ACT {String(act).padStart(2, "0")}
        </span>
        <span
          className={`h-px w-12 ${isDark ? "bg-champagne/55" : "bg-champagne/45"}`}
          aria-hidden="true"
        />
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.24em] ${
            isDark ? "text-white/55" : "text-ink/40"
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`font-display text-4xl leading-tight sm:text-5xl ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div
        className="mt-5 h-px w-24 bg-gradient-to-r from-champagne to-transparent"
        aria-hidden="true"
      />
      {copy && (
        <p className={`mt-5 leading-8 ${isDark ? "text-white/75" : "text-ink/70"}`}>
          {copy}
        </p>
      )}
    </div>
  );
}
