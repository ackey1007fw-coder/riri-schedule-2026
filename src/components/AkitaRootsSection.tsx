type RootItem = {
  emoji: string;
  title: string;
  copy: string;
};

// 確認済みの事実のみ掲載（未確認の秋田エピソードは書かない）。
const roots: RootItem[] = [
  {
    emoji: "🌾",
    title: "秋田から、上京",
    copy: "秋田県秋田市出身。秋田で公務員として働きながら、2021年にミス浴衣コンテストで準グランプリを受賞。これをきっかけに上京し、俳優の道へ。"
  },
  {
    emoji: "📺",
    title: "AKT秋田テレビ",
    copy: "「東京こまち」コーナーに出演し、東京の話題を秋田へ届けたほか、2024年にはAKTアプリアンバサダーを務めました。"
  },
  {
    emoji: "👹",
    title: "SHOWROOM",
    copy: "ルーム名は「秋田の優花子(ゆかこ)」。上京した今も、秋田の名前を背負って配信を続けています。"
  }
];

export function AkitaRootsSection() {
  return (
    <section
      id="akita-roots"
      className="scroll-mt-24 border-t border-champagne/20 bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            🌾
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-champagne">
              Akita Roots
            </p>
            <h2 className="font-display text-3xl text-ink">秋田との絆</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {roots.map((item) => (
            <div key={item.title} className="yukako-card border-rosefog/20 bg-porcelain p-5">
              <span className="text-xl" aria-hidden="true">
                {item.emoji}
              </span>
              <h4 className="mt-3 font-display text-xl leading-tight text-ink">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-ink/68">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
