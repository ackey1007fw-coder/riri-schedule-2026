import { ArrowUpRight, BookOpenText } from "lucide-react";
import { interviewLinks } from "../data/links";
import { SectionHeader } from "./SectionHeader";

export function InterviewSection() {
  return (
    <section className="bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="Interview" title="インタビュー記事" copy="役者を目指す思いや、これまでの挑戦を知ることができる掲載記事です。" />
        <div className="grid gap-3 md:grid-cols-2">
          {interviewLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="yukako-card yukako-lift group flex min-h-44 items-start gap-4 border-champagne/40 bg-white p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center border border-champagne/50 bg-porcelain text-champagne"><BookOpenText className="h-5 w-5" aria-hidden="true" /></span>
              <span>
                <span className="flex items-center gap-2 font-display text-2xl text-ink">{link.label}<ArrowUpRight className="h-4 w-4 text-champagne" aria-hidden="true" /></span>
                <span className="mt-1 block text-sm font-bold text-champagne">{link.handle}</span>
                <span className="mt-3 block text-sm leading-7 text-ink/65">{link.description}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
