import React, { useState } from 'react';
import { 
  Truck, 
  AlertTriangle, 
  Coins, 
  Clock, 
  Phone, 
  Send, 
  ShieldAlert, 
  Navigation, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PickupRequest } from '../types';
import { AiScanner } from './AiScanner';

interface CitizenPanelProps {
  ecoPoints: number;
  pickups: PickupRequest[];
  onEarnPoints: (points: number, reason: string) => void;
  onBookPickup: (pickup: PickupRequest) => void;
}

interface GrievanceItem {
  id: string;
  sector: string;
  category: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Resolved';
  reportedAt: string;
}

export const CitizenPanel: React.FC<CitizenPanelProps> = ({
  ecoPoints,
  onEarnPoints
}) => {
  const [activeCitizenTab, setActiveCitizenTab] = useState<'scanner' | 'grievance' | 'trucks'>('scanner');
  
  // Grievance form state
  const [sector, setSector] = useState('Sector 4 - Cyber Heights');
  const [grievanceCat, setGrievanceCat] = useState('Overflowing Community Bin');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [grievances, setGrievances] = useState<GrievanceItem[]>([
    {
      id: 'GRV-401',
      sector: 'Sector 4 - Cyber Heights',
      category: 'Overflowing Community Bin',
      description: 'Green organics bin is overflowing near public playground gate.',
      priority: 'High',
      status: 'In Progress',
      reportedAt: '2 hours ago'
    },
    {
      id: 'GRV-389',
      sector: 'Sector 9 - Metro Corridor',
      category: 'Illegal Debris Dumping',
      description: 'Construction mortar bags left on footpath curb.',
      priority: 'Medium',
      status: 'Resolved',
      reportedAt: '1 day ago'
    }
  ]);

  const nearbyTrucks = [
    {
      id: 'TRUCK-08',
      driver: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      vehicleNo: 'DL-01-EV-4421',
      zone: 'Sector 4 Hub',
      distanceKm: 0.6,
      etaMins: 4,
      status: 'En Route',
      capacityPct: 68
    },
    {
      id: 'TRUCK-14',
      driver: 'Vikram Singh',
      phone: '+91 98112 34567',
      vehicleNo: 'DL-03-EV-8902',
      zone: 'Sector 9 West',
      distanceKm: 1.8,
      etaMins: 12,
      status: 'Collecting',
      capacityPct: 82
    }
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGrievance: GrievanceItem = {
      id: `GRV-${Math.floor(100 + Math.random() * 900)}`,
      sector,
      category: grievanceCat,
      description,
      priority,
      status: 'Pending',
      reportedAt: 'Just now'
    };

    setGrievances(prev => [newGrievance, ...prev]);
    onEarnPoints(40, `Reported civic grievance for ${sector}`);
    setDescription('');
    confetti({ particleCount: 50, spread: 60 });
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Sparkles size={16} />
            <span>Citizen Action & Grievance Portal</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
            Citizen Dashboard
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Scan waste items with AI, track nearby garbage trucks in real-time, or report waste overflow to municipal authorities.
          </p>
        </div>

        {/* Sub tabs */}
        <div style={{
          display: 'flex',
          gap: '0.3rem',
          background: 'rgba(241, 245, 249, 0.9)',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <button
            onClick={() => setActiveCitizenTab('scanner')}
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: activeCitizenTab === 'scanner' ? '#ffffff' : 'transparent',
              color: activeCitizenTab === 'scanner' ? '#059669' : '#64748b',
              boxShadow: activeCitizenTab === 'scanner' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            📸 AI Classifier
          </button>
          <button
            onClick={() => setActiveCitizenTab('trucks')}
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: activeCitizenTab === 'trucks' ? '#ffffff' : 'transparent',
              color: activeCitizenTab === 'trucks' ? '#0d9488' : '#64748b',
              boxShadow: activeCitizenTab === 'trucks' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            🚚 Nearby Trucks ({nearbyTrucks.length})
          </button>
          <button
            onClick={() => setActiveCitizenTab('grievance')}
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: activeCitizenTab === 'grievance' ? '#ffffff' : 'transparent',
              color: activeCitizenTab === 'grievance' ? '#e11d48' : '#64748b',
              boxShadow: activeCitizenTab === 'grievance' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            ⚠️ Report Grievance
          </button>
        </div>
      </div>

      {/* Tab: AI Classifier */}
      {activeCitizenTab === 'scanner' && (
        <AiScanner onEarnPoints={onEarnPoints} />
      )}

      {/* Tab: Nearby Trucks Live Proximity */}
      {activeCitizenTab === 'trucks' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Navigation size={18} color="#0d9488" />
              <span>Live EV Collection Fleet Proximity</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {nearbyTrucks.map((truck) => (
                <div key={truck.id} className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #0d9488' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#ccfbf1', color: '#0f766e' }}>
                        <Truck size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{truck.vehicleNo} ({truck.id})</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Driver: {truck.driver} • <Phone size={12} style={{ display: 'inline' }} /> {truck.phone}</div>
                      </div>
                    </div>
                    <span className="badge badge-teal">{truck.status}</span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    padding: '0.65rem',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    marginTop: '0.75rem'
                  }}>
                    <div>
                      <span style={{ color: '#64748b' }}>Distance:</span> <strong style={{ color: '#059669' }}>{truck.distanceKm} km</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>ETA:</span> <strong style={{ color: '#0d9488' }}>~{truck.etaMins} mins</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Capacity:</span> <strong style={{ color: '#d97706' }}>{truck.capacityPct}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Doorstep Dispatch Callout */}
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Clock size={16} />
                <span>Next Scheduled Curbside Run</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Sector 4 Morning Organic Route
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Collection van arrives daily between 08:30 AM – 10:00 AM. Keep segregated wet and dry bins at the building reception.
              </p>

              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.85rem', borderRadius: '10px', fontSize: '0.82rem', color: '#065f46' }}>
                💡 <strong>Tip:</strong> Earn +25 Eco-Credits every time you hand over pre-sorted dry waste to the electric collector.
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.3rem' }}>Your Current Eco-Balance</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Coins size={22} color="#d97706" /> {ecoPoints.toLocaleString()} PTS
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Report Grievance / Garbage Overflow */}
      {activeCitizenTab === 'grievance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
          {/* Report Form */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} color="#e11d48" />
              <span>Lodge a Garbage / Overflow Grievance</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Directly alerts municipal health officers and nearest collection truck.
            </p>

            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  City Sector / Locality
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                >
                  <option value="Sector 4 - Cyber Heights">Sector 4 - Cyber Heights</option>
                  <option value="Sector 9 - Metro Corridor">Sector 9 - Metro Corridor</option>
                  <option value="Sector 12 - West Residential">Sector 12 - West Residential</option>
                  <option value="Sector 18 - Harbor Bay">Sector 18 - Harbor Bay</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  Issue Category
                </label>
                <select
                  value={grievanceCat}
                  onChange={(e) => setGrievanceCat(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                >
                  <option value="Overflowing Community Bin">Overflowing Community Bin</option>
                  <option value="Missed Doorstep Collection">Missed Doorstep Collection</option>
                  <option value="Illegal Debris Dumping">Illegal Debris / Construction Dumping</option>
                  <option value="Broken Smart Bin Sensor">Broken Smart Bin Sensor / Damaged Pod</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  Priority Level
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {(['Low', 'Medium', 'High'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        fontSize: '0.82rem',
                        borderRadius: '8px',
                        border: priority === p ? '2px solid #e11d48' : '1px solid #cbd5e1',
                        background: priority === p ? '#ffe4e6' : '#ffffff',
                        color: priority === p ? '#be123c' : '#64748b',
                        cursor: 'pointer',
                        fontWeight: 700
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  Description & Landmarks
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe location details, pile size, or hazardous smells..."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', resize: 'none', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)' }}>
                <Send size={16} />
                <span>Submit Grievance (+40 PTS)</span>
              </button>
            </form>
          </div>

          {/* Grievances List */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} color="#d97706" />
              <span>Track Reported Grievances ({grievances.length})</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {grievances.map((g) => (
                <div key={g.id} className="glass-card" style={{ padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', background: '#dcfce7', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
                      {g.id}
                    </span>
                    <span className={g.status === 'Resolved' ? 'badge badge-emerald' : g.status === 'In Progress' ? 'badge badge-teal' : 'badge badge-amber'}>
                      {g.status}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
                    {g.category}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.4rem' }}>
                    {g.sector} • <span style={{ color: g.priority === 'High' ? '#be123c' : '#b45309', fontWeight: 600 }}>{g.priority} Priority</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#475569', fontStyle: 'italic' }}>
                    "{g.description}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
