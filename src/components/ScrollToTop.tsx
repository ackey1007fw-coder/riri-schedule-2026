import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center border border-rosefog/40 bg-white/92 text-ink shadow-paper backdrop-blur-xl transition hover:-translate-y-1 hover:border-champagne hover:shadow-lg md:bottom-6"
      aria-label="ページのトップに戻る"
      style={{ borderRadius: "6px" }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
