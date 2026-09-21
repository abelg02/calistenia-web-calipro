// Five sharp squares, filled in gold up to the difficulty (square, not dots: page shape lock).
export function DifficultyMeter({ value, label, size = "sm" }: { value: number; label: string; size?: "sm" | "lg" }) {
  const box = size === "lg" ? "h-3 w-3" : "h-2 w-2";
  return (
    <span role="img" aria-label={`${label}: ${value}/5`} className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`${box} ${n <= value ? "bg-gold" : "border border-flint"}`} />
      ))}
    </span>
  );
}
