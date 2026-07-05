type SectionHeaderProps = {
  kicker: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  kicker,
  title,
  copy,
  align = "left"
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-8 max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <p className="mb-3 text-xs font-bold uppercase text-champagneInk">
        {kicker}
      </p>
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {copy && <p className="mt-4 leading-8 text-ink/70">{copy}</p>}
    </div>
  );
}
