import React from 'react';
import { 
  Sparkles, 
  Recycle, 
  Radio, 
  Truck, 
  Leaf, 
  Flame, 
  TrendingUp, 
  ShieldCheck 
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
      {/* Top Tagline / AI Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.35rem 0.9rem',
        borderRadius: '999px',
        background: 'rgba(16, 185, 129, 0.12)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        color: '#34d399',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '1rem'
      }}>
        <Sparkles size={16} className="animate-pulse-glow" />
        <span>Next-Generation Intelligent Waste Sorting & IoT City Radar</span>
      </div>

      {/* Main Grid: Left Value Proposition & Right Quick Actions Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1rem',
            color: '#f8fafc'
          }}>
            Turn Every Scrap Into <span className="gradient-text">Clean Impact</span> & Rewards.
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            maxWidth: '600px',
            marginBottom: '1.75rem',
            lineHeight: 1.6
          }}>
            WasteWise leverages real-time computer vision to classify materials in milliseconds, orchestrates smart urban IoT bins, and rewards households with real carbon-negative eco-credits.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenScanner}
              className="btn-primary"
              style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
            >
              <Recycle size={20} />
              <span>Launch AI Classifier</span>
            </button>
            <button 
              onClick={() => onNavigate('radar')}
              className="btn-secondary"
              style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
            >
              <Radio size={20} color="#06b6d4" />
              <span>Explore IoT Bin Radar</span>
            </button>
            <button 
              onClick={() => onNavigate('pickups')}
              className="btn-ghost"
              style={{ padding: '0.85rem 1.2rem', color: '#cbd5e1' }}
            >
              <Truck size={18} />
              <span>Book Doorstep Pickup</span>
            </button>
          </div>
        </div>

        {/* Right Floating Visual Card */}
        <div className="glass-card" style={{
          padding: '1.75rem',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(6, 78, 59, 0.25) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981'
              }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Live Circular Network
              </span>
            </div>
            <span className="badge badge-cyan">99.4% AI Accuracy</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  padding: '0.6rem',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#34d399'
                }}>
                  <Leaf size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Municipal Diversion Rate</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>84.6% vs Landfill</div>
                </div>
              </div>
              <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                +14.2% <TrendingUp size={14} style={{ marginLeft: 3 }} />
              </span>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  padding: '0.6rem',
                  borderRadius: '10px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: '#22d3ee'
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Certified Clean Recyclers</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>18,490 Verified</div>
                </div>
              </div>
              <span className="badge badge-emerald">Active Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid-4">
        {/* Stat 1 */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Total Waste Diverted</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Recycle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {stats.totalWasteDivertedKg.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 600 }}>kg</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Prevents landfill methane buildup</p>
        </div>

        {/* Stat 2 */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>CO₂ Emissions Saved</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <Leaf size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {stats.totalCo2SavedKg.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#22d3ee', fontWeight: 600 }}>kg CO₂e</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Equiv. to planting ~2,400 trees</p>
        </div>

        {/* Stat 3 */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Live IoT Smart Bins</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Radio size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {stats.activeBinsCount} <span style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 600 }}>Active Nodes</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Ultrasonic fill-level & odor mesh</p>
        </div>

        {/* Stat 4 */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Community Eco-Credits</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc' }}>
              <Flame size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {stats.totalPointsDistributed.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#c084fc', fontWeight: 600 }}>PTS</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Redeemed for zero-waste goods</p>
        </div>
      </div>
    </div>
  );
};
