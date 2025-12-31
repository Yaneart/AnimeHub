import { useState } from "react";
import { Lightbox } from "../../../shared/ui/lightbox/Lightbox";
import { useTranslation } from "react-i18next";

interface Props {
  pictures: {
    jpg: { large_image_url: string };
    webp?: { large_image_url: string };
  }[];
}

export function AnimePictures({ pictures }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const {t} = useTranslation()

  const images = pictures.map(
    (pic) => pic.webp?.large_image_url ?? pic.jpg.large_image_url
  );

  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const next = () =>
    setActiveIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i));

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">{t("stills")}</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-lg"
          >
            <img
              src={src}
              alt={`Anime frame ${index + 1}`}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          open
          imageUrl={images[activeIndex]}
          onClose={close}
          onPrev={prev}
          onNext={next}
          hasPrev={activeIndex > 0}
          hasNext={activeIndex < images.length - 1}
        />
      )}
    </div>
  );
}
