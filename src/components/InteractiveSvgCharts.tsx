import React, { useState } from 'react';
import { motion } from 'motion/react';
import { YearProjection, StartupCostItem } from '../types';

interface ChartProps {
  projections: YearProjection[];
  startupCosts: StartupCostItem[];
}

export function InteractiveSvgCharts({ projections, startupCosts }: ChartProps) {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null);

  // Math calculations for Projected Cash Flow Bar Chart
  const maxVal = Math.max(...projections.map(p => Math.max(p.revenueLYD, p.operatingExpensesLYD)), 100000);
  const chartHeight = 220;
  const chartWidth = 500;
  const padding = 40;

  // Pie chart calculations for Capital Setup
  const categoryTotals = startupCosts.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.costLYD;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([key, value]) => ({
    name: key,
    value
  }));

  const totalCapital = pieData.reduce((sum, item) => sum + item.value, 0) || 1;

  // Colors for Pie Categories
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Equipment': return '#D4AF37'; // Amber Gold
      case 'Licensing & Legal': return '#4F46E5'; // Indigo
      case 'Real Estate & Facility': return '#10B981'; // Emerald
      case 'Working Capital': return '#3B82F6'; // Blue
      case 'Marketing': return '#EC4899'; // Pink
      case 'Contingency': return '#EF4444'; // Red
      default: return '#8B5CF6'; // Purple
    }
  };

  // Build Pie coordinates
  let cumulativeAngle = 0;
  const pieRadius = 80;
  const pieCenterX = 100;
  const pieCenterY = 100;

  const pieSlices = pieData.map((slice, idx) => {
    const angle = (slice.value / totalCapital) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    // Convert degrees to radians
    const rad = (val: number) => ((val - 90) * Math.PI) / 180;
    
    const x1 = pieCenterX + pieRadius * Math.cos(rad(startAngle));
    const y1 = pieCenterY + pieRadius * Math.sin(rad(startAngle));
    const x2 = pieCenterX + pieRadius * Math.cos(rad(endAngle));
    const y2 = pieCenterY + pieRadius * Math.sin(rad(endAngle));

    // Large arc flag
    const largeArc = angle > 180 ? 1 : 0;

    // Path command
    const pathData = `
      M ${pieCenterX} ${pieCenterY}
      L ${x1} ${y1}
      A ${pieRadius} ${pieRadius} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;

    return {
      name: slice.name,
      value: slice.value,
      percentage: ((slice.value / totalCapital) * 100).toFixed(1),
      pathData,
      color: getCategoryColor(slice.name)
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 5-Year Cash Flow Projections */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <h3 className="text-sm font-bold tracking-wide text-slate-805 uppercase font-sans">
              Financial Projections (5-Year Cycle)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-sans">Comparing Gross Revenue vs Operating Costs (LYD)</p>
          </div>
          <div className="flex gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> Revenue
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-300"></span> Expenses
            </span>
          </div>
        </div>

        {/* Bar Graph SVG */}
        <div className="relative w-full overflow-x-auto">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto text-slate-400 min-w-[450px]">
            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = padding + (chartHeight - padding * 2) * (1 - ratio);
              const valueLabel = Math.round(maxVal * ratio);
              return (
                <g key={idx} className="opacity-90">
                  <line 
                    x1={padding + 10} 
                    y1={y} 
                    x2={chartWidth - padding} 
                    y2={y} 
                    stroke="#F1F5F9" 
                    strokeWidth="1.5" 
                  />
                  <text 
                    x={padding} 
                    y={y + 4} 
                    fill="#64748B" 
                    fontSize="9" 
                    fontFamily="monospace" 
                    textAnchor="end"
                  >
                    {valueLabel >= 1000000 ? `${(valueLabel / 1000000).toFixed(1)}M` : `${Math.round(valueLabel / 1000)}k`}
                  </text>
                </g>
              );
            })}

            {/* X-Axis labels & columns */}
            {projections.map((p, idx) => {
              const colWidth = (chartWidth - padding * 2) / 5;
              const xCenter = padding + 15 + idx * colWidth + colWidth / 2;
              
              // Bar calculations
              const usableHeight = chartHeight - padding * 2;
              const revHeight = (p.revenueLYD / maxVal) * usableHeight;
              const expHeight = (p.operatingExpensesLYD / maxVal) * usableHeight;
              
              const barWidth = 20;
              const yZero = chartHeight - padding;

              const isHovered = hoveredBarIndex === idx;

              return (
                <g 
                  key={idx} 
                  onMouseEnter={() => setHoveredBarIndex(idx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  className="cursor-pointer"
                >
                  {/* Revenue Bar */}
                  <motion.rect
                    x={xCenter - barWidth - 2}
                    y={yZero - revHeight}
                    width={barWidth}
                    height={Math.max(revHeight, 2)}
                    fill={isHovered ? '#D97706' : '#F59E0B'}
                    rx="3"
                    initial={{ height: 0, y: yZero }}
                    animate={{ height: Math.max(revHeight, 2), y: yZero - revHeight }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />

                  {/* Expense Bar */}
                  <motion.rect
                    x={xCenter + 2}
                    y={yZero - expHeight}
                    width={barWidth}
                    height={Math.max(expHeight, 2)}
                    fill={isHovered ? '#64748B' : '#CBD5E1'}
                    rx="3"
                    initial={{ height: 0, y: yZero }}
                    animate={{ height: Math.max(expHeight, 2), y: yZero - expHeight }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />

                  {/* Year Label */}
                  <text 
                    x={xCenter} 
                    y={chartHeight - 15} 
                    fill="#64748B" 
                    fontSize="10" 
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    Year {p.year}
                  </text>

                  {/* Value Tooltip above bars if hovered */}
                  {isHovered && (
                    <g>
                      <rect 
                        x={xCenter - 75} 
                        y={yZero - Math.max(revHeight, expHeight) - 28} 
                        width="150" 
                        height="24" 
                        fill="#0F172A" 
                        stroke="#D4AF37"
                        strokeWidth="1"
                        rx="4" 
                      />
                      <text 
                        x={xCenter} 
                        y={yZero - Math.max(revHeight, expHeight) - 12}
                        fill="#F8FAFC" 
                        fontSize="9" 
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        Rev: {p.revenueLYD.toLocaleString()} | Exp: {p.operatingExpensesLYD.toLocaleString()}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            
            {/* Base line */}
            <line 
              x1={padding} 
              y1={chartHeight - padding} 
              x2={chartWidth - padding} 
              y2={chartHeight - padding} 
              stroke="#64748B" 
              strokeWidth="1.5" 
            />
          </svg>
        </div>
      </div>

      {/* Startup Cost Structure Pie Chart */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h3 className="text-sm font-bold tracking-wide text-slate-805 uppercase font-sans mb-1">
          Required Startup Capital Allocation
        </h3>
        <p className="text-xs text-slate-500 mb-6 font-sans">Total calculated: {totalCapital.toLocaleString()} LYD</p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Pie Chart SVG */}
          <div className="col-span-1 md:col-span-5 flex justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              {pieSlices.map((slice, idx) => {
                const isHovered = hoveredPieIndex === idx;
                return (
                  <motion.path
                    key={idx}
                    d={slice.pathData}
                    fill={slice.color}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isHovered ? 1.05 : 1,
                    }}
                    onMouseEnter={() => setHoveredPieIndex(idx)}
                    onMouseLeave={() => setHoveredPieIndex(null)}
                    className="cursor-pointer transition-all duration-300"
                  />
                );
              })}
              {/* Inner ring for donut design */}
              <circle cx="100" cy="100" r="45" fill="#FFFFFF" />
              <text 
                x="100" 
                y="98" 
                fill="#64748B" 
                fontSize="8" 
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                TOTAL
              </text>
              <text 
                x="100" 
                y="112" 
                fill="#0F172A" 
                fontSize="9" 
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {totalCapital >= 1000000 
                  ? `${(totalCapital / 1000000).toFixed(2)}M` 
                  : `${Math.round(totalCapital / 1000)}k`}
              </text>
            </svg>
          </div>

          {/* Color Indicators Legend */}
          <div className="col-span-1 md:col-span-7 flex flex-col gap-2.5 max-h-[180px] overflow-y-auto">
            {pieSlices.map((slice, idx) => {
              const isSelected = hoveredPieIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`flex justify-between items-center p-1.5 rounded transition border cursor-pointer ${
                    isSelected ? 'bg-slate-50 border-slate-200' : 'border-transparent'
                  }`}
                  onMouseEnter={() => setHoveredPieIndex(idx)}
                  onMouseLeave={() => setHoveredPieIndex(null)}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full block shrink-0" 
                      style={{ backgroundColor: slice.color }}
                    ></span>
                    <span className="text-xs text-slate-700 font-sans truncate max-w-[130px]" title={slice.name}>
                      {slice.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {slice.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
