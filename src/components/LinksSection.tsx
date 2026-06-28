import { Link2, MessageCircle, Video } from "lucide-react";
import type { SocialLink } from "../types";
import { SectionHeader } from "./SectionHeader";

type LinksSectionProps = {
  socialLinks: SocialLink[];
  mediaLinks: SocialLink[];
};

export function LinksSection({ socialLinks, mediaLinks }: LinksSectionProps) {
  return (
    <section id="links" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Links"
          title="SNS・メディアリンク"
          copy="X、Instagram、TikTok、SHOWROOM。吉井優花子さんをフォローできる場所をまとめました。"
        />

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="riri-card riri-lift group flex min-h-32 items-start gap-4 border-rosefog/25 bg-porcelain p-5 hover:border-champagne hover:bg-white"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/50 bg-white text-champagne">
                  {link.kind === "showroom" ? (
                    <Video className="h-5 w-5" aria-hidden="true" />
                  ) : link.kind === "link" || link.kind === "note" ? (
                    <Link2 className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <span>
                  <span className="block font-display text-2xl text-ink">
                    {link.label}
                  </span>
                  <span className="mt-1 block text-sm font-bold text-champagne">
                    {link.handle}
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-ink/62">
                    {link.description}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="border border-champagne/40 bg-porcelain p-5">
            <p className="text-xs font-bold uppercase text-champagne">Media</p>
            <h3 className="mt-1 font-display text-3xl text-ink">
              もっと知る
            </h3>
            <div className="mt-5 grid gap-3">
              {mediaLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-rosefog/25 bg-white p-4 transition hover:border-champagne"
                >
                  <span className="block font-bold text-ink">{link.label}</span>
                  <span className="mt-1 block text-sm text-champagne">
                    {link.handle}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-ink/62">
                    {link.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
