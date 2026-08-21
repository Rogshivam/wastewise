import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { 
  Users, 
  Trophy, 
  Flame, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Sparkles, 
  Heart 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LeaderboardUser, CleanupEvent } from '../types';

interface CommunityHubProps {
  leaderboard: LeaderboardUser[];
  cleanups: CleanupEvent[];
  onToggleRsvp: (eventId: string) => void;
  onCreateEvent: (event: CleanupEvent) => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({
  leaderboard,
  cleanups,
  onToggleRsvp,
  onCreateEvent
}) => {
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('2026-08-28');
  const [time] = useState<string>('09:00 AM - 12:00 PM');
  const [description, setDescription] = useState<string>('');
  const [targetKg, setTargetKg] = useState<number>(300);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvt: CleanupEvent = {
      id: `EVT-${Date.now()}`,
      title,
      location,
      date,
      time,
      description,
      participantsCount: 1,
      targetKg,
      isUserRsvp: true,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      organizer: 'Alex Rivera (You)'
    };
    onCreateEvent(newEvt);
    setShowEventModal(false);
    confetti({ particleCount: 70, spread: 70 });
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Users size={16} />
            <span>Grassroots Civic Collaboration</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
            Community Hub & Leaderboards
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Compete with neighborhood recycling champions and join weekend community beach and park restoration drives.
          </p>
        </div>

        <button
          onClick={() => setShowEventModal(true)}
          className="btn-eco"
          style={{ padding: '0.65rem 1.35rem', borderRadius: '12px' }}
        >
          <Plus size={18} />
          <span>Host a Neighborhood Cleanup</span>
        </button>
      </div>

      {/* Main Grid: Leaderboard (Left) + Cleanups (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem' }}>
        {/* Left: Neighborhood Leaderboard */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={20} color="#d97706" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Top Circular Champions</h3>
            </div>
            <span className="badge badge-amber">August Season</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {leaderboard.map((user) => (
              <div
                key={user.rank + user.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  background: user.isCurrentUser ? '#ecfdf5' : '#f8fafc',
                  border: user.isCurrentUser ? '2px solid #059669' : '1px solid #e2e8f0'
                }}
              >
                {/* Rank & Avatar & Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: user.rank === 1 ? '#fef3c7' : user.rank === 2 ? '#f1f5f9' : user.rank === 3 ? '#ffedd5' : '#f8fafc',
                    color: user.rank === 1 ? '#b45309' : user.rank === 2 ? '#475569' : user.rank === 3 ? '#9a3412' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.82rem'
                  }}>
                    {user.rank}
                  </div>

                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>{user.name}</span>
                      {user.isCurrentUser && <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>You</span>}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {user.wasteDivertedKg} kg diverted • {user.badge}
                    </div>
                  </div>
                </div>

                {/* Points & Streak */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#b45309' }}>
                    {user.points.toLocaleString()} PTS
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.2rem', fontSize: '0.72rem', color: '#be123c', fontWeight: 600 }}>
                    <Flame size={12} color="#e11d48" />
                    <span>{user.streakDays}d streak</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Cleanup Drives */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={20} color="#059669" />
              <span>Upcoming Neighborhood Drives</span>
            </h3>
            <span className="badge badge-emerald">+50 PTS RSVP Bonus</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cleanups.map((evt) => (
              <div key={evt.id} className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #059669' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                    {evt.title}
                  </h4>
                  <span className="badge badge-teal">
                    Target: {evt.targetKg} kg
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {evt.description}
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} color="#059669" />
                    <span>{evt.date} ({evt.time})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} color="#0d9488" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    <strong style={{ color: '#059669' }}>{evt.participantsCount} Eco-Warriors</strong> registered
                  </div>

                  <button
                    onClick={() => onToggleRsvp(evt.id)}
                    className={evt.isUserRsvp ? "btn-secondary" : "btn-eco"}
                    style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', borderRadius: '8px' }}
                  >
                    {evt.isUserRsvp ? (
                      <>
                        <CheckCircle2 size={16} color="#059669" />
                        <span>Attending (RSVP'd ✓)</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Join Event (+50 PTS)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Host Event Modal */}
      {showEventModal && (
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
            maxWidth: '520px',
            width: '100%',
            padding: '2rem',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Organize Civic Cleanup</h3>
              <button onClick={() => setShowEventModal(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Drive Title</label>
                <input
                  type="text"
                  placeholder="e.g. Yamuna Riverbank Plastic Sweep"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Meeting Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Mayur Vihar Gate No 3"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Target Goal (kg)</label>
                  <input
                    type="number"
                    value={targetKg}
                    onChange={(e) => setTargetKg(parseInt(e.target.value, 10))}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Brief Description & Equipment</label>
                <textarea
                  rows={3}
                  placeholder="We will provide compostable bags and gloves..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', resize: 'none', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <button type="submit" className="btn-eco" style={{ padding: '0.8rem', borderRadius: '12px', marginTop: '0.5rem' }}>
                <Sparkles size={18} />
                <span>Publish Drive (+100 Organizer PTS)</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
