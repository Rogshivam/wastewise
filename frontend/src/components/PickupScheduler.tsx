import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  Weight, 
  Coins, 
  Sparkles, 
  Plus 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PickupRequest } from '../types';

interface PickupSchedulerProps {
  pickups: PickupRequest[];
  onBookPickup: (pickup: PickupRequest) => void;
}

export const PickupScheduler: React.FC<PickupSchedulerProps> = ({
  pickups,
  onBookPickup
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [wasteType, setWasteType] = useState<string>('E-Waste & Small Appliances');
  const [estimatedWeightKg, setEstimatedWeightKg] = useState<number>(15);
  const [pickupDate, setPickupDate] = useState<string>('2026-08-23');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 01:00 PM');
  const [address, setAddress] = useState<string>('Flat 402, Green Valley Enclave, Sector 9');

  const estimatedPoints = estimatedWeightKg * 15;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPickup: PickupRequest = {
      id: `PU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: wasteType,
      estimatedWeightKg,
      date: pickupDate,
      timeSlot,
      status: 'Scheduled',
      address,
      ecoPointsEarned: estimatedPoints,
      createdAt: 'Just now'
    };

    onBookPickup(newPickup);
    setShowModal(false);
    confetti({
      particleCount: 60,
      spread: 60
    });
  };

  const getStatusBadge = (status: PickupRequest['status']) => {
    switch (status) {
      case 'Scheduled':
        return <span className="badge badge-amber">🕒 Scheduled</span>;
      case 'Driver Assigned':
        return <span className="badge badge-purple">🚚 Driver Assigned</span>;
      case 'En Route':
        return <span className="badge badge-teal">⚡ En Route</span>;
      case 'Collected':
        return <span className="badge badge-emerald">✓ Collected</span>;
    }
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Truck size={16} />
            <span>Zero-Emission Doorstep Logistics</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
            Doorstep Collection & E-Waste Pickup
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Book scheduled doorstep collection for bulky household recyclables, outdated electronics, or yard organics and earn verified Eco-Credits.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-eco"
          style={{ padding: '0.65rem 1.35rem', borderRadius: '12px' }}
        >
          <Plus size={18} />
          <span>Book New Doorstep Pickup</span>
        </button>
      </div>

      {/* Active Pickups List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {pickups.map((pickup) => (
          <div
            key={pickup.id}
            className="glass-card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            {/* Left: Type, ID, Address */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#dcfce7',
                border: '1px solid #bbf7d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#047857',
                flexShrink: 0
              }}>
                <Truck size={24} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', background: '#dcfce7', padding: '0.1rem 0.45rem', borderRadius: '6px' }}>
                    {pickup.id}
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    {pickup.category}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
                  <MapPin size={14} color="#059669" />
                  <span>{pickup.address}</span>
                </div>
              </div>
            </div>

            {/* Middle: Date, Time Slot, Weight */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: '#0f172a', fontWeight: 600 }}>
                  <Calendar size={14} color="#059669" />
                  <span>{pickup.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>
                  <Clock size={12} />
                  <span>{pickup.timeSlot}</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: '#0f172a', fontWeight: 600 }}>
                  <Weight size={14} color="#0d9488" />
                  <span>~{pickup.estimatedWeightKg} kg load</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#d97706', fontWeight: 700, marginTop: '0.15rem' }}>
                  <Coins size={12} />
                  <span>+{pickup.ecoPointsEarned} PTS</span>
                </div>
              </div>
            </div>

            {/* Right: Status & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {getStatusBadge(pickup.status)}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showModal && (
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
            maxWidth: '540px',
            width: '100%',
            padding: '2rem',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} color="#059669" />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Schedule EV Doorstep Pickup</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Category */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                  Waste Stream
                </label>
                <select
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                >
                  <option value="E-Waste & Small Appliances">Electronics & Small Appliances (E-Waste)</option>
                  <option value="Discarded Wood & Bulk Furniture">Discarded Wood & Bulk Furniture</option>
                  <option value="Organic Yard & Garden Trims">Garden Trim & Green Waste</option>
                  <option value="Clean Rigid Plastics & PET Bales">Clean Rigid Plastics & PET Bales</option>
                </select>
              </div>

              {/* Weight Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>Estimated Weight</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>{estimatedWeightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={estimatedWeightKg}
                  onChange={(e) => setEstimatedWeightKg(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#059669' }}
                />
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                  >
                    <option value="08:00 AM - 11:00 AM">08:00 AM - 11:00 AM</option>
                    <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                    <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                    <option value="05:00 PM - 08:00 PM">05:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                  Doorstep Pickup Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                  required
                />
              </div>

              {/* Reward Projection */}
              <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '0.85rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#854d0e', fontWeight: 600 }}>Estimated Reward Credits:</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Coins size={16} /> +{estimatedPoints} PTS
                </span>
              </div>

              <button type="submit" className="btn-eco" style={{ padding: '0.8rem', borderRadius: '12px', marginTop: '0.5rem' }}>
                <Sparkles size={18} />
                <span>Confirm EV Collection Booking</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
