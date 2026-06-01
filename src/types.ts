export type Element = 'Glacio' | 'Fusion' | 'Electro' | 'Aero' | 'Spectro' | 'Havoc';
export type Rarity = 4 | 5;
export type WeaponType = 'Sword' | 'Broadblade' | 'Pistols' | 'Gauntlets' | 'Rectifier';

// ── Intro tab ──────────────────────────────────────────────────
export interface CharStat {
  label: string;
  value: string | number;
  icon?: string;
}

export interface CharIntro {
  description: string;
  stats: CharStat[];
}

// ── Build tab ──────────────────────────────────────────────────
export interface WeaponBuild {
  name: string;
  imageUrl?: string;
  atk: number;
  critRate?: string;
  description: string;
}

export interface EchoBuild {
  name: string;
  imageUrl?: string;
  cost: number;
  mainStats: string;
  subStats: string;
}

export interface EchoSet {
  name: string;
  echoes: EchoBuild[];
  setBonus: string[];
}

export interface BuildStats {
  hp: number;
  atk: number;
  def: number;
  critRate: string;
  critDmg: string;
  energyRegen: string;
  fusionDmg?: string;
  resonanceLibDmg?: string;
}

export interface CharBuild {
  bestWeapon: WeaponBuild;
  bestStats: string[];
  echoSet: EchoSet;
  buildStats: BuildStats;
}

// ── Mechanics tab ──────────────────────────────────────────────
export interface CharMechanic {
  title: string;
  content: string;
  tag?: string;
  tagColor?: string;
}

// ── Skills tabs ────────────────────────────────────────────────
export type ActiveSkillType =
  | 'Basic Attack'
  | 'Heavy Attack'
  | 'Resonance Skill'
  | 'Resonance Liberation'
  | 'Forte Circuit'
  | 'Intro Skill'
  | 'Outro Skill'
  | 'Dodge';

export interface ActiveSkill {
  type: ActiveSkillType;
  name: string;
  description: string;   // supports [text|color] syntax
  imageUrl?: string;
}

export interface SkillPriorityItem {
  type: ActiveSkillType;
  label?: string;
}

export type SkillSeparator = '>' | '=' | '<';

// ── Burst Rotation ─────────────────────────────────────────────
export interface RotationStep {
  // supports [text|color] syntax for skill names + notes
  text: string;
}

// ── Damage Composition ─────────────────────────────────────────
export interface DamageSlice {
  label: string;
  percent: number;
  color?: string;  // nếu không có thì tự lấy từ SKILL_COLORS
}

export interface PassiveSkill {
  name: string;
  nameVi?: string;           // tên tiếng Việt
  description: string;       // supports [text|color] syntax
  imageUrl?: string;
}

// ── Main character ─────────────────────────────────────────────
export interface Character {
  id: string;
  name: string;
  element: Element;
  rarity: Rarity;
  weapon: WeaponType;
  imageUrl: string;
  splashUrl?: string;
  version?: string;
  isNew?: boolean;
  intro?: CharIntro;
  build?: CharBuild;
  mechanics?: CharMechanic[];
  activeSkills?: ActiveSkill[];
  skillPriority?: (SkillPriorityItem | SkillSeparator)[];
  skillPriorityNote?: string;
  burstRotation?: RotationStep[];
  damageComposition?: DamageSlice[];
  passiveSkills?: PassiveSkill[];
}
