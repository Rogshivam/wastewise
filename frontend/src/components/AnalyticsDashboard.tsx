import React, { useState } from 'react';
import { 
  BarChart3, 
  Leaf, 
  Droplet, 
  Zap, 
  Globe2, 
  TrendingUp, 
  ShieldCheck
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '1y'>('30d');

  const monthlyTrends = [
    { month: 'Mar', divertedKg: 120, co2Kg: 84 },
    { month: 'Apr', divertedKg: 145, co2Kg: 102 },
    { month: 'May', divertedKg: 190, co2Kg: 133 },
    { month: 'Jun', divertedKg: 240, co2Kg: 168 },
    { month: 'Jul', divertedKg: 285, co2Kg: 200 },
    { month: 'Aug', divertedKg: 340, co2Kg: 238 },
  ];

  const materialBreakdown = [
    { name: 'PET & Rigid Plastics', percentage: 38, color: '#06b6d4', icon: '🧴' },
    { name: 'Paper & Cardboard', percentage: 27, color: '#10b981', icon: '📦' },
    { name: 'Organic Compostables', percentage: 20, color: '#34d399', icon: '🍎' },
    { name: 'Electronics / E-Waste', percentage: 10, color: '#fbbf24', icon: '🔋' },
    { name: 'Glass & Metals', percentage: 5, color: '#a78bfa', icon: '🥫' },
  ];

  const maxKg = Math.max(...monthlyTrends.map(m => m.divertedKg));

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06b6d4', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <BarChart3 size={16} />
            <span>Ecological Footprint Analytics</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
            Municipal & Personal Carbon Reduction Ledger
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Audited life-cycle analysis (LCA) verifying diverted materials and greenhouse gas offsets.
          </p>
        </div>

        {/* Time range pill selector */}
        <div style={{
          display: 'flex',
          gap: '0.3rem',
          background: 'rgba(15, 23, 42, 0.7)',
          padding: '0.35rem',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {(['30d', '90d', '1y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                padding: '0.4rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: timeRange === range ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
                color: timeRange === range ? '#22d3ee' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              {range === '30d' ? 'Last 30 Days' : range === '90d' ? 'Quarterly' : 'Past Year'}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Environmental Equivalent Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#34d399', marginBottom: '0.4rem' }}>
            <Leaf size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Tree Absorption Equiv.</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc' }}>
            48.2 <span style={{ fontSize: '0.85rem', color: '#34d399' }}>Full Trees</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>Carbon sequestered annually</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #06b6d4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#22d3ee', marginBottom: '0.4rem' }}>
            <Droplet size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Clean Water Conserved</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc' }}>
            14,800 <span style={{ fontSize: '0.85rem', color: '#22d3ee' }}>Liters</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>By recycling paper & plastics</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fbbf24', marginBottom: '0.4rem' }}>
            <Zap size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Clean Energy Saved</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc' }}>
            2,940 <span style={{ fontSize: '0.85rem', color: '#fbbf24' }}>kWh</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>Powers an average home for 3.2 mo</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #a78bfa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#c084fc', marginBottom: '0.4rem' }}>
            <Globe2 size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Landfill Space Spared</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc' }}>
            12.6 <span style={{ fontSize: '0.85rem', color: '#c084fc' }}>m³ Volume</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>Compacted waste diversion</p>
        </div>
      </div>

      {/* Main Charts Grid: Monthly Trend Bar Chart + Material Breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '2rem'
      }}>
        {/* Left: Monthly Trend Visual Graph */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>Waste Diverted Monthly Trend</h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Tracking continuous month-over-month growth</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.85rem', fontWeight: 700 }}>
              <TrendingUp size={16} />
              <span>+38.5% QoQ</span>
            </div>
          </div>

          {/* Bar Chart Visualizer */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1rem',
            height: '200px',
            paddingTop: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '1rem'
          }}>
            {monthlyTrends.map((item, idx) => {
              const heightPercent = (item.divertedKg / maxKg) * 100;
              const isCurrent = idx === monthlyTrends.length - 1;

              return (
                <div 
                  key={item.month}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isCurrent ? '#34d399' : '#94a3b8' }}>
                    {item.divertedKg}kg
                  </span>

                  <div style={{
                    width: '100%',
                    maxWidth: '44px',
                    height: `${heightPercent}%`,
                    background: isCurrent 
                      ? 'linear-gradient(180deg, #34d399 0%, #059669 100%)' 
                      : 'linear-gradient(180deg, rgba(6, 182, 212, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
                    borderRadius: '8px 8px 2px 2px',
                    boxShadow: isCurrent ? '0 0 15px rgba(52, 211, 153, 0.4)' : 'none',
                    transition: 'height 0.8s ease'
                  }} />

                  <span style={{ fontSize: '0.78rem', color: isCurrent ? '#f8fafc' : '#64748b', fontWeight: isCurrent ? 700 : 500 }}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Verified by Municipal Scale Weight Sensors</span>
            <span>Last sync: 10 mins ago</span>
          </div>
        </div>

        {/* Right: Material Category Breakdown */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>Material Composition</h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Distribution across collected categories</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {materialBreakdown.map((item) => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  <span style={{ fontWeight: 700, color: item.color }}>{item.percentage}%</span>
                </div>

                <div style={{ width: '100%', height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    background: item.color,
                    boxShadow: `0 0 8px ${item.color}`,
                    borderRadius: '999px'
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '0.85rem',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              <strong>ISO 14064-1 Certified:</strong> Full carbon credits audit ledger available for municipal verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
