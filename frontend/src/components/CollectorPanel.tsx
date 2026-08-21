import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Circle, 
  Power, 
  Navigation, 
  Battery, 
  Gauge, 
  Scale, 
  CheckCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WaypointStop {
  id: string;
  name: string;
  location: string;
  wasteType: string;
  fillPct: number;
  isCompleted: boolean;
  estWeightKg: number;
}

export const CollectorPanel: React.FC = () => {
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [isRouteActive, setIsRouteActive] = useState(true);
  const [vehicleId] = useState('EV-COLLECTOR-08');
  const [driverName] = useState('Rajesh Kumar (Collector)');
  const [tonnageCollectedKg, setTonnageCollectedKg] = useState(840);

  const [stops, setStops] = useState<WaypointStop[]>([
    {
      id: 'STOP-01',
      name: 'Tech Central Smart Pod #1',
      location: 'Cyber Gateway & 4th Ave',
      wasteType: 'Plastic & Cans',
      fillPct: 88,
      isCompleted: true,
      estWeightKg: 145
    },
    {
      id: 'STOP-02',
      name: 'Downtown Plaza Eco Hub',
      location: 'Civic Center Metro Station',
      wasteType: 'Paper & Cardboard',
      fillPct: 45,
      isCompleted: false,
      estWeightKg: 210
    },
    {
      id: 'STOP-03',
      name: 'Harbor Pier E-Depot',
      location: 'Pier 39 Recycling Bay',
      wasteType: 'E-Waste',
      fillPct: 92,
      isCompleted: false,
      estWeightKg: 340
    },
    {
      id: 'STOP-04',
      name: 'Greenway Market Bio-Bin',
      location: 'Organic Farmers Pavilion',
      wasteType: 'Organic Food',
      fillPct: 74,
      isCompleted: false,
      estWeightKg: 285
    }
  ]);

  const completedCount = stops.filter(s => s.isCompleted).length;
  const progressPct = Math.round((completedCount / stops.length) * 100);

  const handleToggleStop = (stopId: string) => {
    setStops(prev => prev.map(s => {
      if (s.id === stopId) {
        const nextState = !s.isCompleted;
        if (nextState) {
          setTonnageCollectedKg(t => t + s.estWeightKg);
          confetti({ particleCount: 40, spread: 50 });
        } else {
          setTonnageCollectedKg(t => Math.max(0, t - s.estWeightKg));
        }
        return { ...s, isCompleted: nextState };
      }
      return s;
    }));
  };

  const handleFinishRoute = () => {
    setIsRouteActive(false);
    confetti({ particleCount: 100, spread: 80 });
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0d9488', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Truck size={16} />
            <span>Driver & Waste Collector Portal</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
            Collector Dashboard — {vehicleId}
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Active municipal collection route navigation, smart bin emptying checklist, and live payload weighing.
          </p>
        </div>

        {/* Duty Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsOnDuty(!isOnDuty)}
            className={isOnDuty ? "btn-eco" : "btn-secondary"}
            style={{
              padding: '0.55rem 1.3rem',
              fontSize: '0.85rem',
              borderRadius: '999px',
              background: isOnDuty ? 'linear-gradient(135deg, #059669 0%, #0d9488 100%)' : '#ffffff',
              color: isOnDuty ? '#ffffff' : '#64748b'
            }}
          >
            <Power size={15} />
            <span>{isOnDuty ? '● On Duty (Active)' : '○ Off Duty'}</span>
          </button>
        </div>
      </div>

      {/* Driver Telemetry Bar */}
      <div className="grid-4" style={{ marginBottom: '1.75rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #059669' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total Waste Collected</span>
            <div style={{ padding: '0.35rem', borderRadius: '8px', background: '#dcfce7', color: '#047857' }}>
              <Scale size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a' }}>
            {(tonnageCollectedKg / 1000).toFixed(2)} <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>Tons</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Hydraulic payload sensor verified</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #0d9488' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Route Progress</span>
            <div style={{ padding: '0.35rem', borderRadius: '8px', background: '#ccfbf1', color: '#0f766e' }}>
              <Navigation size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a' }}>
            {completedCount} / {stops.length} <span style={{ fontSize: '0.85rem', color: '#0d9488', fontWeight: 700 }}>Stops</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{progressPct}% route finished</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>EV Truck Battery</span>
            <div style={{ padding: '0.35rem', borderRadius: '8px', background: '#fef3c7', color: '#b45309' }}>
              <Battery size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a' }}>
            78% <span style={{ fontSize: '0.85rem', color: '#d97706', fontWeight: 700 }}>SOC</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Range remaining: ~142 km</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Assigned Zone</span>
            <div style={{ padding: '0.35rem', borderRadius: '8px', background: '#f3e8ff', color: '#6b21a8' }}>
              <MapPin size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>
            Sector 4 & 9
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Central Urban Municipality</div>
        </div>
      </div>

      {/* Main Grid: Left Waypoint Stops + Right Live GPS Map Simulation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
        {/* Left: Waypoint Stops List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
              Optimized Collection Waypoints
            </h3>
            <span className="badge badge-emerald">Route: #DELHI-NORTH-04</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {stops.map((stop, idx) => (
              <div
                key={stop.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  borderLeft: stop.isCompleted ? '4px solid #059669' : '4px solid #d97706',
                  opacity: stop.isCompleted ? 0.75 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <button
                    onClick={() => handleToggleStop(stop.id)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: stop.isCompleted ? '#dcfce7' : '#f8fafc',
                      border: stop.isCompleted ? '1px solid #059669' : '1px solid #cbd5e1',
                      color: stop.isCompleted ? '#059669' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    {stop.isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>STOP #{idx + 1}</span>
                      <span style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: 600 }}>• {stop.wasteType}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.98rem' }}>
                      {stop.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={12} /> {stop.location}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: stop.fillPct >= 80 ? '#e11d48' : '#d97706' }}>
                    {stop.fillPct}% Full
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    ~{stop.estWeightKg} kg load
                  </div>
                  <button
                    onClick={() => handleToggleStop(stop.id)}
                    className={stop.isCompleted ? "btn-secondary" : "btn-eco"}
                    style={{
                      padding: '0.35rem 0.8rem',
                      fontSize: '0.75rem',
                      borderRadius: '8px',
                      marginTop: '0.35rem'
                    }}
                  >
                    {stop.isCompleted ? 'Undo Stop' : 'Mark Collected'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Complete Route Action */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={handleFinishRoute}
              disabled={!isRouteActive}
              className="btn-eco"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.92rem',
                borderRadius: '12px'
              }}
            >
              <CheckCircle size={18} />
              <span>{isRouteActive ? 'Complete Route & Discharge to Transfer Station' : 'Route Completed ✓'}</span>
            </button>
          </div>
        </div>

        {/* Right: GPS Navigation Hud Card */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0d9488', fontSize: '0.88rem', fontWeight: 700 }}>
                <Gauge size={16} />
                <span>Turn-by-Turn GPS HUD</span>
              </div>
              <span className="badge badge-teal">Speed: 28 km/h</span>
            </div>

            {/* Visual HUD Simulation */}
            <div style={{
              height: '180px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '2px dashed rgba(13, 148, 136, 0.3)',
                animation: 'pulseGlow 3s infinite'
              }} />
              <Navigation size={36} color="#0d9488" style={{ transform: 'rotate(45deg)', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                Next Turn: 150m Right onto 4th Ave
              </div>
              <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                Approaching: Tech Central Smart Pod #1
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem', color: '#64748b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Driver:</span> <strong style={{ color: '#0f172a' }}>{driverName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shift Hours:</span> <strong style={{ color: '#0f172a' }}>07:00 AM – 03:30 PM</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Target Station:</span> <strong style={{ color: '#0d9488' }}>Okhla Bio-Methanation Plant</strong>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', background: '#f1f5f9', padding: '0.75rem', borderRadius: '10px', fontSize: '0.78rem', color: '#64748b' }}>
            Emergency Line: <strong style={{ color: '#0f172a' }}>+91 1800-WASTE-HELP</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
