import { useState, useEffect, useRef, CSSProperties, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sword, Shield, Heart, Zap, Star, Crosshair, TrendingUp, Wrench } from 'lucide-react';
import { Character, Element } from '../types';
import Tooltip from './Tooltip';
import { ELEMENT_COLORS, ELEMENT_RGB as ELEMENT_RGB_CONST, SKILL_COLORS, SKILL_LABELS_VI } from '../data/constants';

// ── Tooltip content helpers ────────────────────────────────────
function TipLabel({ vi, en, color }: { vi: string; en: string; color?: string }) {
  return (
    <p style={{ color: color ?? 'white', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>
      {vi} <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>({en})</span>
    </p>
  );
}

// ── Element tooltips ───────────────────────────────────────────
const ELEMENT_TIPS: Record<Element, ReactNode> = {
  Glacio:  <TipLabel vi="Băng"     en="Glacio"  color="#7dd3fc" />,
  Fusion:  <TipLabel vi="Hoả"      en="Fusion"  color="#fb923c" />,
  Electro: <TipLabel vi="Sét"      en="Electro" color="#c084fc" />,
  Aero:    <TipLabel vi="Phong"    en="Aero"    color="#86efac" />,
  Spectro: <TipLabel vi="Quang"    en="Spectro" color="#fde68a" />,
  Havoc:   <TipLabel vi="Hỗn Độn" en="Havoc"   color="#f472b6" />,
};

// ── Weapon tooltips ────────────────────────────────────────────
const WEAPON_TIPS: Record<string, ReactNode> = {
  Sword:      <TipLabel vi="Kiếm"        en="Sword"      />,
  Broadblade: <TipLabel vi="Đại Kiếm"   en="Broadblade" />,
  Pistols:    <TipLabel vi="Súng Ngắn"  en="Pistols"    />,
  Gauntlets:  <TipLabel vi="Găng Tay"   en="Gauntlets"  />,
  Rectifier:  <TipLabel vi="Pháp Khí"   en="Rectifier"  />,
};

// ── Stat tooltips ──────────────────────────────────────────────
const STAT_TIPS: Record<string, ReactNode> = {
  'HP':                   <TipLabel vi="Máu"                    en="HP"                    />,
  'ATK':                  <TipLabel vi="Tấn Công"               en="ATK"                   />,
  'DEF':                  <TipLabel vi="Phòng Thủ"              en="DEF"                   />,
  'Crit. Rate':           <TipLabel vi="Tỉ Lệ Chí Mạng"        en="Crit. Rate"            />,
  'Crit. DMG':            <TipLabel vi="Sát Thương Chí Mạng"   en="Crit. DMG"             />,
  'Energy Regen':         <TipLabel vi="Hồi Năng Lượng"        en="Energy Regen"          />,
  'Max Resonance Energy': <TipLabel vi="Năng Lượng Tối Đa"     en="Max Resonance Energy"  />,
};

// ── Element colors (từ constants) ─────────────────────────────
const ELEMENT_COLOR = ELEMENT_COLORS as Record<Element, string>;
const ELEMENT_RGB   = ELEMENT_RGB_CONST as Record<Element, string>;

// ── Stat icon map ──────────────────────────────────────────────
const STAT_ICONS: Record<string, ReactNode> = {
  'HP':                    <Heart    size={14} />,
  'ATK':                   <Sword    size={14} />,
  'DEF':                   <Shield   size={14} />,
  'Crit. Rate':            <Crosshair size={14} />,
  'Crit. DMG':             <TrendingUp size={14} />,
  'Energy Regen':          <Zap      size={14} />,
  'Max Resonance Energy':  <Star     size={14} />,
};

// ── Stars ──────────────────────────────────────────────────────
function Stars({ rarity }: { rarity: number }) {
  const color = rarity === 5 ? '#f59e0b' : '#a78bfa';
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rarity }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ── Tab button ─────────────────────────────────────────────────
function TabBtn({ active, onClick, children, accentColor }: {
  active: boolean; onClick: () => void; children: ReactNode; accentColor: string;
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap"
      style={{ color: active ? accentColor : 'rgba(255,255,255,0.4)' }}
    >
      {children}
      {active && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
          style={{ background: accentColor }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

// ── Intro Tab ──────────────────────────────────────────────────
function IntroTab({ char, accentColor, rgb }: { char: Character; accentColor: string; rgb: string }) {
  const intro = char.intro;
  return (
    <div className="flex flex-col gap-4">

      {/* ── Top row: name + badges ── */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <h2 className="text-2xl font-black text-white">{char.name}</h2>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: `rgba(${rgb},0.2)`, color: accentColor, border: `1px solid rgba(${rgb},0.35)` }}
        >
          {char.rarity}★
        </span>
        <Tooltip content={ELEMENT_TIPS[char.element]}>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 cursor-help"
            style={{ background: `rgba(${rgb},0.15)`, color: accentColor, border: `1px solid rgba(${rgb},0.3)` }}
          >
            <img src={`/images/Element/${char.element}.png`} alt={char.element} className="w-3.5 h-3.5 object-contain" />
            {char.element}
          </span>
        </Tooltip>
        <Tooltip content={WEAPON_TIPS[char.weapon]}>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 cursor-help"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <img src={`/images/Weapons/${char.weapon}.png`} alt={char.weapon} className="w-3.5 h-3.5 object-contain" style={{ filter: 'brightness(0.85)' }} />
            {char.weapon}
          </span>
        </Tooltip>
      </div>

      {/* ── Two-column: splash left, stats right ── */}
      <div className="flex gap-4 items-start">

        {/* Left: splash art — hiển thị toàn bộ ảnh, không cắt */}
        <div className="flex-shrink-0" style={{ width: '260px' }}>
          <img
            src={char.splashUrl || char.imageUrl}
            alt={char.name}
            className="w-full"
            style={{ display: 'block', height: 'auto' }}
          />
        </div>

        {/* Right: base stats */}
        <div className="flex-1 min-w-0">
          {intro?.stats && (
            <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {intro.stats.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2.5 text-sm"
                  style={{ borderBottom: i < intro.stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                >
                  <Tooltip content={STAT_TIPS[s.label] ?? <span style={{color:'white',fontSize:12,fontWeight:700}}>{s.label}</span>}>
                    <div className="flex items-center gap-2 cursor-help" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      <span style={{ color: accentColor }}>{STAT_ICONS[s.label] ?? <Wrench size={14} />}</span>
                      {s.label}
                    </div>
                  </Tooltip>
                  <span className="font-bold text-white">{s.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Introduction text ── */}
      {intro?.description && (
        <div className="rounded-xl p-4" style={{ background: `rgba(${rgb},0.06)`, border: `1px solid rgba(${rgb},0.15)` }}>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {intro.description}
          </p>
        </div>
      )}

      {!intro && (
        <div className="text-center py-12 text-white/25">
          <p className="text-lg font-semibold">No data available</p>
        </div>
      )}
    </div>
  );
}

// ── Build Tab ──────────────────────────────────────────────────
function BuildTab({ char, accentColor, rgb }: { char: Character; accentColor: string; rgb: string }) {
  const build = char.build;
  if (!build) return (
    <div className="text-center py-12 text-white/25">
      <p className="text-lg font-semibold">No build data available</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">

      {/* Best Weapon */}
      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h4 className="font-bold text-base mb-3" style={{ color: accentColor }}>Best Weapon</h4>
        <div className="flex gap-4">
          {/* Weapon icon placeholder */}
          <div
            className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl"
            style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.25)` }}
          >
            🔮
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white text-base">{build.bestWeapon.name}</span>
            </div>
            <div className="flex gap-4 text-sm mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <span>ATK <span className="text-white font-semibold">{build.bestWeapon.atk}</span></span>
              {build.bestWeapon.critRate && (
                <span>Crit. Rate <span className="text-white font-semibold">{build.bestWeapon.critRate}</span></span>
              )}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {build.bestWeapon.description}
            </p>
          </div>
        </div>
      </div>

      {/* Echo Set + Build Stats — side by side on wide, stacked on narrow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Echo Set */}
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h4 className="font-bold text-base mb-3" style={{ color: accentColor }}>Best Echo Set</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {build.echoSet.echoes.map((echo, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-lg relative"
                  style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.25)` }}
                >
                  🐉
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center text-white"
                    style={{ background: accentColor }}
                  >
                    {echo.cost}
                  </span>
                </div>
                <span className="text-[10px] text-white/40 text-center w-12 truncate">{echo.name}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            {build.echoSet.setBonus.map((b, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ color: accentColor }}>•</span> {b}
              </p>
            ))}
          </div>
          {/* Best stats */}
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Best Stats</p>
            <div className="flex flex-wrap gap-1.5">
              {build.bestStats.map((s, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-2 py-0.5 rounded-md"
                  style={{ background: `rgba(${rgb},0.15)`, color: accentColor, border: `1px solid rgba(${rgb},0.25)` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Build Stats */}
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h4 className="font-bold text-base mb-3" style={{ color: accentColor }}>Build Stats</h4>
          <div className="space-y-0">
            {[
              { label: 'HP',                       value: build.buildStats.hp },
              { label: 'ATK',                      value: build.buildStats.atk },
              { label: 'DEF',                      value: build.buildStats.def },
              { label: 'Crit. Rate',               value: build.buildStats.critRate },
              { label: 'Crit. DMG',                value: build.buildStats.critDmg },
              { label: 'Energy Regen',             value: build.buildStats.energyRegen },
              ...(build.buildStats.fusionDmg       ? [{ label: `${char.element} DMG Bonus`, value: build.buildStats.fusionDmg }] : []),
              ...(build.buildStats.resonanceLibDmg ? [{ label: 'Resonance Lib. DMG',        value: build.buildStats.resonanceLibDmg }] : []),
            ].map((s, i, arr) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 text-sm"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
              >
                <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <span style={{ color: accentColor }}>{STAT_ICONS[s.label] ?? <Wrench size={14} />}</span>
                  {s.label}
                </div>
                <span className="font-bold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mechanics Tab ──────────────────────────────────────────────
// Cú pháp:
//   [text|#color]    → dùng hex color
//   [text|SkillType] → tra SKILL_COLORS[SkillType]
//   [SkillType]      → text = SkillType, màu = SKILL_COLORS[SkillType]
function highlightText(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]|]+)(?:\|([^\]]+))?\]/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const label = match[1];
    const ref   = match[2] ?? label;
    const color = ref.startsWith('#') ? ref : (SKILL_COLORS[ref] ?? '#fff');
    parts.push(<span key={key++} style={{ color, fontWeight: 700 }}>{label}</span>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function MechanicsTab({ char, accentColor, rgb }: { char: Character; accentColor: string; rgb: string }) {
  const mechanics = char.mechanics;
  if (!mechanics?.length) return (
    <div className="text-center py-12 text-white/25">
      <p className="text-lg font-semibold">Chưa có dữ liệu cơ chế</p>
    </div>
  );

  // Gộp tất cả content thành 1 text
  const fullText = mechanics.map(m => m.content).join('\n\n');

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: `rgba(${rgb},0.04)`, border: `1px solid rgba(${rgb},0.12)` }}
    >
      <div className="space-y-3">
        {fullText.split('\n').map((line, i) => {
          if (line.trim() === '') return <div key={i} className="h-1" />;
          return (
            <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
              {highlightText(line)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
// ── Pie Chart ─────────────────────────────────────────────────
function PieChart({ slices, size = 160 }: { slices: { label: string; percent: number; color?: string }[]; size?: number }) {
  const r = size / 2;
  let cumulative = 0;
  const paths = slices.map(s => {
    const color = s.color ?? SKILL_COLORS[s.label] ?? '#888';
    const start = cumulative;
    cumulative += s.percent;
    const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle   = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = r + r * 0.85 * Math.cos(startAngle);
    const y1 = r + r * 0.85 * Math.sin(startAngle);
    const x2 = r + r * 0.85 * Math.cos(endAngle);
    const y2 = r + r * 0.85 * Math.sin(endAngle);
    const large = s.percent > 50 ? 1 : 0;
    return { ...s, color, d: `M${r},${r} L${x1},${y1} A${r * 0.85},${r * 0.85} 0 ${large},1 ${x2},${y2} Z` };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      ))}
    </svg>
  );
}

// ── Active Skills Tab ──────────────────────────────────────────
// Dùng SKILL_COLORS và SKILL_LABELS_VI từ constants

function SkillIcon({ type, charId, label, size = 64 }: { key?: number; type: string; charId: string; label?: string; size?: number }) {
  const color = SKILL_COLORS[type] ?? '#a5b4fc';
  const displayLabel = label ?? type;
  const viLabel = SKILL_LABELS_VI[type] ?? type;
  const charName = charId.charAt(0).toUpperCase() + charId.slice(1);
  const src = `/images/icon_skill/${charName}/${type}.png`;

  return (
    <Tooltip content={<TipLabel vi={viLabel} en={type} color={color} />}>
      <div className="flex flex-col items-center gap-2 cursor-help" style={{ minWidth: size, maxWidth: size + 32 }}>
        <div
          className="rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
          style={{
            width: size, height: size,
            background: 'rgba(255,255,255,0.06)',
            border: '2px solid rgba(255,255,255,0.35)',
            boxShadow: '0 0 10px rgba(255,255,255,0.08)',
          }}
        >
          <img
            src={src}
            alt={type}
            style={{ width: size - 8, height: size - 8, objectFit: 'contain' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <span
          className="text-xs font-semibold italic text-center whitespace-nowrap"
          style={{ color }}
        >
          {displayLabel}
        </span>
      </div>
    </Tooltip>
  );
}

function Separator({ symbol }: { key?: number; symbol: '>' | '=' | '<' }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center"
      style={{ width: 24, height: 64, marginBottom: 26 }}
    >
      <span className="font-bold text-lg select-none" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {symbol}
      </span>
    </div>
  );
}

function ActiveSkillsTab({ char, accentColor, rgb }: { char: Character; accentColor: string; rgb: string }) {
  const skills = char.activeSkills;

  return (
    <div className="flex flex-col gap-5">

      {/* ── Skill Priority ── */}
      {char.skillPriority && char.skillPriority.length > 0 && (
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-sm font-bold text-center text-white mb-4">
            {char.name} Skills Priority
          </p>

          {/* Priority row */}
          <div className="flex items-start justify-center gap-2 flex-wrap">
            {char.skillPriority.map((item, i) => {
              if (typeof item === 'string') {
                return <Separator key={i} symbol={item as '>' | '=' | '<'} />;
              }
              return <SkillIcon key={i} type={item.type} charId={char.id} label={item.label} size={60} />;
            })}
          </div>

          {/* Note — canh trái */}
          {char.skillPriorityNote && (
            <p className="text-sm leading-relaxed mt-3 text-left" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {char.skillPriorityNote}
            </p>
          )}
        </div>
      )}

      {/* ── Burst Rotation ── */}
      {char.burstRotation && char.burstRotation.length > 0 && (
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-sm font-bold text-center text-white mb-4">
            {char.name} Burst Rotation
          </p>
          <ol className="space-y-2">
            {char.burstRotation.map((step, i) => (
              <li key={i} className="flex items-baseline gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span className="flex-shrink-0 font-bold text-xs w-5 text-right" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {i + 1}.
                </span>
                <span>{highlightText(step.text)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ── Damage Composition ── */}
      {char.damageComposition && char.damageComposition.length > 0 && (
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-sm font-bold text-center text-white mb-5">
            {char.name} Damage Types Composition
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {/* Pie chart */}
            <PieChart slices={char.damageComposition} size={160} />
            {/* Legend */}
            <div className="flex flex-col gap-2.5">
              {char.damageComposition.map((s, i) => {
                const color = s.color ?? SKILL_COLORS[s.label] ?? '#888';
                return (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: color }} />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {s.label}
                    </span>
                    <span className="text-sm font-bold ml-auto pl-4" style={{ color }}>
                      {s.percent}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-center mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Biểu đồ thể hiện tỉ lệ các loại sát thương, không phải hệ số nhân.
          </p>
        </div>
      )}

      {/* ── Skill list ── */}
      {skills?.length ? (
        skills.map((skill, i) => {
          const color = SKILL_COLORS[skill.type] ?? accentColor;
          const label = SKILL_LABELS_VI[skill.type] ?? skill.type;
          return (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-start gap-3 mb-2">
                <SkillIcon type={skill.type} charId={char.id} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider"
                      style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}
                    >
                      {label}
                    </span>
                    <span className="font-bold text-sm" style={{ color }}>{skill.name}</span>
                  </div>
                  <div className="space-y-1.5">
                    {skill.description.split('\n').map((line, j) =>
                      line.trim() === '' ? <div key={j} className="h-1" /> :
                      <p key={j} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        {highlightText(line)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        !char.skillPriority?.length && !char.burstRotation?.length && <ComingSoon accentColor={accentColor} label="Kỹ Năng Chủ Động" />
      )}
    </div>
  );
}

// ── Passive Skills Tab ─────────────────────────────────────────
function PassiveSkillsTab({ char, accentColor, rgb }: { char: Character; accentColor: string; rgb: string }) {
  const skills = char.passiveSkills;
  if (!skills?.length) return (
    <ComingSoon accentColor={accentColor} label="Kỹ Năng Bị Động" />
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${accentColor}60)` }} />
        <span className="text-sm font-bold text-white whitespace-nowrap">{char.name} Passive Skills</span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${accentColor}60)` }} />
      </div>

      {skills.map((skill, i) => {
        const charName = char.id.charAt(0).toUpperCase() + char.id.slice(1);
        const iconSrc = skill.imageUrl ?? `/images/icon_skill/${charName}/${skill.name}.png`;
        return (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex gap-4">
              {/* Left: icon canh giữa */}
              <div className="flex flex-col items-center justify-center flex-shrink-0" style={{ width: 64 }}>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '2px solid rgba(255,255,255,0.35)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={iconSrc}
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* Right: tên song ngữ + mô tả */}
              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <span className="font-bold italic text-sm text-white">{skill.name}</span>
                  {skill.nameVi && (
                    <span className="text-sm italic ml-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      ({skill.nameVi})
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {skill.description.split('\n').map((line, j) =>
                    line.trim() === '' ? <div key={j} className="h-1" /> :
                    <p key={j} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {highlightText(line)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Coming Soon placeholder ────────────────────────────────────
function ComingSoon({ accentColor, label }: { accentColor: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
        style={{ background: `${accentColor}15`, border: `2px solid ${accentColor}30` }}
      >
        ⚔️
      </div>
      <p className="text-base font-bold text-white/50">{label}</p>
      <span
        className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest"
        style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
      >
        COMING SOON
      </span>
    </div>
  );
}

// ── Main Modal ─────────────────────────────────────────────────
type TabId = 'intro' | 'mechanics' | 'build' | 'active-skills' | 'passive-skills';

export default function CharacterModal({
  char,
  onClose,
}: {
  char: Character | null;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<TabId>('intro');
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset tab khi đổi nhân vật
  useEffect(() => { if (char) setTab('intro'); }, [char?.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Check scroll position để hiện/ẩn arrow
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 8);
  };

  useEffect(() => {
    // Re-check sau khi tab đổi và content render xong
    const t = setTimeout(checkScroll, 80);
    return () => clearTimeout(t);
  }, [tab, char?.id]);

  const accentColor = char ? ELEMENT_COLOR[char.element] : '#a5b4fc';
  const rgb         = char ? ELEMENT_RGB[char.element]   : '165,180,252';

  return (
    <AnimatePresence>
      {char && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-2xl overflow-hidden pointer-events-auto"
              style={{
                background: 'linear-gradient(160deg, #16162a 0%, #12121f 100%)',
                border: `1px solid rgba(${rgb},0.2)`,
                boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(${rgb},0.1)`,
              } as CSSProperties}
            >
              {/* ── Header ── */}
              <div
                className="relative flex-shrink-0 flex items-center justify-between px-6 py-4"
                style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }}
                />
                <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Character Info
                </span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── Tabs ── */}
              <div
                className="flex-shrink-0 flex border-b px-2"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <TabBtn active={tab === 'intro'}          onClick={() => setTab('intro')}          accentColor={accentColor}>Giới thiệu</TabBtn>
                <TabBtn active={tab === 'mechanics'}      onClick={() => setTab('mechanics')}      accentColor={accentColor}>Cơ chế</TabBtn>
                <TabBtn active={tab === 'build'}          onClick={() => setTab('build')}          accentColor={accentColor}>Build</TabBtn>
                <TabBtn active={tab === 'active-skills'}  onClick={() => setTab('active-skills')}  accentColor={accentColor}>Kỹ năng chủ động</TabBtn>
                <TabBtn active={tab === 'passive-skills'} onClick={() => setTab('passive-skills')} accentColor={accentColor}>Kỹ năng bị động</TabBtn>
              </div>

              {/* ── Content + scroll indicator ── */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5"
                style={{ minHeight: 0 }}
                onScroll={checkScroll}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    {tab === 'intro'          && <IntroTab          char={char} accentColor={accentColor} rgb={rgb} />}
                    {tab === 'mechanics'      && <MechanicsTab      char={char} accentColor={accentColor} rgb={rgb} />}
                    {tab === 'build'          && <BuildTab          char={char} accentColor={accentColor} rgb={rgb} />}
                    {tab === 'active-skills'  && <ActiveSkillsTab   char={char} accentColor={accentColor} rgb={rgb} />}
                    {tab === 'passive-skills' && <PassiveSkillsTab  char={char} accentColor={accentColor} rgb={rgb} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Scroll arrow — absolute, pointer-events-none */}
              <AnimatePresence>
                {canScrollDown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pointer-events-none"
                    style={{ height: '72px', zIndex: 10 }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(18,18,31,0.92) 100%)' }}
                    />
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative mb-3 flex items-center justify-center w-7 h-7 rounded-full"
                      style={{ background: `rgba(${rgb},0.15)`, border: `1px solid rgba(${rgb},0.35)` }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
