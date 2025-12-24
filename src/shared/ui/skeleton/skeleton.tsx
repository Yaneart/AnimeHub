interface Props {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius = 4,
}: Props) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #eee,rgb(91, 13, 13), #eee)",
        backgroundSize: "200% 100%",
        animation: "skeleton 1.2s ease-in-out infinite",
      }}
    />
  );
}
