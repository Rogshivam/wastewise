import { useState } from 'react';
import type { FC } from 'react';
import { 
  Radio, 
  MapPin, 
  Thermometer, 
  Battery, 
  Wind, 
  Clock, 
  Truck, 
  Search 
} from 'lucide-react';
import type { SmartBin } from '../types';

interface SmartBinsRadarProps {
  bins: SmartBin[];
  onDispatchTruck: (binId: string) => void;
}

export const SmartBinsRadar: FC<SmartBinsRadarProps> = ({
  bins,
  onDispatchTruck
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const zones = ['All', 'Tech Park', 'Downtown Hub', 'Residential West', 'Harbor District', 'North District'];
  const wasteTypes = ['All', 'Plastic', 'Paper', 'Organic', 'E-Waste'];

  const filteredBins = bins.filter(bin => {
    const matchesZone = selectedZone === 'All' || bin.zone === selectedZone;
    const matchesType = selectedType === 'All' || bin.wasteType.toLowerCase().includes(selectedType.toLowerCase());
    const matchesSearch = bin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bin.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesType && matchesSearch;
  });

  const getFillColor = (pct: number) => {
    if (pct >= 85) return '#e11d48';
    if (pct >= 65) return '#d97706';
    return '#059669';
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0d9488', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Radio size={16} />
            <span>Urban IoT Mesh Network</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
            Smart Bins Telemetry & Fleet Radar
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Live sensor feeds monitoring ultrasonic volumetric capacity, ambient temperature, battery levels, and autonomous EV collection routes.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search bin by location or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem 0.6rem 2.4rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#0f172a',
              fontSize: '0.85rem'
            }}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Zone Filters */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {zones.map(zone => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: selectedZone === zone ? '2px solid #059669' : '1px solid #cbd5e1',
                background: selectedZone === zone ? '#dcfce7' : '#ffffff',
                color: selectedZone === zone ? '#047857' : '#475569',
                fontSize: '0.8rem',
                fontWeight: selectedZone === zone ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {zone}
            </button>
          ))}
        </div>

        <div style={{ width: '1px', height: '24px', background: '#cbd5e1' }} />

        {/* Type Filters */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {wasteTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: selectedType === type ? '2px solid #0d9488' : '1px solid #cbd5e1',
                background: selectedType === type ? '#ccfbf1' : '#ffffff',
                color: selectedType === type ? '#0f766e' : '#475569',
                fontSize: '0.8rem',
                fontWeight: selectedType === type ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Bins Grid */}
      <div className="grid-3">
        {filteredBins.map((bin) => {
          const isCritical = bin.fillPercentage >= 85;
          const isCollecting = bin.status === 'collecting';
          const fillColor = getFillColor(bin.fillPercentage);

          return (
            <div
              key={bin.id}
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${fillColor}`,
                position: 'relative'
              }}
            >
              <div>
                {/* Card Top: ID, Waste Type, Status Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                      {bin.id} • {bin.wasteType}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.1rem' }}>
                      {bin.name}
                    </h3>
                  </div>

                  <span className={
                    isCollecting ? "badge badge-teal" :
                    isCritical ? "badge badge-rose" :
                    bin.fillPercentage >= 65 ? "badge badge-amber" :
                    "badge badge-emerald"
                  }>
                    {isCollecting ? "🚚 Truck En Route" : isCritical ? "⚠️ Critical (Empty Now)" : "● Normal"}
                  </span>
                </div>

                {/* Location address */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                  <MapPin size={14} color="#0d9488" />
                  <span>{bin.location}</span>
                </div>

                {/* Fill Percentage Bar */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>Ultrasonic Capacity</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: fillColor }}>
                      {bin.fillPercentage}%
                    </span>
                  </div>

                  <div style={{
                    width: '100%',
                    height: '10px',
                    borderRadius: '999px',
                    background: '#f1f5f9',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${bin.fillPercentage}%`,
                      height: '100%',
                      background: fillColor,
                      borderRadius: '999px',
                      transition: 'width 0.8s ease-in-out'
                    }} />
                  </div>
                </div>

                {/* LoRaWAN Telemetry Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Thermometer size={14} color="#0d9488" />
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Temp</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{bin.temperatureCelsius}°C</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Battery size={14} color="#059669" />
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Battery</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{bin.batteryLevel}%</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Wind size={14} color="#d97706" />
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Odor</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{bin.odorIndex}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} />
                    <span>Emptied: {bin.lastEmptied}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDispatchTruck(bin.id)}
                  disabled={isCollecting}
                  className={isCollecting ? "btn-secondary" : isCritical ? "btn-primary" : "btn-secondary"}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    background: isCritical && !isCollecting ? 'linear-gradient(135deg, #e11d48, #be123c)' : undefined,
                    color: isCritical && !isCollecting ? '#ffffff' : undefined,
                    cursor: isCollecting ? 'default' : 'pointer'
                  }}
                >
                  <Truck size={16} />
                  <span>{isCollecting ? "EV Truck Dispatched..." : isCritical ? "Dispatch Urgent EV Collector" : "Schedule Route Pickup"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
