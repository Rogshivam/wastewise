import { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Leaf, 
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FleetTruck {
  id: string;
  vehicleNo: string;
  driver: string;
  phone: string;
  zone: string;
  batteryPct: number;
  payloadKg: number;
  status: 'Active En Route' | 'Collecting' | 'Returning' | 'Charging';
}

interface AdminGrievance {
  id: string;
  reportedBy: string;
  sector: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Assigned' | 'Resolved';
  timeAgo: string;
}

export const AdminPanel: React.FC = () => {
  const [adminTab, setAdminTab] = useState<'overview' | 'fleet' | 'grievances' | 'workforce'>('overview');
  const [grievanceFilter, setGrievanceFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const [fleet] = useState<FleetTruck[]>([
    {
      id: 'TRK-101',
      vehicleNo: 'DL-01-EV-4421',
      driver: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      zone: 'Sector 4 & 9 (Tech Corridor)',
      batteryPct: 78,
      payloadKg: 1250,
      status: 'Active En Route'
    },
    {
      id: 'TRK-102',
      vehicleNo: 'DL-03-EV-8902',
      driver: 'Vikram Singh',
      phone: '+91 98112 34567',
      zone: 'Sector 12 (Residential West)',
      batteryPct: 64,
      payloadKg: 2100,
      status: 'Collecting'
    },
    {
      id: 'TRK-103',
      vehicleNo: 'DL-05-EV-1129',
      driver: 'Anita Deshmukh',
      phone: '+91 97234 56789',
      zone: 'Harbor Commercial Pier',
      batteryPct: 92,
      payloadKg: 820,
      status: 'Active En Route'
    },
    {
      id: 'TRK-104',
      vehicleNo: 'DL-08-EV-9011',
      driver: 'Mohammad Farooq',
      phone: '+91 99887 76655',
      zone: 'Sector 18 Market Sub-division',
      batteryPct: 41,
      payloadKg: 3400,
      status: 'Returning'
    }
  ]);

  const [grievances, setGrievances] = useState<AdminGrievance[]>([
    {
      id: 'GRV-801',
      reportedBy: 'Kavita Verma (Citizen)',
      sector: 'Sector 4 - Cyber Heights',
      category: 'Overflowing Organics Bin Pod',
      priority: 'High',
      status: 'Assigned',
      timeAgo: '25m ago'
    },
    {
      id: 'GRV-802',
      reportedBy: 'Amit Joshi (Citizen)',
      sector: 'Sector 12 - West Block C',
      category: 'Illegal Construction Mortar Waste',
      priority: 'High',
      status: 'Pending',
      timeAgo: '1h ago'
    },
    {
      id: 'GRV-803',
      reportedBy: 'Sunil Mehta (Citizen)',
      sector: 'Harbor Pier Central Lane',
      category: 'Missed Bulk E-Waste Pick',
      priority: 'Medium',
      status: 'Pending',
      timeAgo: '3h ago'
    },
    {
      id: 'GRV-804',
      reportedBy: 'Priya Sundaram (Citizen)',
      sector: 'Sector 9 Metro Exit 2',
      category: 'Full Plastic Compactor',
      priority: 'Low',
      status: 'Resolved',
      timeAgo: '5h ago'
    }
  ]);

  const handleResolveGrievance = (id: string) => {
    setGrievances(prev => prev.map(g => g.id === id ? { ...g, status: 'Resolved' } : g));
    confetti({ particleCount: 50, spread: 60 });
  };

  const filteredGrievances = grievances.filter(g => 
    grievanceFilter === 'All' || g.priority === grievanceFilter
  );

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <ShieldCheck size={16} />
            <span>Municipal Command & Fleet Intelligence</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
            Admin & Municipal Command Hub
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            City-wide live telemetry oversight, EV collection fleet dispatch, and citizen grievance resolution.
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          gap: '0.3rem',
          background: 'rgba(241, 245, 249, 0.9)',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          {(['overview', 'fleet', 'grievances', 'workforce'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setAdminTab(tab)}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: adminTab === tab ? '#ffffff' : 'transparent',
                color: adminTab === tab ? '#7c3aed' : '#64748b',
                boxShadow: adminTab === tab ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              {tab === 'overview' ? '📊 City Overview' : tab === 'fleet' ? '🚚 EV Fleet (4)' : tab === 'grievances' ? '⚠️ Grievance Triage' : '👥 Workforce'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 City Stats */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #059669' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Active Electric Trucks</span>
            <div style={{ padding: '0.35rem', borderRadius: '8px', background: '#dcfce7', color: '#047857' }}>
              <Truck size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
            4 / 4 <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>Dispatched</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Zero tailpipe emissions</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #0d9488' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Today's Diverted Waste</span>
            <div style={{ padding: '0.35rem', borderRadius: '8px', background: '#ccfbf1', color: '#0f766e' }}>
              <Leaf size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
            7.57 <span style={{ fontSize: '0.85rem', color: '#0d9488', fontWeight: 700 }}>Tons</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>84.6% diversion rate</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #e11d48' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Open Citizen Grievances</span>
            <div style={{ padding: '0.35rem', borderRadius: '8px', background: '#ffe4e6', color: '#be123c' }}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
            3 <span style={{ fontSize: '0.85rem', color: '#e11d48', fontWeight: 700 }}>Pending Action</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Avg resolution time: 1.4 hrs</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>AI Route Optimization</span>
            <div style={{ padding: '0.35rem', borderRadius: '8px', background: '#f3e8ff', color: '#6b21a8' }}>
              <Cpu size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
            +24.8% <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700 }}>Efficiency</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Saved ~340 km travel route</div>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {adminTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem' }}>
          {/* Fleet status table */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Live Fleet Real-Time Status</h3>
              <button onClick={() => setAdminTab('fleet')} className="btn-ghost" style={{ fontSize: '0.8rem' }}>View All →</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {fleet.map((t) => (
                <div key={t.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.4rem', borderRadius: '8px', background: '#ccfbf1', color: '#0f766e' }}>
                      <Truck size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{t.vehicleNo}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Driver: {t.driver} • {t.zone}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className={t.status === 'Active En Route' ? 'badge badge-emerald' : t.status === 'Collecting' ? 'badge badge-teal' : 'badge badge-amber'}>
                      {t.status}
                    </span>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                      Batt: <strong style={{ color: '#059669' }}>{t.batteryPct}%</strong> • Load: <strong>{t.payloadKg}kg</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grievance triage preview */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Priority Civic Grievances</h3>
              <button onClick={() => setAdminTab('grievances')} className="btn-ghost" style={{ fontSize: '0.8rem' }}>Manage →</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {grievances.slice(0, 3).map((g) => (
                <div key={g.id} style={{
                  padding: '0.85rem 1rem',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  borderLeft: g.priority === 'High' ? '4px solid #e11d48' : '4px solid #d97706'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{g.category}</span>
                    <span className={g.status === 'Resolved' ? 'badge badge-emerald' : 'badge badge-amber'}>{g.status}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {g.sector} • {g.timeAgo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Fleet Management */}
      {adminTab === 'fleet' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
            EV Collection Fleet Management & Live Telemetry
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            {fleet.map((t) => (
              <div key={t.id} className="glass-card-static" style={{ padding: '1.25rem', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d9488' }}>{t.id}</span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{t.vehicleNo}</h4>
                  </div>
                  <span className="badge badge-teal">{t.status}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                  <div>Driver: <strong style={{ color: '#0f172a' }}>{t.driver}</strong> ({t.phone})</div>
                  <div>Zone: <strong style={{ color: '#334155' }}>{t.zone}</strong></div>
                  <div>Current Payload: <strong style={{ color: '#d97706' }}>{t.payloadKg} kg / 4,000 kg</strong></div>
                </div>

                {/* Battery bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#64748b' }}>Battery Level</span>
                    <span style={{ fontWeight: 700, color: '#059669' }}>{t.batteryPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${t.batteryPct}%`, height: '100%', background: '#059669' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Grievance Triage */}
      {adminTab === 'grievances' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
              Citizen Grievances & Rapid Triage Command
            </h3>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {(['All', 'High', 'Medium', 'Low'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setGrievanceFilter(f)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.78rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: grievanceFilter === f ? '#ffe4e6' : '#f1f5f9',
                    color: grievanceFilter === f ? '#be123c' : '#64748b',
                    fontWeight: 600
                  }}
                >
                  {f} Priority
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filteredGrievances.map((g) => (
              <div key={g.id} style={{
                padding: '1.25rem',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', background: '#dcfce7', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
                      {g.id}
                    </span>
                    <span className={g.priority === 'High' ? 'badge badge-rose' : 'badge badge-amber'}>
                      {g.priority} Priority
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{g.timeAgo}</span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>
                    {g.category}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Location: <strong style={{ color: '#334155' }}>{g.sector}</strong> • Reported by: {g.reportedBy}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={g.status === 'Resolved' ? 'badge badge-emerald' : g.status === 'Assigned' ? 'badge badge-teal' : 'badge badge-amber'}>
                    {g.status}
                  </span>

                  {g.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolveGrievance(g.id)}
                      className="btn-eco"
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}
                    >
                      <CheckCircle2 size={14} />
                      <span>Mark Resolved</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Workforce */}
      {adminTab === 'workforce' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileSpreadsheet size={18} color="#0d9488" />
            <span>Workforce & User Directory</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            <div className="glass-card-static" style={{ padding: '1.25rem', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
              <div style={{ fontSize: '0.82rem', color: '#047857', fontWeight: 700 }}>Registered Citizens</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0.3rem 0' }}>14,290</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Active in past 30 days</div>
            </div>

            <div className="glass-card-static" style={{ padding: '1.25rem', border: '1px solid #99f6e4', background: '#f0fdfa' }}>
              <div style={{ fontSize: '0.82rem', color: '#0f766e', fontWeight: 700 }}>Verified Collectors</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0.3rem 0' }}>48 Drivers</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>12 EV trucks in rotation</div>
            </div>

            <div className="glass-card-static" style={{ padding: '1.25rem', border: '1px solid #ddd6fe', background: '#f5f3ff' }}>
              <div style={{ fontSize: '0.82rem', color: '#6d28d9', fontWeight: 700 }}>Municipal Supervisors</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0.3rem 0' }}>6 Officers</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>24/7 Command dispatch</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
