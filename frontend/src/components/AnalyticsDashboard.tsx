import type { FC } from 'react';
import { 
  BarChart3, 
  Leaf, 
  Droplet, 
  Zap, 
  Box, 
  PieChart as PieIcon
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', kg: 1420 },
    { month: 'Feb', kg: 1850 },
    { month: 'Mar', kg: 2100 },
    { month: 'Apr', kg: 2650 },
    { month: 'May', kg: 3100 },
    { month: 'Jun', kg: 3750 },
    { month: 'Jul', kg: 4400 },
    { month: 'Aug', kg: 5240 },
  ];

  const maxKg = Math.max(...monthlyData.map(d => d.kg));

  const materialBreakdown = [
    { material: 'Rigid Plastics (PET/HDPE)', percentage: 38, color: '#059669', kg: 5630 },
    { material: 'Cardboard & Mixed Paper', percentage: 27, color: '#0d9488', kg: 4000 },
    { material: 'Organic Kitchen Compost', percentage: 22, color: '#d97706', kg: 3260 },
    { material: 'E-Waste & Circuit Boards', percentage: 8, color: '#8b5cf6', kg: 1180 },
    { material: 'Metals & Aluminum Cans', percentage: 5, color: '#0284c7', kg: 750 },
  ];

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <BarChart3 size={16} />
          <span>Verified LCA Carbon Ledger</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
          Environmental Impact & Life Cycle Analytics
        </h2>
        <p style={{ color: '#475569', fontSize: '0.95rem' }}>
          Real-time empirical metrics on natural resource conservation, landfill volume spared, and avoided greenhouse gas emissions.
        </p>
      </div>

      {/* 4 Impact Equivalents */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #059669' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Mature Trees Saved</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#dcfce7', color: '#047857' }}>
              <Leaf size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            642 <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>Trees</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
            Through recycled fiber substitution
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0d9488' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Water Conserved</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#ccfbf1', color: '#0f766e' }}>
              <Droplet size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            1.82M <span style={{ fontSize: '0.85rem', color: '#0d9488', fontWeight: 700 }}>Liters</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
            Pulp & paper processing water saved
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Clean Energy Spared</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#fef3c7', color: '#b45309' }}>
              <Zap size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            94,200 <span style={{ fontSize: '0.85rem', color: '#d97706', fontWeight: 700 }}>kWh</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
            Enough to power ~82 homes for 1 mo
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Landfill Volume Spared</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#f3e8ff', color: '#6b21a8' }}>
              <Box size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            1,480 <span style={{ fontSize: '0.85rem', color: '#8b5cf6', fontWeight: 700 }}>m³</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
            Zero methane leaching to groundwater
          </div>
        </div>
      </div>

      {/* Main Charts: Monthly Trend + Material Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem' }}>
        {/* Monthly Trend Visual Bar Chart */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Monthly Diverted Waste (kg)</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Steady trajectory towards 100% municipal circularity</p>
            </div>
            <span className="badge badge-emerald">+32% YoY</span>
          </div>

          {/* Custom SVG/CSS Bar Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '220px', paddingTop: '1rem' }}>
            {monthlyData.map((d) => {
              const heightPct = (d.kg / maxKg) * 100;
              return (
                <div key={d.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', marginBottom: '0.4rem' }}>
                    {(d.kg / 1000).toFixed(1)}t
                  </div>
                  <div style={{
                    width: '36px',
                    height: `${heightPct}%`,
                    borderRadius: '8px 8px 4px 4px',
                    background: 'linear-gradient(180deg, #059669 0%, #0d9488 100%)',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
                    transition: 'height 0.8s ease'
                  }} />
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginTop: '0.6rem' }}>
                    {d.month}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Material Distribution Breakdown */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Material Breakdown</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>By mass and category composition</p>
            </div>
            <PieIcon size={18} color="#0d9488" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {materialBreakdown.map((mat) => (
              <div key={mat.material}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{mat.material}</span>
                  <span style={{ fontWeight: 800, color: mat.color }}>{mat.percentage}% ({mat.kg} kg)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${mat.percentage}%`, height: '100%', background: mat.color, borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
