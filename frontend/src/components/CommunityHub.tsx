import React, { useState } from 'react';
import { 
  Users, 
  Trophy, 
  Calendar, 
  MapPin, 
  Flame, 
  PlusCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LeaderboardUser, CleanupEvent } from '../types';

interface CommunityHubProps {
  leaderboard: LeaderboardUser[];
  cleanups: CleanupEvent[];
  onToggleRsvp: (eventId: string) => void;
  onCreateEvent: (newEvent: CleanupEvent) => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({
  leaderboard,
  cleanups,
  onToggleRsvp,
  onCreateEvent
}) => {
  const [showHostModal, setShowHostModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('2026-09-18');
  const [eventTime, setEventTime] = useState('09:00 AM - 12:30 PM');
  const [eventTargetKg, setEventTargetKg] = useState(300);
  const [eventDesc, setEventDesc] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: CleanupEvent = {
      id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
      title: eventTitle,
      location: eventLocation,
      date: eventDate,
      time: eventTime,
      organizer: 'Alex Rivera (Community Host)',
      participantsCount: 1,
      targetKg: eventTargetKg,
      isUserRsvp: true,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      description: eventDesc || 'Local grassroots zero-waste community cleanup initiative.'
    };

    onCreateEvent(newEvent);
    setShowHostModal(false);
    confetti({ particleCount: 80, spread: 70 });
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Users size={16} />
            <span>Grassroots Eco Action</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
            Community Hub & Neighborhood Rankings
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Compete on circular leaderboards, RSVP to local beach & park cleanup drives, or mobilize your neighborhood.
          </p>
        </div>

        <button 
          onClick={() => setShowHostModal(true)}
          className="btn-primary"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            padding: '0.75rem 1.4rem'
          }}
        >
          <PlusCircle size={18} />
          <span>Host a Cleanup Drive</span>
        </button>
      </div>

      {/* Main Grid: Left Cleanups + Right Leaderboard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr',
        gap: '2rem'
      }}>
        {/* Left Column: Cleanup Events */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="#06b6d4" />
            <span>Active Community Cleanups ({cleanups.length})</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {cleanups.map((event) => (
              <div 
                key={event.id}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderLeft: event.isUserRsvp ? '4px solid #10b981' : '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <img 
                    src={event.image} 
                    alt={event.title}
                    style={{
                      width: '120px',
                      height: '95px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
                        {event.organizer}
                      </span>
                      {event.isUserRsvp && (
                        <span className="badge badge-emerald">✓ RSVP Confirmed</span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.4rem' }}>
                      {event.title}
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={13} color="#06b6d4" />
                        <span>{event.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={13} color="#fbbf24" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.45 }}>
                  {event.description}
                </p>

                {/* Footer RSVP & Volunteers counter */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <Users size={16} color="#34d399" />
                    <span><strong>{event.participantsCount} Eco-Warriors</strong> Joined</span>
                    <span style={{ color: '#64748b' }}>•</span>
                    <span style={{ color: '#06b6d4' }}>Target: {event.targetKg}kg</span>
                  </div>

                  <button
                    onClick={() => {
                      onToggleRsvp(event.id);
                      if (!event.isUserRsvp) {
                        confetti({ particleCount: 50, spread: 60 });
                      }
                    }}
                    className={event.isUserRsvp ? "btn-secondary" : "btn-primary"}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      borderRadius: '8px'
                    }}
                  >
                    {event.isUserRsvp ? 'Cancel RSVP' : 'Join & RSVP (+50 PTS)'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={18} color="#fbbf24" />
            <span>Monthly Circular Champions</span>
          </h3>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {leaderboard.map((user) => (
                <div 
                  key={user.rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    background: user.isCurrentUser ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: user.isCurrentUser ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Rank Badge */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      background: user.rank === 1 ? '#eab308' 
                        : user.rank === 2 ? '#94a3b8' 
                        : user.rank === 3 ? '#d97706' 
                        : 'rgba(255,255,255,0.08)',
                      color: user.rank <= 3 ? '#000' : '#cbd5e1'
                    }}>
                      {user.rank}
                    </div>

                    {/* Avatar & Name */}
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: user.isCurrentUser ? '#34d399' : '#f8fafc' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        {user.badge} • <span style={{ color: '#fb7185' }}><Flame size={10} style={{ display: 'inline' }} /> {user.streakDays}d streak</span>
                      </div>
                    </div>
                  </div>

                  {/* Points & Diverted Kg */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fbbf24' }}>
                      {user.points.toLocaleString()} <span style={{ fontSize: '0.7rem' }}>PTS</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {user.wasteDivertedKg} kg diverted
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Host Event Modal */}
      {showHostModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '560px',
            width: '100%',
            padding: '2rem',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.35)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                Organize a Community Cleanup
              </h3>
              <button onClick={() => setShowHostModal(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Cleanup Title
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Golden Gate Park Tree Well Plastic Pickup" 
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Location Meeting Point
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Conservatory of Flowers Main Entrance" 
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Date
                  </label>
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                    required 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Time
                  </label>
                  <input 
                    type="text" 
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                    required 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Target Waste (kg)
                </label>
                <input 
                  type="number" 
                  value={eventTargetKg}
                  onChange={(e) => setEventTargetKg(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Event Details & Preparation
                </label>
                <textarea 
                  rows={3}
                  placeholder="Bring gloves, reusable water bottles, and sturdy shoes. Trash bags provided."
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowHostModal(false)} className="btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
