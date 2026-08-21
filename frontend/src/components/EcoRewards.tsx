import React, { useState } from 'react';
import { 
  Gift, 
  Coins, 
  ShoppingBag, 
  Trees, 
  Coffee, 
  Train, 
  Sun, 
  Check, 
  Copy, 
  Sparkles, 
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { EcoReward } from '../types';

interface EcoRewardsProps {
  ecoPoints: number;
  rewards: EcoReward[];
  onRedeemReward: (reward: EcoReward) => boolean;
}

export const EcoRewards: React.FC<EcoRewardsProps> = ({
  ecoPoints,
  rewards,
  onRedeemReward
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVoucherModal, setActiveVoucherModal] = useState<EcoReward | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['All', 'Vouchers', 'Tree Planting', 'Eco Products', 'Clean Energy'];

  const filteredRewards = rewards.filter(r => 
    selectedCategory === 'All' || r.category === selectedCategory
  );

  const handleRedeem = (reward: EcoReward) => {
    const success = onRedeemReward(reward);
    if (success) {
      setActiveVoucherModal(reward);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6']
      });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getRewardIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag size={22} color="#10b981" />;
      case 'Trees': return <Trees size={22} color="#34d399" />;
      case 'Coffee': return <Coffee size={22} color="#fbbf24" />;
      case 'Train': return <Train size={22} color="#06b6d4" />;
      case 'Sun': return <Sun size={22} color="#f59e0b" />;
      default: return <Gift size={22} color="#8b5cf6" />;
    }
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header & Balance Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Gift size={16} />
            <span>Circularity Gamification</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
            Eco-Rewards & Carbon-Negative Marketplace
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Convert the points you earned from waste sorting and cleanups into zero-waste grocery vouchers, transit passes, or certified mangrove trees.
          </p>
        </div>

        {/* User Balance Card */}
        <div className="glass-card" style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#fef08a', fontWeight: 600 }}>Your Available Eco-Balance</span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '999px',
              background: 'rgba(245, 158, 11, 0.25)',
              fontSize: '0.75rem',
              color: '#fef08a',
              fontWeight: 700
            }}>
              <Flame size={13} color="#f59e0b" /> Tier 2 Silver
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Coins size={28} color="#fbbf24" />
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
              {ecoPoints.toLocaleString()}
            </span>
            <span style={{ fontSize: '1rem', color: '#fef08a', fontWeight: 700 }}>PTS</span>
          </div>

          {/* Level Progress */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
              <span>Progress to Gold Tier (3,000 PTS)</span>
              <span>{Math.min(100, Math.round((ecoPoints / 3000) * 100))}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.4)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min(100, (ecoPoints / 3000) * 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #fbbf24, #10b981)',
                boxShadow: '0 0 10px #fbbf24'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        overflowX: 'auto',
        paddingBottom: '0.25rem'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.85rem',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              background: selectedCategory === cat ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              color: selectedCategory === cat ? '#fef08a' : '#94a3b8',
              borderBottom: selectedCategory === cat ? '2px solid #fbbf24' : '2px solid transparent',
              fontWeight: selectedCategory === cat ? 700 : 500,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Catalog Grid */}
      <div className="grid-3">
        {filteredRewards.map((reward) => {
          const canAfford = ecoPoints >= reward.costPoints;

          return (
            <div
              key={reward.id}
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: canAfford ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div>
                {/* Top Row: Brand & Category Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getRewardIcon(reward.iconName)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{reward.brand}</div>
                      <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>{reward.category}</div>
                    </div>
                  </div>

                  <span className="badge badge-amber">{reward.tag}</span>
                </div>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                  {reward.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {reward.description}
                </p>
              </div>

              {/* Bottom: Cost & Redeem Button */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Coins size={16} color="#fbbf24" />
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                      {reward.costPoints}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>PTS</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {reward.stockAvailable} available
                  </span>
                </div>

                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    fontSize: '0.85rem',
                    borderRadius: '10px',
                    background: canAfford 
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: canAfford ? '#ffffff' : '#64748b',
                    border: canAfford ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: canAfford ? 'pointer' : 'not-allowed',
                    boxShadow: canAfford ? '0 4px 15px rgba(245, 158, 11, 0.3)' : 'none'
                  }}
                >
                  <Gift size={16} />
                  <span>{canAfford ? 'Redeem Voucher' : `Need ${reward.costPoints - ecoPoints} More PTS`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voucher Confirmation Modal */}
      {activeVoucherModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '480px',
            width: '100%',
            padding: '2rem',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '2px solid #fbbf24',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
            }}>
              <Sparkles size={32} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.25rem' }}>
              Voucher Unlocked! 🎉
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
              You redeemed <strong>{activeVoucherModal.title}</strong> from {activeVoucherModal.brand}.
            </p>

            {/* Discount Code Box */}
            <div style={{
              background: '#090d16',
              border: '2px dashed #fbbf24',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Coupon Code</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.05em' }}>
                  {activeVoucherModal.discountCode}
                </div>
              </div>

              <button
                onClick={() => handleCopyCode(activeVoucherModal.discountCode)}
                className="btn-secondary"
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
              >
                {copiedCode ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={() => setActiveVoucherModal(null)}
              className="btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              Done & Return to Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
