import React, { useRef, useState } from 'react';
import theme from '../../theme';

interface DataPoint {
  month: string;
  avg: number;
  exams: number;
}

interface SimpleLineChartProps {
  data: DataPoint[];
}

const W = 600;
const H = 200;
const PAD = { top: 20, right: 20, bottom: 30, left: 30 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; d: DataPoint } | null>(null);

  const maxVal = Math.max(...data.flatMap((d) => [d.avg, d.exams])) + 1;

  const xScale = (i: number) => PAD.left + (i / (data.length - 1)) * CW;
  const yScale = (v: number) => PAD.top + CH - (v / maxVal) * CH;

  // Generates a smooth cubic bezier path for wavy curves
  const toSmoothPath = (key: keyof DataPoint) => {
    if (data.length === 0) return '';
    let path = `M ${xScale(0).toFixed(1)} ${yScale(data[0][key] as number).toFixed(1)}`;
    for (let i = 0; i < data.length - 1; i++) {
      const x0 = xScale(i);
      const y0 = yScale(data[i][key] as number);
      const x1 = xScale(i + 1);
      const y1 = yScale(data[i + 1][key] as number);
      
      const cpX1 = x0 + (x1 - x0) / 2;
      const cpY1 = y0;
      const cpX2 = x0 + (x1 - x0) / 2;
      const cpY2 = y1;
      
      path += ` C ${cpX1.toFixed(1)} ${cpY1.toFixed(1)}, ${cpX2.toFixed(1)} ${cpY2.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    }
    return path;
  };

  const months = data.map((d) => d.month);
  const yTicks = [0, 1, 2, 3, 4, 5, 6].filter((v) => v <= maxVal);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        ref={containerRef}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        style={{ overflow: 'visible', display: 'block' }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid lines */}
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={PAD.left} y1={yScale(v)}
              x2={W - PAD.right} y2={yScale(v)}
              stroke="#f0f2f8" strokeWidth={1}
            />
            <text
              x={PAD.left - 6} y={yScale(v) + 4}
              textAnchor="end" fontSize={10} fill={theme.colors.textMuted}
            >
              {v}
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {months.map((m, i) => {
          const isHovered = tooltip && tooltip.d.month === m;
          return (
            <text
              key={m}
              x={xScale(i)} y={H - PAD.bottom + 18}
              textAnchor="middle" fontSize={10} 
              fill={isHovered ? theme.colors.textPrimary : theme.colors.textMuted}
              style={{ fontWeight: isHovered ? 700 : 400, transition: 'all 0.15s' }}
            >
              {m}
            </text>
          );
        })}

        {/* Hover translucent column overlay */}
        {tooltip && (
          <rect
            x={xScale(data.indexOf(tooltip.d)) - 14}
            y={PAD.top - 10}
            width={28}
            height={CH + 10}
            fill="rgba(100, 116, 139, 0.08)"
            rx={4}
            pointerEvents="none"
          />
        )}

        {/* Avg Grade line (Smooth Blue Curve) */}
        <path d={toSmoothPath('avg')} fill="none" stroke={theme.colors.secondary} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* Exams line (Smooth Green Curve) */}
        <path d={toSmoothPath('exams')} fill="none" stroke={theme.colors.success} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* Invisible hover zones */}
        {data.map((d, i) => (
          <rect
            key={i}
            x={xScale(i) - 16} y={PAD.top}
            width={32} height={CH}
            fill="transparent"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => {
              const svg = containerRef.current;
              if (!svg) return;
              const rect = svg.getBoundingClientRect();
              const scaleX = rect.width / W;
              const scaleY = rect.height / H;
              setTooltip({
                x: xScale(i) * scaleX,
                y: yScale(d.avg) * scaleY,
                d,
              });
            }}
          />
        ))}

        {/* Dots on hover */}
        {tooltip && (
          <>
            <circle cx={xScale(data.indexOf(tooltip.d))} cy={yScale(tooltip.d.avg)} r={5} fill={theme.colors.secondary} stroke="#ffffff" strokeWidth={1.5} />
            <circle cx={xScale(data.indexOf(tooltip.d))} cy={yScale(tooltip.d.exams)} r={5} fill={theme.colors.success} stroke="#ffffff" strokeWidth={1.5} />
          </>
        )}
      </svg>

      {/* Premium dark floating tooltip bubble at intersection */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x - 22,
            top: tooltip.y - 32,
            background: '#475569',
            color: '#ffffff',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: '0.7rem',
            fontWeight: 700,
            pointerEvents: 'none',
            zIndex: 10,
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            textAlign: 'center',
            minWidth: 44,
          }}
        >
          {tooltip.d.avg.toFixed(1)}
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              bottom: -4,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #475569',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SimpleLineChart;
