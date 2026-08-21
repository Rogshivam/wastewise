import React, { useState } from 'react';
import { 
  Radio, 
  Battery, 
  Thermometer, 
  Wind, 
  Truck, 
  MapPin, 
  RefreshCw, 
  Search, 
  Filter, 
  Layers
} from 'lucide-react';
import type { SmartBin, BinStatus } from '../types';

interface SmartBinsRadarProps {
  bins: SmartBin[];
  onDispatchTruck: (binId: string) => void;
}

export const SmartBinsRadar: React.FC<SmartBinsRadarProps> = ({ bins, onDispatchTruck }) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const zones = ['All', 'Tech Park', 'Downtown Hub', 'Residential West', 'Harbor District', 'North District'];
  const wasteTypes = ['All', 'Plastic & Cans', 'Paper & Cardboard', 'Organic Food', 'E-Waste', 'Mixed Municipal'];

  const filteredBins = bins.filter(bin => {
    const matchesZone = selectedZone === 'All' || bin.zone === selectedZone;
    const matchesType = selectedType === 'All' || bin.wasteType === selectedType;
    const matchesSearch = bin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bin.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesType && matchesSearch;
  });

  const getStatusColor = (status: BinStatus, fillPercentage: number) => {
    if (status === 'collecting') return '#38bdf8';
    if (fillPercentage >= 85) return '#f43f5e';
    if (fillPercentage >= 60) return '#f59e0b';
    return '#10b981';
  };

  const getFillLevelBadge = (fill: number) => {
    if (fill >= 85) return <span className="badge badge-rose">Critical {fill}%</span>;
    if (fill >= 60) return <span className="badge badge-amber">Moderate {fill}%</span>;
    return <span className="badge badge-emerald">Normal {fill}%</span>;
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22d3ee', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Radio size={16} className="animate-pulse-glow" />
            <span>Smart City Mesh Telemetry</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
            IoT Smart Bin Radar & Fleet Dispatch
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Live LoRaWAN telemetry tracking ultrasonic volumetric levels, ambient temperature, and automated EV truck collection routes.
          </p>
        </div>

        {/* Live Network Health Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(15, 23, 42, 0.7)',
          padding: '0.5rem 1rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#34d399' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span>6/6 Nodes Online</span>
          </div>
          <div style={{ height: '14px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Mesh Latency: <strong style={{ color: '#f8fafc' }}>18ms</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="glass-card" style={{
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '0.5rem 0.85rem',
          minWidth: '260px'
        }}>
          <Search size={16} color="#94a3b8" />
          <input 
            type="text"
            placeholder="Search bin name or street location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '0.85rem',
              width: '100%'
            }}
          />
        </div>

        {/* Zone Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={14} /> Zone:
          </span>
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: selectedZone === zone ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedZone === zone ? '#22d3ee' : '#94a3b8',
                borderBottom: selectedZone === zone ? '2px solid #06b6d4' : '2px solid transparent',
                fontWeight: selectedZone === zone ? 600 : 500,
                transition: 'all 0.2s'
              }}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Waste Type Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={14} /> Type:
          </span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              background: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.35rem 0.75rem',
              color: '#f8fafc',
              fontSize: '0.8rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {wasteTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Smart Bins Grid */}
      <div className="grid-3">
        {filteredBins.map((bin) => {
          const isCritical = bin.fillPercentage >= 85;
          const isCollecting = bin.status === 'collecting';
          const fillBarColor = getStatusColor(bin.status, bin.fillPercentage);

          return (
            <div 
              key={bin.id} 
              className="glass-card" 
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `3px solid ${fillBarColor}`,
                position: 'relative'
              }}
            >
              <div>
                {/* Card Top Row: Zone & Fill Level Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} color="#06b6d4" />
                    {bin.zone}
                  </span>
                  {getFillLevelBadge(bin.fillPercentage)}
                </div>

                {/* Bin Name & Waste Type */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
                  {bin.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                  {bin.location}
                </p>

                {/* Waste Category Tag */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#cbd5e1',
                  marginBottom: '1.25rem'
                }}>
                  <Layers size={13} color="#10b981" />
                  <span>{bin.wasteType}</span>
                </div>

                {/* Fill Level Visual Meter */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#94a3b8' }}>Fill Level Capacity</span>
                    <span style={{ fontWeight: 700, color: fillBarColor }}>{bin.fillPercentage}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${bin.fillPercentage}%`,
                      height: '100%',
                      background: fillBarColor,
                      boxShadow: `0 0 10px ${fillBarColor}`,
                      transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                  </div>
                </div>

                {/* Telemetry Sensor Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  fontSize: '0.75rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94a3b8' }}>
                    <Thermometer size={14} color="#06b6d4" />
                    <span>{bin.temperatureCelsius}°C</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10b981' }}>
                    <Battery size={14} color="#10b981" />
                    <span>{bin.batteryLevel}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94a3b8' }}>
                    <Wind size={14} color={bin.odorIndex === 'High' ? '#f43f5e' : '#34d399'} />
                    <span>Odor: {bin.odorIndex}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Dispatch Collection Truck */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onDispatchTruck(bin.id)}
                  disabled={isCollecting || bin.fillPercentage < 20}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.85rem',
                    fontSize: '0.8rem',
                    borderRadius: '8px',
                    background: isCollecting 
                      ? 'rgba(6, 182, 212, 0.2)' 
                      : isCritical 
                      ? 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' 
                      : 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: '#ffffff',
                    boxShadow: isCritical ? '0 4px 15px rgba(244, 63, 94, 0.35)' : undefined
                  }}
                >
                  {isCollecting ? (
                    <>
                      <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
                      <span>Truck En Route...</span>
                    </>
                  ) : (
                    <>
                      <Truck size={14} />
                      <span>{isCritical ? 'Dispatch Urgently' : 'Dispatch Emptying'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
