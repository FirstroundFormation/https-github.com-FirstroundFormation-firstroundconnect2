interface Props {
  label: string;
  score: number;
  max: number;
  color: string;
}

export default function ScorePillar({ label, score, max, color }: Props) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-white/60">
        <span className="font-medium">{label}</span>
        <span style={{ color }}>{score}/{max}</span>
      </div>
      <div className="score-bar">
        <div className="score-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
