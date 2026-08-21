import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, Bell, Trophy, Camera, ShieldCheck, Truck, Users, Gift, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isLoggedIn: boolean;
  userRole: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, userRole, onLoginClick, onLogout }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dashboardsOpen, setDashboardsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    if (isHome) {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: target } });
    }
  };

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-eco-teal flex items-center justify-center shadow-md">
            <span className="text-primary-foreground font-bold text-sm">W</span>
          </div>
          <span className="font-bold text-lg text-foreground">WasteWise AI</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/classifier" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" /> AI Classifier
          </Link>
          
          {/* Dashboards Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDashboardsOpen(!dashboardsOpen)}
              onMouseEnter={() => setDashboardsOpen(true)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Dashboards ▾
            </button>
            <AnimatePresence>
              {dashboardsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 6 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 6 }} 
                  onMouseLeave={() => setDashboardsOpen(false)}
                  className="absolute left-0 top-8 w-52 glass-card-static p-2 z-50 shadow-xl border border-gray-200"
                >
                  <Link to="/dashboard/citizen" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setDashboardsOpen(false)}>
                    <User className="w-4 h-4 text-emerald-600" /> Citizen Portal
                  </Link>
                  <Link to="/dashboard/collector" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setDashboardsOpen(false)}>
                    <Truck className="w-4 h-4 text-teal-600" /> Collector Portal
                  </Link>
                  <Link to="/dashboard/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setDashboardsOpen(false)}>
                    <ShieldCheck className="w-4 h-4 text-purple-600" /> Admin Command
                  </Link>
                  <Link to="/tracking" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setDashboardsOpen(false)}>
                    <Radio className="w-4 h-4 text-amber-600" /> Live GPS Fleet
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/rewards" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Gift className="w-3.5 h-3.5" /> Rewards
          </Link>
          <Link to="/community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> Community
          </Link>
          <Link to="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> Leaderboard
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-accent transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-eco-teal flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground capitalize">{userRole}</span>
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-12 w-48 glass-card-static p-2 z-50">
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setProfileOpen(false)}>
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <Link to="/dashboard/citizen" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setProfileOpen(false)}>
                      <Settings className="w-4 h-4" /> Citizen Dashboard
                    </Link>
                    <Link to="/dashboard/collector" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setProfileOpen(false)}>
                      <Truck className="w-4 h-4" /> Collector Portal
                    </Link>
                    <Link to="/dashboard/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setProfileOpen(false)}>
                      <ShieldCheck className="w-4 h-4" /> Admin Console
                    </Link>
                    <Link to="/leaderboard" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setProfileOpen(false)}>
                      <Trophy className="w-4 h-4" /> Leaderboard
                    </Link>
                    <Link to="/tracking" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors" onClick={() => setProfileOpen(false)}>
                      <Bell className="w-4 h-4" /> Live Tracking
                    </Link>
                    <button onClick={() => { onLogout(); setProfileOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm text-eco-rose hover:bg-accent rounded-lg transition-colors w-full">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/classifier" className="btn-eco text-sm">
                Scan Waste
              </Link>
              <button onClick={onLoginClick} className="btn-eco-outline text-sm">
                Login
              </button>
            </div>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden mt-3 pb-4 flex flex-col gap-2">
            <button onClick={() => handleNavClick("hero")} className="px-4 py-2 text-sm text-left text-foreground hover:bg-accent rounded-lg">Home</button>
            <Link to="/classifier" className="px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>AI Classifier</Link>
            <Link to="/dashboard/citizen" className="px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>Citizen Portal</Link>
            <Link to="/dashboard/collector" className="px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>Collector Portal</Link>
            <Link to="/dashboard/admin" className="px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>Admin Command</Link>
            <Link to="/tracking" className="px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>Live GPS Fleet</Link>
            <Link to="/community" className="px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>Community</Link>
            <Link to="/rewards" className="px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>Rewards</Link>
            <Link to="/leaderboard" className="px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>Leaderboard</Link>

            {!isLoggedIn && <button onClick={() => { onLoginClick(); setMobileOpen(false); }} className="btn-eco text-sm mx-4">Login</button>}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
