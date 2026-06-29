import { ExternalLink, Mail } from "lucide-react";

const fanLetterForm = "https://docs.google.com/forms/d/e/1FAIpQLSdVD6VDs_Es3wNqxbgTgXHAApnSFuHaziL5vv86fzUJS1pmEw/viewform";

export function FanLetterSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-y border-champagne/35 py-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-champagne">Fan Letter</p>
            <h2 className="font-display text-3xl text-ink">ファンレターを届ける</h2>
            <p className="mt-4 leading-8 text-ink/68">送付前に必須フォームを入力してから、宛先をご確認ください。</p>
          </div>
          <div className="border border-rosefog/25 bg-porcelain p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-ink"><Mail className="h-4 w-4 text-champagne" aria-hidden="true" />送付先</p>
            <p className="mt-3 text-sm leading-7 text-ink/70">〒153-0042 東京都目黒区青葉台3-13-11-3F<br />株式会社エイジ・エンタテインメント 夏凪里季宛</p>
            <a href={fanLetterForm} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-champagne">必須フォームを開く<ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
