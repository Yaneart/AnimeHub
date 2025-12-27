import { Modal } from "../../../shared/ui/modal/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  embedUrl: string;
  title: string;
}

export function TrailerModal({ open, onClose, embedUrl, title }: Props) {
  const separator = embedUrl.includes("?") ? "&" : "?";

  const cleanEmbedUrl =
    embedUrl + `${separator}rel=0&modestbranding=1&controls=1`;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-[90vw] max-w-4xl overflow-hidden rounded-xl bg-black">
        <div className="aspect-video">
          <iframe
            src={cleanEmbedUrl}
            title={`${title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </Modal>
  );
}
