import { HeartHandshake, MonitorPlay, Radio, Ticket, Video } from "lucide-react";
import { supportContent, supportUrl } from "../data/supportContent";
import { SectionHeader } from "./SectionHeader";

const icons = [HeartHandshake, Video, MonitorPlay, Ticket];

export function SupportersSection() {
  if (supportContent.length === 0) return null;

  return (
    <section id="support" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Support Menu"
          title="#ゆかJET を応援する"
          copy="『GO,JET!GO!GO! vol.1 Premium』では、会場でもオンラインでも参加できる応援メニューを用意しています。詳細・お申し込みは特設ページから。"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportContent.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <a
                key={item.title}
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yukako-card yukako-card-interactive yukako-lift flex min-h-44 flex-col gap-3 border-rosefog/25 bg-porcelain p-5 hover:border-champagne hover:bg-white"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/50 bg-white text-champagne">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-xl text-ink">
                  {item.title}
                </span>
                <span className="text-sm leading-6 text-ink/66">
                  {item.description}
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-ink/62">
          <Radio className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
          遠方の方も、配信チケット（3,700円・アーカイブ視聴あり）で公演をご覧いただけます。
        </p>
      </div>
    </section>
  );
}
