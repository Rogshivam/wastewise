import React, { useState } from 'react';
import { 
  Truck, 
  Calendar, 
  Clock, 
  MapPin, 
  Coins, 
  Package, 
  User, 
  PlusCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PickupRequest, PickupStatus } from '../types';

interface PickupSchedulerProps {
  pickups: PickupRequest[];
  onBookPickup: (newPickup: PickupRequest) => void;
}

export const PickupScheduler: React.FC<PickupSchedulerProps> = ({ pickups, onBookPickup }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [category, setCategory] = useState('Electronics & Appliances');
  const [date, setDate] = useState('2026-08-25');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [weightKg, setWeightKg] = useState<number>(15);
  const [address, setAddress] = useState('742 Evergreen Terrace, Apt 4B');
  const [specialNotes, setSpecialNotes] = useState('');

  const calculatedPoints = Math.round(weightKg * 10.5);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: PickupRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      date,
      timeSlot,
      estimatedWeightKg: Number(weightKg),
      address,
      specialNotes,
      status: 'Scheduled',
      driverName: 'Liam O\'Connor',
      driverPhone: '+1 (555) 749-0192',
      ecoPointsEarned: calculatedPoints,
      createdAt: 'Just now'
    };

    onBookPickup(newRequest);
    setShowBookingModal(false);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const getStatusBadge = (status: PickupStatus) => {
    switch (status) {
      case 'Collected': return <span className="badge badge-emerald">✓ Collected & Recycled</span>;
      case 'En Route': return <span className="badge badge-cyan">🚚 Driver En Route</span>;
      case 'Driver Assigned': return <span className="badge badge-violet">👤 Driver Assigned</span>;
      default: return <span className="badge badge-amber">⏳ Scheduled</span>;
    }
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Truck size={16} />
            <span>Zero-Emission Doorstep Logistics</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
            Smart Pickup & Bulk Waste Booking
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Schedule on-demand doorstep collection for electronics, bulky cardboard, compost, or hazardous materials.
          </p>
        </div>

        <button 
          onClick={() => setShowBookingModal(true)}
          className="btn-primary"
          style={{ padding: '0.75rem 1.4rem' }}
        >
          <PlusCircle size={18} />
          <span>Book Doorstep Pickup</span>
        </button>
      </div>

      {/* Booking Modal / Embedded Form */}
      {showBookingModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '600px',
            width: '100%',
            padding: '2rem',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Schedule Eco-Pickup</h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Electric van dispatch straight to your doorstep</p>
              </div>
              <button 
                onClick={() => setShowBookingModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Category */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                  Waste Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    outline: 'none'
                  }}
                >
                  <option value="Electronics & Appliances">Electronics & E-Waste Appliances</option>
                  <option value="Bulk Cardboard & Packaging">Bulk Corrugated Cardboard & Moving Boxes</option>
                  <option value="Organic Biomass & Yard Waste">Organic Green Waste & Lawn Trimmings</option>
                  <option value="Hazardous Paint & Chemicals">Hazardous Paints, Solvents & Batteries</option>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                    Pickup Date
                  </label>
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      background: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      background: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      outline: 'none'
                    }}
                  >
                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
                    Estimated Weight (kg)
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>{weightKg} kg</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="100" 
                  value={weightKg} 
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                />
              </div>

              {/* Address */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                  Pickup Address
                </label>
                <input 
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                  Special Instructions (Optional)
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Ring Apt 4B doorbell, left beside garage gate"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Estimated Reward Preview */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Coins size={16} />
                  <span>Estimated Reward Credits</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fef08a' }}>
                  +{calculatedPoints} PTS
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowBookingModal(false)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  Confirm & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pickups Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {pickups.map((pickup) => (
          <div 
            key={pickup.id}
            className="glass-card"
            style={{
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr',
              gap: '1.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left: Request Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {pickup.id}
                </span>
                {getStatusBadge(pickup.status)}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
                {pickup.category}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                <MapPin size={13} color="#06b6d4" />
                <span>{pickup.address}</span>
              </div>
              {pickup.specialNotes && (
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem', fontStyle: 'italic' }}>
                  "{pickup.specialNotes}"
                </p>
              )}
            </div>

            {/* Middle: Date, Time & Driver info */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '0.9rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
                <Calendar size={14} color="#10b981" />
                <span>{pickup.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
                <Clock size={14} color="#06b6d4" />
                <span>{pickup.timeSlot}</span>
              </div>
              {pickup.driverName && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', marginTop: '0.2rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <User size={14} color="#fbbf24" />
                  <span>Driver: <strong style={{ color: '#f8fafc' }}>{pickup.driverName}</strong></span>
                </div>
              )}
            </div>

            {/* Right: Weight & Eco Points */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <Package size={15} />
                <span>Est. Weight: <strong style={{ color: '#f8fafc' }}>{pickup.estimatedWeightKg} kg</strong></span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#fbbf24',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                <Coins size={16} />
                <span>+{pickup.ecoPointsEarned} PTS Credited</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
