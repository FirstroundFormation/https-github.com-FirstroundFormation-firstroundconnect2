"use client";

interface Props {
  score: number;
  max?: number;
  size?: number;
}

export default function GaugeChart({ score, max = 100, size = 180 }: Props) {
  const cx = size / 2;
  const cy = size * 0.62;
  const r = size * 0.40;
  const strokeW = size * 0.07;

  const startAngle = -200;
  const endAngle = 20;
  const range = endAngle - startAngle;

  function polar(angleDeg: number, radius: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arc(fromDeg: number, toDeg: number, radius: number) {
    const from = polar(fromDeg, radius);
    const to = polar(toDeg, radius);
    const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
    return `M ${from.x} ${from.y} A ${radius} ${radius} 0 ${large} 1 ${to.x} ${to.y}`;
  }

  const pct = Math.min(score / max, 1);
  const fillEnd = startAngle + range * pct;

  const color = pct >= 0.85 ? "#C9A227"
    : pct >= 0.65 ? "#3B5FCC"
    : pct >= 0.45 ? "#22C55E"
    : "#EF4444";

  return (
    <svg width={size} height={size * 0.72} className="overflow-visible">
      {/* Track */}
      <path d={arc(startAngle, endAngle, r)}
        fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeW}
        strokeLinecap="round" />
      {/* Fill */}
      {pct > 0 && (
        <path d={arc(startAngle, fillEnd, r)}
          fill="none" stroke={color} strokeWidth={strokeW}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }} />
      )}
      {/* Score text */}
      <text x={cx} y={cy + 2} textAnchor="middle"
        fill={color} fontSize={size * 0.22}
        fontFamily="'Orbitron', sans-serif" fontWeight="900">
        {score}
      </text>
      <text x={cx} y={cy + size * 0.13} textAnchor="middle"
        fill="rgba(255,255,255,0.3)" fontSize={size * 0.08}
        fontFamily="'Barlow Condensed', sans-serif" fontWeight="600" letterSpacing="2">
        / {max}
      </text>
    </svg>
  );
}
