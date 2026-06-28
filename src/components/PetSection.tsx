import { Heart, PawPrint, Sparkles } from "lucide-react";
import { petProfile } from "../data/pet";
import { profile } from "../data/profile";
import { getResponsiveImageProps } from "../lib/responsiveImage";
import { SectionHeader } from "./SectionHeader";

export function PetSection() {
  return (
    <section id="kalua" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeader
            kicker="Kalua"
            title="活動のひとこま"
            copy={petProfile.lead}
          />
          <div className="border-y border-champagne/30 py-5 text-sm font-bold leading-7 text-ink/70">
            <span className="inline-flex items-center gap-2 text-champagne">
              <PawPrint className="h-4 w-4" aria-hidden="true" />
              {petProfile.ownerLabel}
            </span>
            <p className="mt-2">
              {profile.name}さんの活動や日常の雰囲気が伝わる写真も整理していきます。
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <figure className="border border-rosefog/20 bg-porcelain p-3 shadow-sm">
            <img
              {...getResponsiveImageProps(
                petProfile.ririImage,
                "(min-width: 1024px) 54vw, 100vw",
              )}
              alt={`${profile.name} profile photo`}
              loading="lazy"
              className="h-auto w-full border border-white bg-white"
            />
            <figcaption className="flex items-center gap-2 px-2 py-4 text-sm font-bold text-ink/65">
              <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
              優花子さん
            </figcaption>
          </figure>

          <div className="grid gap-4">
            <figure className="border border-champagne/35 bg-porcelain p-5 shadow-paper">
              <div className="mx-auto grid aspect-square max-w-[360px] place-items-center border border-white bg-white p-8">
                <img
                  {...getResponsiveImageProps(
                    petProfile.image,
                    "(min-width: 1024px) 360px, 80vw",
                  )}
                  alt="活動のひとこま"
                  loading="lazy"
                  className="h-auto max-h-full w-full object-contain"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-display text-3xl text-ink">{petProfile.name}</p>
                <p className="mt-2 text-sm font-bold text-ink/55">
                  {petProfile.breed} / {petProfile.gender}
                </p>
                <p className="mt-3 text-xs leading-6 text-ink/50">{petProfile.imageNote}</p>
              </figcaption>
            </figure>

            <div className="grid gap-3 sm:grid-cols-2">
              {petProfile.notes.map((note) => (
                <div key={note.label} className="border border-rosefog/20 bg-white p-4">
                  <p className="text-xs font-bold text-champagne">{note.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-7 text-ink/75">{note.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 border border-champagne/35 bg-porcelain p-4 text-sm font-bold leading-7 text-ink/70">
              <Heart className="mt-1 h-4 w-4 shrink-0 text-rosefog" aria-hidden="true" />
              活動の合間に見える、自然な表情も大切に残していきます。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
