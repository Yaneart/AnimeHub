import { useEffect } from "react";
import { Modal } from "../modal/Modal";

interface Props {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function Lightbox({
  open,
  imageUrl,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, hasPrev, hasNext, onPrev, onNext]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative grid h-[90vh] w-[90vw] place-items-center">
        <img
          src={imageUrl}
          alt="Preview"
          className="max-h-full max-w-full rounded-lg object-contain"
        />

        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 text-5xl text-white opacity-70 select-none hover:opacity-100"
            aria-label="Previous"
          >
            ‹
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 text-5xl text-white opacity-70 select-none hover:opacity-100"
            aria-label="Next"
          >
            ›
          </button>
        )}
      </div>
    </Modal>
  );
}
