export type GalleryPhoto = {
  src: string;
  alt: string;
  label: string;
  tone: "hero" | "portrait" | "stage" | "casual";
  featured?: boolean;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/event-theoridea.jpg",
    alt: "舞台『テオリデア』の衣装姿の夏凪里季さん",
    label: "Stage",
    tone: "hero",
    featured: true
  },
  {
    src: "/images/riri-portrait.jpg",
    alt: "愛犬カルアちゃんと寄り添う夏凪里季さん",
    label: "Kalua",
    tone: "portrait"
  },
  {
    src: "/images/event-imacampus.jpg",
    alt: "グルメを手に笑顔の夏凪里季さん",
    label: "Gourmet",
    tone: "casual"
  },
  {
    src: "/images/riri-zine-01.jpg",
    alt: "ピースサインで笑う夏凪里季さん",
    label: "Smile",
    tone: "portrait"
  },
  {
    src: "/images/riri-zine-04.jpg",
    alt: "舞台のカーテンコールで花束を持つ夏凪里季さん",
    label: "Curtain",
    tone: "stage"
  },
  {
    src: "/images/event-fukurow.jpg",
    alt: "おでかけ先でのスナップの夏凪里季さん",
    label: "Style",
    tone: "casual"
  }
];
