import React from 'react';
import { 
  Sparkles, 
  Leaf, 
  Zap, 
  ShieldCheck, 
  Camera, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import type { NavTab } from './Navbar';

interface HeroBannerProps {
  onNavigate: (tab: NavTab) => void;
  onOpenScanner: () => void;
  stats: {
    totalWasteDivertedKg: number;
    totalCo2SavedKg: number;
    activeBinsCount: number;
    totalPointsDistributed: number;
  };
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onNavigate,
  onOpenScanner,
  stats
}) => {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Main Hero Card */}
      <div className="glass-card" style={{
        padding: '3rem 2.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.95) 100%)',
        border: '1px solid rgba(5, 150, 105, 0.2)',
        marginBottom: '2rem'
      }}>
        {/* Subtle Background Glow */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(5, 150, 105, 0.12) 0%, rgba(13, 148, 136, 0.05) 70%, transparent 100%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: '#dcfce7',
            border: '1px solid #bbf7d0',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#047857',
            marginBottom: '1.25rem'
          }}>
            <Sparkles size={14} color="#059669" />
            <span>AI-Driven Circular Waste Intelligence System</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: '2.75rem',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#0f172a',
            marginBottom: '1rem'
          }}>
            Next-Gen Urban Waste Segregation & <span className="gradient-text">Circular Resource Engine</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '680px'
          }}>
            Empowering citizens with real-time AI waste vision, IoT ultrasonic bin telemetry, and electric fleet routing to divert municipal landfills to 100% circular valorization.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenScanner}
              className="btn-eco"
              style={{
                fontSize: '0.95rem',
                padding: '0.8rem 1.6rem',
                borderRadius: '12px'
              }}
            >
              <Camera size={18} />
              <span>Launch AI Waste Scanner</span>
            </button>

            <button
              onClick={() => onNavigate('citizen-panel')}
              className="btn-secondary"
              style={{
                fontSize: '0.95rem',
                padding: '0.8rem 1.4rem',
                borderRadius: '12px'
              }}
            >
              <span>Explore Citizen Portal</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate('collector-panel')}
              className="btn-purple"
              style={{
                fontSize: '0.95rem',
                padding: '0.8rem 1.4rem',
                borderRadius: '12px'
              }}
            >
              <span>Collector Logistics</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Metric Telemetry Cards */}
      <div className="grid-4">
        <div className="glass-card" style={{ padding: '1.35rem', borderLeft: '4px solid #059669' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total Waste Diverted</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#dcfce7', color: '#047857' }}>
              <Leaf size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            {(stats.totalWasteDivertedKg / 1000).toFixed(2)} <span style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 700 }}>Tons</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#047857', marginTop: '0.35rem' }}>
            <TrendingUp size={13} />
            <span>+18.4% this month</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.35rem', borderLeft: '4px solid #0d9488' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Net CO₂ Avoided</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#ccfbf1', color: '#0f766e' }}>
              <Zap size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            {(stats.totalCo2SavedKg / 1000).toFixed(2)} <span style={{ fontSize: '0.9rem', color: '#0d9488', fontWeight: 700 }}>t CO₂e</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
            Equivalent to ~460 trees planted
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.35rem', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>IoT Smart Bins Active</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#f3e8ff', color: '#6b21a8' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            {stats.activeBinsCount} <span style={{ fontSize: '0.9rem', color: '#8b5cf6', fontWeight: 700 }}>Pods</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
            Ultrasonic & LoRaWAN mesh
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.35rem', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Eco-Rewards Issued</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#fef3c7', color: '#b45309' }}>
              <Award size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            {(stats.totalPointsDistributed / 1000).toFixed(1)}k <span style={{ fontSize: '0.9rem', color: '#d97706', fontWeight: 700 }}>PTS</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
            Redeemed across 1,240 eco-vouchers
          </div>
        </div>
      </div>
    </div>
  );
};
