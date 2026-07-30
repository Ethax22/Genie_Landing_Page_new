export default function StatChip({
  emoji,
  label,
  className = "",
  style,
}: {
  emoji?: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-genie/50 bg-cosmic/70 px-3.5 py-2 font-mono text-xs text-cream shadow-lg shadow-night/50 backdrop-blur-sm ${className}`}
    >
      {emoji ? <span aria-hidden>{emoji}</span> : null}
      {label}
    </span>
  );
}
