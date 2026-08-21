import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import type { NavTab } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { AiScanner } from './components/AiScanner';
import { SmartBinsRadar } from './components/SmartBinsRadar';
import { PickupScheduler } from './components/PickupScheduler';
import { EcoRewards } from './components/EcoRewards';
import { CommunityHub } from './components/CommunityHub';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SortingDirectory } from './components/SortingDirectory';
import { NotificationToastContainer } from './components/NotificationToast';
import type { 
  SmartBin, 
  PickupRequest, 
  EcoReward, 
  LeaderboardUser, 
  CleanupEvent, 
  NotificationToast 
} from './types';
import { 
  INITIAL_SMART_BINS, 
  INITIAL_PICKUPS, 
  ECO_REWARDS, 
  LEADERBOARD_DATA, 
  CLEANUP_EVENTS 
} from './data/mockData';
import { Recycle, Leaf, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [ecoPoints, setEcoPoints] = useState<number>(() => {
    const saved = localStorage.getItem('wastewise_points');
    return saved ? parseInt(saved, 10) : 2450;
  });
  const [streakDays] = useState<number>(14);
  const [smartBins, setSmartBins] = useState<SmartBin[]>(INITIAL_SMART_BINS);
  const [pickups, setPickups] = useState<PickupRequest[]>(INITIAL_PICKUPS);
  const [rewards, setRewards] = useState<EcoReward[]>(ECO_REWARDS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(LEADERBOARD_DATA);
  const [cleanups, setCleanups] = useState<CleanupEvent[]>(CLEANUP_EVENTS);
  const [toasts, setToasts] = useState<NotificationToast[]>([]);
  const [showScannerModal, setShowScannerModal] = useState<boolean>(false);

  // Sync points to localStorage
  useEffect(() => {
    localStorage.setItem('wastewise_points', ecoPoints.toString());
  }, [ecoPoints]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newToast: NotificationToast = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleEarnPoints = (points: number, reason: string) => {
    setEcoPoints(prev => prev + points);
    // Update current user points on leaderboard
    setLeaderboard(prev => prev.map(u => u.isCurrentUser ? { ...u, points: u.points + points } : u));
    addToast('Eco-Points Credited! 🎉', `+${points} PTS added to your account for: ${reason}`, 'success');
  };

  const handleDispatchTruck = (binId: string) => {
    const targetBin = smartBins.find(b => b.id === binId);
    if (!targetBin) return;

    setSmartBins(prev => prev.map(b => b.id === binId ? { ...b, status: 'collecting' } : b));
    addToast('EV Truck Dispatched 🚚', `Autonomous electric collection truck routed to ${targetBin.name}.`, 'info');

    // Simulate collection completion after 3 seconds
    setTimeout(() => {
      setSmartBins(prev => prev.map(b => b.id === binId ? {
        ...b,
        fillPercentage: 12,
        status: 'optimal',
        lastEmptied: 'Just now',
        temperatureCelsius: 20,
        odorIndex: 'Low'
      } : b));
      addToast('Bin Emptied & Sanitized ✓', `${targetBin.name} has been cleared. Fill capacity restored.`, 'success');
    }, 3200);
  };

  const handleBookPickup = (newPickup: PickupRequest) => {
    setPickups(prev => [newPickup, ...prev]);
    setEcoPoints(prev => prev + newPickup.ecoPointsEarned);
    addToast('Pickup Scheduled! 📦', `Electric van reserved for ${newPickup.date} (${newPickup.timeSlot}). +${newPickup.ecoPointsEarned} PTS credited.`, 'success');
  };

  const handleRedeemReward = (reward: EcoReward): boolean => {
    if (ecoPoints < reward.costPoints) {
      addToast('Insufficient Points', `You need ${reward.costPoints - ecoPoints} more PTS to redeem this reward.`, 'warning');
      return false;
    }

    setEcoPoints(prev => prev - reward.costPoints);
    setRewards(prev => prev.map(r => r.id === reward.id ? { ...r, stockAvailable: Math.max(0, r.stockAvailable - 1) } : r));
    addToast('Reward Voucher Claimed! 🎁', `Successfully redeemed ${reward.title}. Check your coupon code.`, 'success');
    return true;
  };

  const handleToggleRsvp = (eventId: string) => {
    setCleanups(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const nextState = !evt.isUserRsvp;
        if (nextState) {
          handleEarnPoints(50, `RSVP to ${evt.title}`);
        } else {
          addToast('RSVP Cancelled', `Removed registration for ${evt.title}`, 'info');
        }
        return {
          ...evt,
          isUserRsvp: nextState,
          participantsCount: nextState ? evt.participantsCount + 1 : Math.max(1, evt.participantsCount - 1)
        };
      }
      return evt;
    }));
  };

  const handleCreateEvent = (newEvent: CleanupEvent) => {
    setCleanups(prev => [newEvent, ...prev]);
    handleEarnPoints(100, `Organized community cleanup: ${newEvent.title}`);
    addToast('Cleanup Event Published! 🌍', `Your community cleanup has been broadcasted to neighborhood eco-warriors.`, 'success');
  };

  const globalStats = {
    totalWasteDivertedKg: 14820 + Math.round((ecoPoints - 2450) * 0.4),
    totalCo2SavedKg: 9640 + Math.round((ecoPoints - 2450) * 0.28),
    activeBinsCount: smartBins.length,
    totalPointsDistributed: 184500 + ecoPoints
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top sticky navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ecoPoints={ecoPoints}
        streakDays={streakDays}
        onOpenScannerModal={() => setShowScannerModal(true)}
      />

      {/* Main container */}
      <main className="app-container" style={{ flex: 1 }}>
        {/* Floating Quick Scanner Modal */}
        {showScannerModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <div className="glass-card" style={{
              maxWidth: '960px',
              width: '100%',
              padding: '2rem',
              background: 'rgba(15, 23, 42, 0.98)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              maxHeight: '92vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Sparkles size={22} color="#10b981" />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Instant AI Waste Scanner</h3>
                </div>
                <button
                  onClick={() => setShowScannerModal(false)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <AiScanner 
                onEarnPoints={(pts, reason) => {
                  handleEarnPoints(pts, reason);
                }} 
              />
            </div>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <>
            <HeroBanner 
              onNavigate={setActiveTab}
              onOpenScanner={() => setShowScannerModal(true)}
              stats={globalStats}
            />

            {/* Quick Teaser Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginTop: '3rem' }}>
              {/* Teaser 1: AI Scanner */}
              <div>
                <AiScanner onEarnPoints={handleEarnPoints} />
              </div>

              {/* Teaser 2: IoT Smart Bins */}
              <div>
                <SmartBinsRadar bins={smartBins} onDispatchTruck={handleDispatchTruck} />
              </div>

              {/* Teaser 3: Pickups & Eco Rewards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                <div>
                  <PickupScheduler pickups={pickups.slice(0, 2)} onBookPickup={handleBookPickup} />
                </div>
                <div>
                  <CommunityHub 
                    leaderboard={leaderboard.slice(0, 5)} 
                    cleanups={cleanups.slice(0, 2)} 
                    onToggleRsvp={handleToggleRsvp}
                    onCreateEvent={handleCreateEvent}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'scanner' && (
          <AiScanner onEarnPoints={handleEarnPoints} />
        )}

        {activeTab === 'radar' && (
          <SmartBinsRadar bins={smartBins} onDispatchTruck={handleDispatchTruck} />
        )}

        {activeTab === 'pickups' && (
          <PickupScheduler pickups={pickups} onBookPickup={handleBookPickup} />
        )}

        {activeTab === 'rewards' && (
          <EcoRewards 
            ecoPoints={ecoPoints}
            rewards={rewards}
            onRedeemReward={handleRedeemReward}
          />
        )}

        {activeTab === 'community' && (
          <CommunityHub 
            leaderboard={leaderboard}
            cleanups={cleanups}
            onToggleRsvp={handleToggleRsvp}
            onCreateEvent={handleCreateEvent}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {activeTab === 'guide' && (
          <SortingDirectory />
        )}
      </main>

      {/* Global Notification Toast Container */}
      <NotificationToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Footer */}
      <footer style={{
        background: 'rgba(7, 12, 20, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '3rem 1.5rem 2rem 1.5rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Recycle size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                Waste<span className="gradient-text">Wise</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '320px' }}>
              Empowering cities and citizens with AI computer vision, IoT telemetry, and circular carbon rewards to eliminate urban landfill waste.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 700, marginBottom: '0.85rem' }}>Features</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#94a3b8' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('scanner')}>AI Neural Scanner</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('radar')}>IoT Bin Telemetry</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('pickups')}>Doorstep Logistics</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('rewards')}>Eco-Rewards Store</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 700, marginBottom: '0.85rem' }}>Ecosystem</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#94a3b8' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('community')}>Grassroots Cleanups</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('analytics')}>Carbon Ledger LCA</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('guide')}>Curbside Directory</span>
              <span>Municipal API Access</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 700, marginBottom: '0.85rem' }}>Pledge</h4>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '0.85rem',
              borderRadius: '10px',
              fontSize: '0.78rem',
              color: '#cbd5e1'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontWeight: 700, marginBottom: '0.3rem' }}>
                <Leaf size={14} /> 100% Circular Goal
              </div>
              Targeting zero net waste to municipal landfills by 2030 through automated telemetry.
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#64748b'
        }}>
          <div>
            © 2026 WasteWise Ecology Technologies Inc. Built with AI & Clean Tech.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Carbon Neutrality Certificate</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
