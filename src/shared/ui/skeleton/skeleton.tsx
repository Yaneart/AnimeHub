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
      className="animate-pulse bg-slate-900"
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}
