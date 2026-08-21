import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  Coins, 
  Zap, 
  Lightbulb, 
  RefreshCw,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WasteClassificationResult } from '../types';
import { DEMO_SCAN_PRESETS } from '../data/mockData';

interface AiScannerProps {
  onEarnPoints: (points: number, reason: string) => void;
  onViewBinRadar?: () => void;
}

export const AiScanner: React.FC<AiScannerProps> = ({ onEarnPoints }) => {
  const [selectedPreset, setSelectedPreset] = useState<WasteClassificationResult>(DEMO_SCAN_PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleScanSimulation = (item: WasteClassificationResult) => {
    setIsScanning(true);
    setIsClaimed(false);
    setSelectedPreset(item);
    setCustomImage(null);

    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleClaimPoints = () => {
    if (isClaimed) return;
    setIsClaimed(true);
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.65 },
      colors: ['#10b981', '#34d399', '#06b6d4', '#fbbf24']
    });
    onEarnPoints(selectedPreset.ecoPoints, `Scanned & sorted ${selectedPreset.name}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
        setIsScanning(true);
        setIsClaimed(false);
        // Randomly pick a preset classification result for custom image
        const randomPreset = DEMO_SCAN_PRESETS[Math.floor(Math.random() * DEMO_SCAN_PRESETS.length)];
        setSelectedPreset({
          ...randomPreset,
          name: `Custom Upload: ${file.name.replace(/\.[^/.]+$/, "")}`
        });
        setTimeout(() => {
          setIsScanning(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'recyclable': return 'badge-cyan';
      case 'organic': return 'badge-emerald';
      case 'e-waste': return 'badge-amber';
      case 'hazardous': return 'badge-rose';
      default: return 'badge-violet';
    }
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Camera size={16} />
            <span>AI Neural Waste Classifier</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
            Real-Time Material Recognition & Bin Guidance
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Snap a photo, choose an example, or upload an image to identify recyclability, carbon savings, and exact sorting rules.
          </p>
        </div>

        {/* Preset Selector Pill Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          background: 'rgba(15, 23, 42, 0.7)',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {DEMO_SCAN_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id && !customImage;
            return (
              <button
                key={preset.id}
                onClick={() => handleScanSimulation(preset)}
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                  color: isSelected ? '#34d399' : '#94a3b8',
                  borderBottom: isSelected ? '2px solid #10b981' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                {preset.name.split('(')[0].trim()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Classifier Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.25fr',
        gap: '2rem'
      }}>
        {/* Left Column: Viewfinder & Camera Simulation */}
        <div className="glass-card" style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Viewfinder Box */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 3',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#0a0f1d',
            border: '2px dashed rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Display Image */}
            <img 
              src={customImage || selectedPreset.imageThumbnail} 
              alt={selectedPreset.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isScanning ? 'brightness(0.7) blur(1px)' : 'brightness(0.95)',
                transition: 'all 0.3s ease'
              }}
            />

            {/* Bounding Box HUD Overlay */}
            <div style={{
              position: 'absolute',
              inset: '15%',
              border: '2px solid #34d399',
              borderRadius: '8px',
              boxShadow: '0 0 15px rgba(52, 211, 153, 0.4)',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '0.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.7)', color: '#34d399', padding: '2px 6px', borderRadius: '4px' }}>
                  AI_DETECT: 99.4 FPS
                </span>
                <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.7)', color: '#22d3ee', padding: '2px 6px', borderRadius: '4px' }}>
                  CONF: {selectedPreset.confidence}%
                </span>
              </div>
              <div style={{ alignSelf: 'flex-start' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#10b981', color: '#000', padding: '2px 8px', borderRadius: '4px' }}>
                  {selectedPreset.name.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #34d399, #22d3ee, transparent)',
                boxShadow: '0 0 20px #34d399',
                animation: 'scanLine 1.2s infinite ease-in-out'
              }} />
            )}

            {/* Scanning Status Badge */}
            {isScanning && (
              <div style={{
                position: 'absolute',
                background: 'rgba(0, 0, 0, 0.85)',
                color: '#34d399',
                padding: '0.6rem 1.2rem',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid #10b981'
              }}>
                <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Analyzing Material Spectrometry...</span>
              </div>
            )}
          </div>

          {/* Upload / Re-scan Action Bar */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            width: '100%',
            marginTop: '1.25rem'
          }}>
            <label 
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.65rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                color: '#f8fafc',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Upload size={16} color="#06b6d4" />
              <span>Upload Custom Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>

            <button 
              onClick={() => handleScanSimulation(selectedPreset)}
              className="btn-primary"
              style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem', borderRadius: '10px' }}
            >
              <Zap size={16} />
              <span>Re-Scan Item</span>
            </button>
          </div>
        </div>

        {/* Right Column: AI Analysis & Actionable Result */}
        <div className="glass-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: '4px solid #10b981'
        }}>
          <div>
            {/* Top Classification Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className={`badge ${getCategoryBadgeClass(selectedPreset.category)}`}>
                  {selectedPreset.category.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Confidence: <strong style={{ color: '#34d399' }}>{selectedPreset.confidence}%</strong>
                </span>
              </div>

              {/* Recommended Bin Pill */}
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: selectedPreset.binColor.startsWith('Blue') ? '#0284c7' 
                    : selectedPreset.binColor.startsWith('Green') ? '#16a34a'
                    : selectedPreset.binColor.startsWith('Yellow') ? '#eab308'
                    : selectedPreset.binColor.startsWith('Red') ? '#dc2626'
                    : '#475569'
                }} />
                <span>Target: {selectedPreset.binColor}</span>
              </div>
            </div>

            {/* Item Title & Material description */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.35rem' }}>
              {selectedPreset.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <Layers size={15} color="#06b6d4" />
              <span>Material: <strong style={{ color: '#e2e8f0' }}>{selectedPreset.materialType}</strong></span>
            </div>

            {/* 3 Metric Pill Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Recyclability</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399' }}>{selectedPreset.recyclabilityScore}%</div>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CO₂ Prevented</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#22d3ee' }}>+{selectedPreset.co2SavedKg} kg</div>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Reward Points</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fbbf24' }}>+{selectedPreset.ecoPoints} PTS</div>
              </div>
            </div>

            {/* Step-by-Step Disposal Instructions */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Recommended Disposal Steps</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedPreset.instructions.map((step, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontSize: '0.82rem',
                    color: '#94a3b8',
                    lineHeight: 1.4
                  }}>
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#34d399',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '1px'
                    }}>
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Circular Upcycling Tip */}
            {selectedPreset.upcycleTip && (
              <div style={{
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontSize: '0.8rem',
                color: '#bae6fd',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                marginBottom: '1.5rem'
              }}>
                <Lightbulb size={18} color="#22d3ee" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#22d3ee' }}>Upcycling Hack: </strong>
                  {selectedPreset.upcycleTip}
                </div>
              </div>
            )}
          </div>

          {/* Claim Points CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Status</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: isClaimed ? '#34d399' : '#f8fafc' }}>
                {isClaimed ? '✓ Points Claimed & Credited' : 'Verified by WasteWise Neural Vision'}
              </div>
            </div>

            <button
              onClick={handleClaimPoints}
              disabled={isClaimed}
              className="btn-primary"
              style={{
                background: isClaimed 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                color: isClaimed ? '#34d399' : '#ffffff',
                border: isClaimed ? '1px solid #10b981' : 'none',
                cursor: isClaimed ? 'default' : 'pointer'
              }}
            >
              <Coins size={18} color={isClaimed ? '#34d399' : '#fbbf24'} />
              <span>{isClaimed ? 'Earned + ' + selectedPreset.ecoPoints + ' PTS' : 'Claim +' + selectedPreset.ecoPoints + ' Eco-Points'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
