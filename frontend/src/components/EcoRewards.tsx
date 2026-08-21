import { useState } from 'react';
import type { FC } from 'react';
import { 
  Gift, 
  Coins, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Copy, 
  Check 
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
  const [activeVoucher, setActiveVoucher] = useState<{ reward: EcoReward; code: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const categories = ['All', 'Vouchers', 'Eco Products', 'Tree Planting', 'Clean Energy'];

  const filteredRewards = rewards.filter(r => 
    selectedCategory === 'All' || r.category === selectedCategory
  );

  const handleRedeem = (reward: EcoReward) => {
    const success = onRedeemReward(reward);
    if (success) {
      const generatedCode = `ECO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setActiveVoucher({ reward, code: generatedCode });
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCopyCode = () => {
    if (activeVoucher) {
      navigator.clipboard.writeText(activeVoucher.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header with points balance hero */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d97706', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Gift size={16} />
            <span>Circularity Points Marketplace</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
            Eco-Rewards & Zero-Waste Store
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Redeem your earned recycling credits for organic groceries, tree planting sponsorships, electric transit passes, and sustainable gear.
          </p>
        </div>

        {/* Big Balance Banner */}
        <div className="glass-card" style={{
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '1px solid #fde68a'
        }}>
          <div style={{ padding: '0.6rem', borderRadius: '50%', background: '#f59e0b', color: '#ffffff' }}>
            <Coins size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 600 }}>Your Available Eco-Balance</div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#b45309', lineHeight: 1.1 }}>
              {ecoPoints.toLocaleString()} <span style={{ fontSize: '1rem' }}>PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              border: selectedCategory === cat ? '2px solid #059669' : '1px solid #cbd5e1',
              background: selectedCategory === cat ? '#dcfce7' : '#ffffff',
              color: selectedCategory === cat ? '#047857' : '#475569',
              fontSize: '0.82rem',
              fontWeight: selectedCategory === cat ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid-3">
        {filteredRewards.map((reward) => {
          const canAfford = ecoPoints >= reward.costPoints;

          return (
            <div
              key={reward.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Reward Top Header Badge */}
                <div style={{
                  padding: '1.5rem 1.25rem 1rem 1.25rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <span className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
                      {reward.category}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                      {reward.title}
                    </h3>
                  </div>

                  <div style={{
                    background: '#ffffff',
                    color: '#b45309',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    border: '1px solid #fde68a'
                  }}>
                    <Coins size={14} color="#d97706" />
                    <span>{reward.costPoints} PTS</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {reward.description}
                  </p>

                  <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                    Brand Partner: {reward.brand} • In Stock: {reward.stockAvailable}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ padding: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford}
                  className={canAfford ? "btn-eco" : "btn-secondary"}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    cursor: canAfford ? 'pointer' : 'not-allowed',
                    opacity: canAfford ? 1 : 0.65
                  }}
                >
                  {canAfford ? (
                    <>
                      <Sparkles size={16} />
                      <span>Redeem for {reward.costPoints} PTS</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Need {reward.costPoints - ecoPoints} More PTS</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voucher Success Modal */}
      {activeVoucher && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '480px',
            width: '100%',
            padding: '2rem',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
              Voucher Claimed Successfully!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
              You redeemed <strong>{activeVoucher.reward.title}</strong> for {activeVoucher.reward.costPoints} Eco-Points.
            </p>

            {/* Code Box */}
            <div style={{
              background: '#f8fafc',
              border: '2px dashed #cbd5e1',
              padding: '1rem',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.1em', color: '#059669' }}>
                {activeVoucher.code}
              </span>
              <button
                onClick={handleCopyCode}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderRadius: '8px' }}
              >
                {copiedCode ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                <span>{copiedCode ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <button
              onClick={() => setActiveVoucher(null)}
              className="btn-eco"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '12px' }}
            >
              Done & Return to Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
