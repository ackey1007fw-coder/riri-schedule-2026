export type GalleryPhoto = {
  src: string;
  alt: string;
  label: string;
  tone: "hero" | "portrait" | "stage" | "casual";
  featured?: boolean;
};

const driveImage = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: driveImage("1-tnOZvazIjzWiOBCrzVdUhaY9mFXCkNp"),
    alt: "夏凪里季さんのメイン写真",
    label: "Cover",
    tone: "hero",
    featured: true
  },
  {
    src: driveImage("15cmlhmXNpJRzztleLn_Q_97ft1Gffr4j"),
    alt: "夏凪里季さんのポートレート",
    label: "Portrait",
    tone: "portrait"
  },
  {
    src: driveImage("1oQsKMTmUFyfAg8EBASWN2l8TyCyWGGXI"),
    alt: "夏凪里季さんの写真",
    label: "Moment",
    tone: "casual"
  },
  {
    src: driveImage("1YC7lBN-STmcpdGYX-Q7fBt1cBj1YUgGn"),
    alt: "夏凪里季さんの写真",
    label: "Scene",
    tone: "stage"
  },
  {
    src: driveImage("1CIpjLx59X7Rj3atjiqIT1Pqv44ojE3l4"),
    alt: "夏凪里季さんの写真",
    label: "Style",
    tone: "portrait"
  },
  {
    src: driveImage("1Ld4snjp67PdiNIrN_jDCxjQ-leTV7yMx"),
    alt: "夏凪里季さんの写真",
    label: "Smile",
    tone: "casual"
  },
  {
    src: driveImage("1tX415Tt5YTCCh9gjnzThVU9djIKP0t-1"),
    alt: "夏凪里季さんの写真",
    label: "Acting",
    tone: "stage"
  },
  {
    src: driveImage("1lILj9lIp3WW06FFSgTYR1R71yIMx--To"),
    alt: "夏凪里季さんの写真",
    label: "Light",
    tone: "hero"
  },
  {
    src: driveImage("1S6KPPIGL2OopItBePUK_C6bJXEkwbMRM"),
    alt: "夏凪里季さんの写真",
    label: "Zine",
    tone: "portrait"
  },
  {
    src: driveImage("1hg7CCMX-vtLQo1CajCz0rc8_FZCddz-W"),
    alt: "夏凪里季さんの写真",
    label: "Daily",
    tone: "casual"
  },
  {
    src: driveImage("1MhtYW0KPCOf0E4NITJwUZGlSgj4k3JDQ"),
    alt: "夏凪里季さんの写真",
    label: "Stage",
    tone: "stage"
  },
  {
    src: driveImage("1KdV8VAtKqaLjgT0cLxDJGt__0EOHzvze"),
    alt: "夏凪里季さんの写真",
    label: "Archive",
    tone: "hero"
  }
];
