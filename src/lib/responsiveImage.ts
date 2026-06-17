import { imageManifest } from "../data/imageManifest";

const optimizedSrc = (src: string, width: number) => {
  const lastSlash = src.lastIndexOf("/");
  const directory = src.slice(0, lastSlash + 1).replace("/images/", "/images/optimized/");
  const file = src.slice(lastSlash + 1);
  const dot = file.lastIndexOf(".");
  const base = dot === -1 ? file : file.slice(0, dot);
  return `${directory}${base}-${width}.webp`;
};

export function getResponsiveImageProps(
  src: string,
  sizes = "100vw",
  preferredWidths?: readonly number[],
) {
  const image = imageManifest[src as keyof typeof imageManifest];

  if (!image) {
    return { src };
  }

  const widths = preferredWidths?.length
    ? image.widths.filter((width) => preferredWidths.includes(width))
    : image.widths;
  const usableWidths = widths.length ? widths : image.widths;

  return {
    src,
    srcSet: usableWidths
      .map((width) => `${optimizedSrc(src, width)} ${width}w`)
      .join(", "),
    sizes,
    width: image.width,
    height: image.height
  };
}
