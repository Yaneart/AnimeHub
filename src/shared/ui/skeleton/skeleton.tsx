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
      className="animate-pulse bg-slate-200 dark:bg-slate-700"
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}
