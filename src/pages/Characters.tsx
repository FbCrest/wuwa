import { useState, useMemo, ReactNode, Key, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { Character, Element, Rarity, WeaponType } from '../types';
import { charactersData } from '../data/characters';
import CharacterModal from '../components/CharacterModal';

// ── Element config ──────────────────────────────────────────────
const ELEMENTS: { key: Element; label: string; color: string; bg: string; icon: string; img: string }[] = [
  { key: 'Glacio',  label: 'Glacio',  color: '#7dd3fc', bg: 'rgba(125,211,252,0.15)', icon: '❄', img: '/images/Element/Glacio.png'  },
  { key: 'Fusion',  label: 'Fusion',  color: '#fb923c', bg: 'rgba(251,146,60,0.15)',  icon: '🔥', img: '/images/Element/Fusion.png'  },
  { key: 'Electro', label: 'Electro', color: '#c084fc', bg: 'rgba(192,132,252,0.15)', icon: '⚡', img: '/images/Element/Electro.png' },
  { key: 'Aero',    label: 'Aero',    color: '#86efac', bg: 'rgba(134,239,172,0.15)', icon: '🌀', img: '/images/Element/Aero.png'    },
  { key: 'Spectro', label: 'Spectro', color: '#fde68a', bg: 'rgba(253,230,138,0.15)', icon: '✨', img: '/images/Element/Spectro.png' },
  { key: 'Havoc',   label: 'Havoc',   color: '#f472b6', bg: 'rgba(244,114,182,0.15)', icon: '💀', img: '/images/Element/Havoc.png'   },
];

const ELEMENT_MAP = Object.fromEntries(ELEMENTS.map(e => [e.key, e]));

// ── Weapon config ───────────────────────────────────────────────
const WEAPONS: { key: WeaponType; label: string; icon: string; img: string }[] = [
  { key: 'Sword',      label: 'Sword',      icon: '🗡', img: '/images/Weapons/Sword.png'      },
  { key: 'Broadblade', label: 'Broadblade', icon: '⚔', img: '/images/Weapons/Broadblade.png' },
  { key: 'Pistols',    label: 'Pistols',    icon: '🔫', img: '/images/Weapons/Pistols.png'    },
  { key: 'Gauntlets',  label: 'Gauntlets',  icon: '🥊', img: '/images/Weapons/Gauntlets.png'  },
  { key: 'Rectifier',  label: 'Rectifier',  icon: '📡', img: '/images/Weapons/Rectifier.png'  },
];

const WEAPON_MAP = Object.fromEntries(WEAPONS.map(w => [w.key, w]));

// ── Star renderer ───────────────────────────────────────────────
function Stars({ count, rarity }: { count: Rarity; rarity: Rarity }) {
  const color = rarity === 5 ? '#f59e0b' : '#a78bfa';
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ── Element badge ───────────────────────────────────────────────
function ElementBadge({ element }: { element: Element }) {
  const cfg = ELEMENT_MAP[element];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}50` }}
    >
      <img src={cfg.img} alt={element} className="w-3.5 h-3.5 object-contain" />
      {cfg.label}
    </span>
  );
}

// ── Element RGB map (cho CSS custom property) ──────────────────
const ELEMENT_RGB: Record<Element, string> = {
  Glacio:  '125,211,252',
  Fusion:  '251,146,60',
  Electro: '192,132,252',
  Aero:    '134,239,172',
  Spectro: '253,230,138',
  Havoc:   '244,114,182',
};

// ── Character Card ──────────────────────────────────────────────
function CharacterCard({ char, index, onClick }: { key?: Key; char: Character; index: number; onClick: () => void }) {
  const el = ELEMENT_MAP[char.element];
  const wp = WEAPON_MAP[char.weapon];
  const rgb = ELEMENT_RGB[char.element];
  const rarityBorder = char.rarity === 5 ? '#f59e0b' : '#a78bfa';
  const rarityGlow   = char.rarity === 5 ? 'rgba(245,158,11,0.25)' : 'rgba(167,139,250,0.25)';

  return (
    // Wrapper ngoài: div thuần — CSS hover transform hoạt động tự do
    <div
      className="char-card-hover relative cursor-pointer rounded-2xl"
      style={{ '--card-rgb': rgb } as CSSProperties}
      onClick={onClick}
    >
      {/* Fade-in animation chỉ dùng opacity, không dùng transform để tránh conflict */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.7), ease: 'easeOut' }}
        className="contents"
      >
      {/* ── Inner card (target của CSS hover selector) ── */}
      <div
        className="char-card-inner relative flex flex-col rounded-2xl border overflow-hidden"
        style={{
          background: '#1a1a2e',
          borderColor: 'rgba(255,255,255,0.07)',
          boxShadow: `0 4px 24px rgba(0,0,0,0.55)`,
          padding: '20px 16px 18px',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Gradient overlay theo màu hệ — fade in khi hover */}
        <div
          className="char-card-overlay absolute inset-0 pointer-events-none z-0"
          style={{
            background: `linear-gradient(135deg, rgba(${rgb},0.12) 0%, rgba(${rgb},0.05) 100%)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Rarity shimmer top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-10"
          style={{ background: `linear-gradient(90deg, transparent, ${rarityBorder}90, transparent)` }}
        />

        {/* NEW badge */}
        {char.isNew && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white tracking-wider shadow-lg">
              NEW
            </span>
          </div>
        )}

        {/* ── Avatar area ── */}
        <div className="relative flex justify-center items-center mb-4 z-10">

          {/* Element icon — top left */}
          <div
            className="absolute z-10 rounded-full flex items-center justify-center shadow-xl"
            style={{
              width: '34px', height: '34px',
              top: '-6px', left: '-8px',
              background: el.bg,
              border: `2px solid ${el.color}90`,
              boxShadow: `0 0 12px ${el.color}55`,
            }}
            title={el.label}
          >
            <img src={el.img} alt={el.label} className="w-5 h-5 object-contain" />
          </div>

          {/* Weapon icon — top right */}
          <div
            className="absolute z-10 rounded-full flex items-center justify-center shadow-xl"
            style={{
              width: '34px', height: '34px',
              top: '-6px', right: '-8px',
              background: 'rgba(20,20,38,0.95)',
              border: '2px solid rgba(255,255,255,0.18)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
            title={wp.label}
          >
            <img src={wp.img} alt={wp.label} className="w-5 h-5 object-contain" style={{ filter: 'brightness(0.9) contrast(1.1)' }} />
          </div>

          {/* Circular avatar */}
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: '120px', height: '120px',
              border: `3px solid ${rarityBorder}`,
              boxShadow: `0 0 0 1px ${rarityBorder}30, 0 6px 24px ${rarityGlow}`,
            }}
          >
            <img
              src={char.imageUrl}
              alt={char.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={(e) => {
                const t = e.currentTarget;
                t.onerror = null;
                t.src = `https://placehold.co/120x120/1a1a2e/ffffff?text=${encodeURIComponent(char.name[0])}`;
              }}
            />
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: 'inset 0 -20px 30px rgba(0,0,0,0.4)' }}
            />
          </div>
        </div>

        {/* ── Info ── */}
        <div className="relative text-center z-10">
          <h3 className="text-white font-bold text-base truncate mb-2">{char.name}</h3>
          <Stars count={char.rarity} rarity={char.rarity} />
        </div>
      </div>
      </motion.div>
    </div>
  );
}

// ── Filter pill ─────────────────────────────────────────────────
function FilterPill({
  active, onClick, children, color,
}: {
  key?: Key; active: boolean; onClick: () => void; children: ReactNode; color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none"
      style={{
        background: active ? (color ? `${color}25` : 'rgba(255,255,255,0.15)') : 'rgba(255,255,255,0.05)',
        border: `1px solid ${active ? (color || 'rgba(255,255,255,0.6)') : 'rgba(255,255,255,0.1)'}`,
        color: active ? (color || 'white') : 'rgba(255,255,255,0.45)',
        boxShadow: active ? `0 0 12px ${color ? color + '40' : 'rgba(255,255,255,0.2)'}` : 'none',
      }}
    >
      {children}
    </button>
  );
}

// ── Main page ───────────────────────────────────────────────────
export default function Characters() {
  const [search, setSearch] = useState('');
  const [activeElements, setActiveElements] = useState<Set<Element>>(new Set());
  const [activeRarity, setActiveRarity] = useState<Rarity | null>(null);
  const [activeWeapon, setActiveWeapon] = useState<WeaponType | null>(null);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  const toggleElement = (el: Element) => {
    setActiveElements(prev => {
      const next = new Set(prev);
      next.has(el) ? next.delete(el) : next.add(el);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return charactersData.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeElements.size > 0 && !activeElements.has(c.element)) return false;
      if (activeRarity !== null && c.rarity !== activeRarity) return false;
      if (activeWeapon !== null && c.weapon !== activeWeapon) return false;
      return true;
    });
  }, [search, activeElements, activeRarity, activeWeapon]);

  const hasFilters = search || activeElements.size > 0 || activeRarity !== null || activeWeapon !== null;

  const clearAll = () => {
    setSearch('');
    setActiveElements(new Set());
    setActiveRarity(null);
    setActiveWeapon(null);
  };

  return (
    <div
      className="min-h-full"
      style={{ background: 'linear-gradient(180deg, #0f0f1a 0%, #12121f 40%, #0a0a14 100%)' }}
    >
      {/* ── Header ── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 pt-10 pb-6">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1
              className="text-3xl font-black tracking-wide mb-1"
              style={{
                background: 'linear-gradient(90deg, #e2e8f0 0%, #a5b4fc 50%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CHARACTERS
            </h1>
            <p className="text-white/30 text-sm">{filtered.length} / {charactersData.length} resonators</p>
          </motion.div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div
        className="sticky top-0 z-30 backdrop-blur-md border-b"
        style={{ background: 'rgba(10,10,20,0.85)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-3 space-y-3">
          {/* Search */}
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search resonator..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-8 py-2 rounded-lg text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(165,180,252,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {ELEMENTS.map(el => (
                <FilterPill key={el.key} active={activeElements.has(el.key)} onClick={() => toggleElement(el.key)} color={el.color}>
                  <img src={el.img} alt={el.label} className="w-3.5 h-3.5 object-contain inline-block" />
                  {el.label}
                </FilterPill>
              ))}
            </div>
            <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              {([5, 4] as Rarity[]).map(r => (
                <FilterPill key={r} active={activeRarity === r} onClick={() => setActiveRarity(activeRarity === r ? null : r)} color={r === 5 ? '#f59e0b' : '#a78bfa'}>
                  {'★'.repeat(r)} {r}★
                </FilterPill>
              ))}
            </div>
            <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />
            <div className="flex items-center gap-1.5 flex-wrap">
              {WEAPONS.map(w => (
                <FilterPill key={w.key} active={activeWeapon === w.key} onClick={() => setActiveWeapon(activeWeapon === w.key ? null : w.key)}>
                  <img src={w.img} alt={w.label} className="w-3.5 h-3.5 object-contain inline-block" style={{ filter: 'brightness(0.85) contrast(1.1)' }} />
                  {w.label}
                </FilterPill>
              ))}
            </div>
            {hasFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={clearAll}
                className="ml-auto flex items-center gap-1 text-xs text-white/40 hover:text-white/80 transition-colors cursor-pointer"
              >
                <X size={12} /> Clear
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-white/25"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-semibold">No resonators found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid gap-5"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
            >
              {filtered.map((char, i) => (
                <CharacterCard key={char.id} char={char} index={i} onClick={() => setSelectedChar(char)} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Character Modal ── */}
      <CharacterModal char={selectedChar} onClose={() => setSelectedChar(null)} />
    </div>
  );
}
