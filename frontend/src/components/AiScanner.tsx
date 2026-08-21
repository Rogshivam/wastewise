import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import * as confettiModule from 'canvas-confetti';
const confetti = (confettiModule as any).default || confettiModule;
import { 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Info, 
  Coins, 
  ShieldCheck, 
  Leaf 
} from 'lucide-react';
import type { WasteClassificationResult } from '../types';
import { DEMO_SCAN_PRESETS } from '../data/mockData';

interface AiScannerProps {
  onEarnPoints: (points: number, reason: string) => void;
}

export const AiScanner: FC<AiScannerProps> = ({ onEarnPoints }) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [claimedReward, setClaimedReward] = useState<boolean>(false);

  const currentResult: WasteClassificationResult = DEMO_SCAN_PRESETS[activeItemIndex] || DEMO_SCAN_PRESETS[0];

  const handleSelectPreset = (index: number) => {
    setActiveItemIndex(index);
    setCustomImage(null);
    setClaimedReward(false);
    triggerScanAnimation();
  };

  const triggerScanAnimation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result as string);
        setClaimedReward(false);
        triggerScanAnimation();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClaimPoints = () => {
    if (claimedReward) return;
    onEarnPoints(currentResult.ecoPoints, `Recycled ${currentResult.name}`);
    setClaimedReward(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Title section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Sparkles size={16} />
          <span>AI Computer Vision Engine</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
          Smart Waste Material Spectrometry
        </h2>
        <p style={{ color: '#475569', fontSize: '0.95rem' }}>
          Point your camera at any waste item or select a sample below to detect recyclability, material composition, and carbon diversion metrics in real-time.
        </p>
      </div>

      {/* Preset Quick-Picks */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', alignSelf: 'center', marginRight: '0.5rem' }}>Presets:</span>
        {DEMO_SCAN_PRESETS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleSelectPreset(idx)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '999px',
              border: activeItemIndex === idx && !customImage ? '2px solid #059669' : '1px solid #cbd5e1',
              background: activeItemIndex === idx && !customImage ? '#dcfce7' : '#ffffff',
              color: activeItemIndex === idx && !customImage ? '#047857' : '#334155',
              fontSize: '0.82rem',
              fontWeight: activeItemIndex === idx && !customImage ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <span>{item.name}</span>
            <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>+{item.ecoPoints} PTS</span>
          </button>
        ))}
      </div>

      {/* Main Scanner Grid: Viewfinder on Left, Results on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '2rem' }}>
        {/* Left: Viewfinder Simulator */}
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '360px',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={customImage || currentResult.imageThumbnail}
              alt={currentResult.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isScanning ? 0.6 : 0.95,
                transition: 'opacity 0.3s'
              }}
            />

            {/* Neural Bounding Box Overlay */}
            <div style={{
              position: 'absolute',
              inset: '18%',
              border: '2px solid #34d399',
              borderRadius: '8px',
              pointerEvents: 'none',
              boxShadow: '0 0 15px rgba(52, 211, 153, 0.4), inset 0 0 15px rgba(52, 211, 153, 0.2)'
            }}>
              {/* Corner brackets */}
              <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '12px', height: '12px', borderTop: '3px solid #34d399', borderLeft: '3px solid #34d399' }}></div>
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '12px', height: '12px', borderTop: '3px solid #34d399', borderRight: '3px solid #34d399' }}></div>
              <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '12px', height: '12px', borderBottom: '3px solid #34d399', borderLeft: '3px solid #34d399' }}></div>
              <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', borderBottom: '3px solid #34d399', borderRight: '3px solid #34d399' }}></div>

              {/* Tag header */}
              <div style={{
                position: 'absolute',
                top: '-26px',
                left: '0',
                background: '#059669',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <ShieldCheck size={12} />
                <span>{currentResult.name} ({(currentResult.confidence * 100).toFixed(0)}%)</span>
              </div>
            </div>

            {/* Laser scanning line animation */}
            {isScanning && (
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #34d399, transparent)',
                boxShadow: '0 0 12px #34d399',
                animation: 'scanLine 1.2s ease-in-out infinite'
              }}></div>
            )}

            {/* Status pills inside viewfinder */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none'
            }}>
              <span style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
                color: '#34d399',
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                border: '1px solid rgba(52, 211, 153, 0.4)',
                fontWeight: 700
              }}>
                LIVE CAMERA FEED (30 FPS)
              </span>

              <span style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
                color: '#e2e8f0',
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                YOLOv8 + TACO Engine
              </span>
            </div>
          </div>

          {/* Action buttons under viewfinder */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              onClick={triggerScanAnimation}
              className="btn-eco"
              style={{ flex: 1, padding: '0.65rem', borderRadius: '10px' }}
            >
              <RefreshCw size={16} />
              <span>Rescan Object</span>
            </button>

            <label
              className="btn-secondary"
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <Upload size={16} />
              <span>Upload Custom Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* Right: Detailed Classification Analysis */}
        <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Classification Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span className="badge badge-emerald">
                    Recyclability: {currentResult.recyclabilityScore}/100
                  </span>
                  <span className="badge badge-teal">
                    {(currentResult.confidence * 100).toFixed(0)}% Confidence
                  </span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
                  {currentResult.name}
                </h3>
              </div>

              {/* Target Bin Indicator */}
              <div style={{
                textAlign: 'center',
                padding: '0.6rem 1rem',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Target Bin</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669' }}></div>
                  <span>{currentResult.binColor}</span>
                </div>
              </div>
            </div>

            {/* Key Metrics: Carbon & Materials */}
            <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.85rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>Material Breakdown</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>{currentResult.materialType}</div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.85rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>CO₂ Emissions Prevented</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Leaf size={14} color="#059669" />
                  <span>{currentResult.co2SavedKg} kg CO₂e</span>
                </div>
              </div>
            </div>

            {/* Preparation Steps */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span>Disposal & Preparation Guidelines:</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {currentResult.instructions.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#475569' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#dcfce7', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcycling Tip */}
            {currentResult.upcycleTip && (
              <div style={{
                background: '#fefce8',
                border: '1px solid #fef08a',
                padding: '0.85rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                color: '#854d0e',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} color="#ca8a04" />
                <div>
                  <strong>Circular Upcycling Idea:</strong> {currentResult.upcycleTip}
                </div>
              </div>
            )}
          </div>

          {/* Claim Reward Button */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Earn Rewards for Sorting</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Coins size={18} /> +{currentResult.ecoPoints} Eco-Points
              </div>
            </div>

            <button
              onClick={handleClaimPoints}
              disabled={claimedReward}
              className={claimedReward ? "btn-secondary" : "btn-eco"}
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '10px',
                cursor: claimedReward ? 'default' : 'pointer'
              }}
            >
              {claimedReward ? (
                <>
                  <CheckCircle2 size={18} color="#059669" />
                  <span>Points Claimed ✓</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Deposit & Claim Points</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
