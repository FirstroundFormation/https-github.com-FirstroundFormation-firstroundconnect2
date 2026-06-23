"use client";

interface Pillar {
  label: string;
  score: number;
  max: number;
  color: string;
}

interface Props {
  pillars: Pillar[];
  size?: number;
}

export default function RadarChart({ pillars, size = 220 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const n = pillars.length;

  function polarToXY(angle: number, radius: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  const angles = pillars.map((_, i) => (360 / n) * i);

  // Grid circles (3 levels)
  const levels = [0.33, 0.66, 1];

  // Data polygon
  const dataPoints = pillars.map((p, i) => {
    const ratio = p.score / p.max;
    return polarToXY(angles[i], r * ratio);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg width={size} height={size} className="overflow-visible">
      {/* Grid circles */}
      {levels.map((level) => (
        <polygon
          key={level}
          points={angles.map((a) => {
            const p = polarToXY(a, r * level);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {angles.map((angle, i) => {
        const outer = polarToXY(angle, r);
        return (
          <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y}
            stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        );
      })}

      {/* Data polygon — filled */}
      <path d={dataPath} fill="rgba(201,162,39,0.12)" stroke="#C9A227" strokeWidth="2" strokeLinejoin="round" />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4}
          fill={pillars[i].color} stroke="#0A0A0E" strokeWidth="2" />
      ))}

      {/* Labels */}
      {angles.map((angle, i) => {
        const lp = polarToXY(angle, r + 22);
        const { label, score, max, color } = pillars[i];
        return (
          <g key={i}>
            <text x={lp.x} y={lp.y - 4} textAnchor="middle"
              fill={color} fontSize="9" fontFamily="'Barlow Condensed', sans-serif"
              fontWeight="700" letterSpacing="0.05em">
              {label.toUpperCase()}
            </text>
            <text x={lp.x} y={lp.y + 9} textAnchor="middle"
              fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="'Barlow', sans-serif">
              {score}/{max}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
