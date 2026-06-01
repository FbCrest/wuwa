import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X, Home, Users } from 'lucide-react';

const NAV_BG = '#0a0a14';
const ACCENT = '#a5b4fc';

const NAV_ITEMS = [
  { id: 'home',       label: 'Home',       icon: Home  },
  { id: 'characters', label: 'Characters', icon: Users },
];

export default function Navbar({
  onNavigate,
  currentPage,
}: {
  onNavigate: (page: string) => void;
  currentPage: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full border-b"
        style={{
          background: 'rgba(10,10,20,0.92)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center h-14">

          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 mr-8 shrink-0 cursor-pointer"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a5b4fc)',
                boxShadow: '0 0 12px rgba(99,102,241,0.5)',
              }}
            >
              W
            </div>
            <span
              className="font-black text-sm tracking-widest hidden sm:block"
              style={{
                background: 'linear-gradient(90deg, #e2e8f0, #a5b4fc)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              WUTHERING
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || (item.id === 'home' && currentPage === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    color: isActive ? ACCENT : 'rgba(255,255,255,0.5)',
                    background: isActive ? 'rgba(165,180,252,0.1)' : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                    if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon size={15} />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: ACCENT }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <div className="ml-auto md:hidden">
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="p-2 rounded-lg text-white/50 hover:text-white/90 hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden sticky top-14 z-40 overflow-hidden border-b"
            style={{
              background: 'rgba(10,10,20,0.97)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                    style={{
                      color: isActive ? ACCENT : 'rgba(255,255,255,0.55)',
                      background: isActive ? 'rgba(165,180,252,0.1)' : 'transparent',
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
