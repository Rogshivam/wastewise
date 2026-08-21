import React, { useState } from 'react';
import { 
  Recycle, 
  Sparkles, 
  Radio, 
  Truck, 
  Gift, 
  Users, 
  BarChart3, 
  BookOpen, 
  Coins, 
  Bell, 
  CheckCircle2, 
  Flame
} from 'lucide-react';

export type NavTab = 'overview' | 'scanner' | 'radar' | 'pickups' | 'rewards' | 'community' | 'analytics' | 'guide';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  ecoPoints: number;
  streakDays: number;
  onOpenScannerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  ecoPoints,
  streakDays,
  onOpenScannerModal
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'overview', label: 'Dashboard', icon: Sparkles },
    { id: 'scanner', label: 'AI Scanner', icon: Recycle },
    { id: 'radar', label: 'IoT Smart Bins', icon: Radio },
    { id: 'pickups', label: 'Pickups', icon: Truck },
    { id: 'rewards', label: 'Rewards Store', icon: Gift },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'analytics', label: 'Impact Analytics', icon: BarChart3 },
    { id: 'guide', label: 'Sorting Guide', icon: BookOpen },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 12, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.75rem 1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('overview')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.45)'
          }}>
            <Recycle size={24} color="#ffffff" style={{ animation: 'spin 20s linear infinite' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
                Waste<span className="gradient-text">Wise</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                padding: '0.1rem 0.4rem',
                borderRadius: '999px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 700
              }}>v2.4 AI</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0, lineHeight: 1 }}>Smart Circular Ecology</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: 'rgba(15, 23, 42, 0.65)',
          padding: '0.25rem 0.35rem',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          overflowX: 'auto',
          maxWidth: '100%'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '999px',
                  border: 'none',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)' 
                    : 'transparent',
                  color: isActive ? '#34d399' : '#94a3b8',
                  boxShadow: isActive ? 'inset 0 0 12px rgba(16, 185, 129, 0.2), 0 0 12px rgba(16, 185, 129, 0.1)' : 'none',
                  borderBottom: isActive ? '1px solid #10b981' : '1px solid transparent',
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Stats & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Quick Scan Button */}
          <button 
            onClick={onOpenScannerModal}
            className="btn-primary"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Recycle size={16} />
            <span>Scan Item</span>
          </button>

          {/* Eco Points Pill */}
          <div 
            onClick={() => setActiveTab('rewards')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            title="Your Eco-Points balance. Click to redeem!"
          >
            <Coins size={16} color="#fbbf24" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fef08a' }}>
              {ecoPoints.toLocaleString()} <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>PTS</span>
            </span>
          </div>

          {/* Streak Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            padding: '0.35rem 0.65rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#fb7185'
          }} title="Current Recycling Streak">
            <Flame size={15} color="#f43f5e" />
            <span>{streakDays}d</span>
          </div>

          {/* Notification Icon */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e2e8f0',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 6px #10b981'
              }}></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="glass-card-static" style={{
                position: 'absolute',
                right: 0,
                top: '48px',
                width: '300px',
                padding: '1rem',
                zIndex: 100,
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: '#fff' }}>Notifications</h4>
                  <span style={{ fontSize: '0.7rem', color: '#34d399' }}>2 New</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{
                    padding: '0.6rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    borderLeft: '3px solid #10b981'
                  }}>
                    <div style={{ fontWeight: 600, color: '#34d399' }}>Points Credited! 🎉</div>
                    <div style={{ color: '#cbd5e1' }}>You earned +35 Eco-Points for sorting Organic food peels.</div>
                  </div>
                  <div style={{
                    padding: '0.6rem',
                    background: 'rgba(6, 182, 212, 0.1)',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    borderLeft: '3px solid #06b6d4'
                  }}>
                    <div style={{ fontWeight: 600, color: '#22d3ee' }}>Smart Bin Emptying</div>
                    <div style={{ color: '#cbd5e1' }}>Tech Central Bin Pod #1 collection truck dispatched.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '2px solid #10b981',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" 
                alt="Alex Rivera"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {showProfileMenu && (
              <div className="glass-card-static" style={{
                position: 'absolute',
                right: 0,
                top: '48px',
                width: '220px',
                padding: '0.9rem',
                zIndex: 100
              }}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>Alex Rivera</p>
                  <p style={{ fontSize: '0.75rem', color: '#34d399' }}>🌱 Level 4 Eco Warrior</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e2e8f0' }}>
                    <CheckCircle2 size={14} color="#10b981" /> Verified Green Citizen
                  </div>
                  <div>168.2 kg Waste Diverted</div>
                  <div>14 Day Active Streak</div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
