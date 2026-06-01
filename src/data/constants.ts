// ── Màu sắc dùng chung cho toàn bộ project ────────────────────

export const ELEMENT_COLORS: Record<string, string> = {
  Glacio:  '#7dd3fc',
  Fusion:  '#fb923c',
  Electro: '#c084fc',
  Aero:    '#86efac',
  Spectro: '#fde68a',
  Havoc:   '#f472b6',
};

export const ELEMENT_RGB: Record<string, string> = {
  Glacio:  '125,211,252',
  Fusion:  '251,146,60',
  Electro: '192,132,252',
  Aero:    '134,239,172',
  Spectro: '253,230,138',
  Havoc:   '244,114,182',
};

// ── Màu theo loại kỹ năng ──────────────────────────────────────
export const SKILL_COLORS: Record<string, string> = {
  'Basic Attack':         '#7dd3fc',
  'Heavy Attack':         '#fb923c',
  'Resonance Skill':      '#c084fc',
  'Resonance Liberation': '#f59e0b',
  'Forte Circuit':        '#fde68a',
  'Intro Skill':          '#86efac',
  'Outro Skill':          '#f472b6',
  'Echo Skill':           '#f472b6',
  'Dodge':                '#fde68a',
};

// ── Tên tiếng Việt theo loại kỹ năng ──────────────────────────
export const SKILL_LABELS_VI: Record<string, string> = {
  'Basic Attack':         'Đòn Đánh Thường',
  'Heavy Attack':         'Trọng Kích',
  'Resonance Skill':      'Kỹ Năng Cộng Hưởng',
  'Resonance Liberation': 'Giải Phóng Cộng Hưởng',
  'Forte Circuit':        'Forte Circuit',
  'Intro Skill':          'Intro Skill',
  'Outro Skill':          'Outro Skill',
  'Echo Skill':           'Echo Skill',
  'Dodge':                'Né Tránh',
};
