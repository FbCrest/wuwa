import { Character } from '../../types';

const denia: Character = {
  id: 'denia',
  name: 'Denia',
  element: 'Fusion',
  rarity: 5,
  weapon: 'Rectifier',
  imageUrl: '/images/characters/5_stars/Denia_avatar.png',
  splashUrl: '/images/characters/5_stars/Denia.png',

  intro: {
    description:
      'Denia là nhân vật 5 sao hệ Fusion sử dụng Rectifier. Là sinh viên khoa Voidmatters tại Học viện Startorch, Denia nổi tiếng là một "chuyên gia ngủ gật" chuyên nghiệp — nhưng không bao giờ bỏ lỡ bất kỳ sự kiện nào của trường. Luôn nở nụ cười "hiền lành" với tất cả mọi người.',
    stats: [
      { label: 'HP',                   value: 11025 },
      { label: 'ATK',                  value: 425   },
      { label: 'DEF',                  value: 1148  },
      { label: 'Crit. Rate',           value: '5%'  },
      { label: 'Crit. DMG',            value: '150%'},
      { label: 'Energy Regen',         value: '100%'},
      { label: 'Max Resonance Energy', value: 140   },
    ],
  },

  skillPriority: [
    { type: 'Resonance Liberation' },
    '>',
    { type: 'Forte Circuit' },
    '>',
    { type: 'Basic Attack' },
    '=',
    { type: 'Resonance Skill' },
    '>',
    { type: 'Intro Skill' },
  ],
  skillPriorityNote: 'Hệ số sát thương phân bổ khá đều giữa các kỹ năng, nên hãy nâng cấp tất cả trừ Intro Skill. Thứ tự ưu tiên: Resonance Liberation > Forte Circuit = Resonance Skill = Basic Attack > Intro Skill — về cơ bản nâng tất cả trừ Intro Skill.',

  burstRotation: [
    { text: '[Intro Skill]' },
    { text: '[Basic Attack] (4th [Basic Attack] — Stagecraft Form)' },
    { text: '[Resonance Skill] [Phantom Bubble]' },
    { text: '[Echo Skill]' },
    { text: '[Resonance Liberation] (Final Act — Starcraft Form)' },
    { text: '[Resonance Skill] (Banish — Breakdown Form)' },
    { text: '[Resonance Skill] (Banish — Breakdown Form)' },
    { text: '[Basic Attack] × 4 (1st – 4th [Basic Attack] — Breakdown Form)' },
    { text: '[Resonance Skill] (Beckon — Breakdown Form)' },
    { text: '[Resonance Liberation] (Final Act — Breakdown Form)' },
    { text: '[Outro Skill]' },
  ],

  damageComposition: [
    { label: 'Resonance Liberation', percent: 78 },
    { label: 'Resonance Skill',      percent: 10 },
    { label: 'Basic Attack',         percent: 7  },
    { label: 'Others',               percent: 5, color: '#ef4444' },
  ],

  mechanics: [
    {
      tag: '',
      tagColor: '',
      title: '',
      content: `Trạng thái bình thường của Denia, còn được gọi là [Trạng Thái Hồng|#fb7eb0] ([Pink State|#fb7eb0]), có tên là [Stagecraft Form|#fb7eb0]. Nếu bạn thấy bốn chữ này xuất hiện trong mô tả kỹ năng, hoặc bất kỳ kỹ năng nào – như Đòn Đánh Thường, Kỹ Năng Cộng Hưởng hay Giải Phóng Cộng Hưởng đi kèm hậu tố này – thì điều đó có nghĩa kỹ năng đó thuộc [Trạng Thái Hồng|#fb7eb0].

Ví dụ, Basic Attack – [Stagecraft Form|#fb7eb0] là Đòn Đánh Thường bình thường của cô ấy. Đòn đánh ở hit thứ ba có hiệu ứng gom quái. Tuy nhiên, chúng ta thường không dùng đến hit thứ ba này, nên chỉ cần nhớ như một thông tin cơ bản là được.

Khi sử dụng Đòn Đánh Thường, bạn sẽ hồi năng lượng [Circuit|#fb7eb0] màu hồng cho cô ấy. Nguồn năng lượng này trong mô tả kỹ năng được gọi là [Void Particle|#fde68a]. Nó có thể được tích thông qua Đòn Đánh Thường, Kỹ Năng Cộng Hưởng và [Intro Skill|#7dd3fc]. Khi chơi Denia, có một điều bạn luôn phải nhớ: chỉ kích hoạt [Resonance Liberation|#fb923c] khi thanh năng lượng màu hồng đã đầy.

Thông thường có hai combo để nạp đầy năng lượng màu hồng.

Combo đầu tiên là dùng [Intro Skill|#7dd3fc] để vào sân, sau đó đánh thường một lần. Lý do là sau [Intro Skill|#7dd3fc], cô ấy sẽ trực tiếp nối sang hit thứ tư của Đòn Đánh Thường, và hit này cho nhiều năng lượng nhất. Sau đó chỉ cần nhấn kỹ năng một lần là thanh năng lượng hồng sẽ đầy.

Combo thứ hai là dùng [Resonance Skill|#fb923c] rồi đánh thường bốn lần. Cách này cũng sẽ nạp đầy năng lượng.

Vậy nếu không có [Intro Skill|#7dd3fc] thì năng lượng hồng ban đầu lấy từ đâu?

Sau khi Denia sử dụng [Enhanced Resonance Liberation|#fb923c], cô ấy sẽ nhận được một hiệu ứng giúp hồi 1 [Void Particle|#fde68a] mỗi giây.

Sau khi thanh năng lượng hồng được nạp đầy, kích hoạt giai đoạn đầu của [Resonance Liberation|#fb923c] sẽ biến Denia từ [Trạng Thái Hồng|#fb7eb0] sang [Trạng Thái Đen|#a78bfa] ([Black State|#a78bfa]), còn gọi là [Breakdown Form|#a78bfa].

Trong [Trạng Thái Đen|#a78bfa], khi sử dụng Đòn Đánh Thường cường hóa, Denia sẽ tiêu hao năng lượng [Circuit|#fb7eb0] để nạp cho "hình nhân nhỏ" ở giữa – thực chất là để nạp năng lượng cho [Enhanced Resonance Liberation|#fb923c]. Loại năng lượng dùng để nạp này trong mô tả kỹ năng được gọi là [Conformal Charge|#fde68a].

Đòn Đánh Thường cường hóa tiêu hao năng lượng [Circuit|#fb7eb0] có hai hiệu ứng:

• Hệ số sát thương tăng thêm [50%|#86efac], đồng thời loại sát thương sẽ chuyển từ sát thương Đòn Đánh Thường sang sát thương cốt lõi từ [Resonance Liberation|#fb923c] của Denia.

• Lượng [Conformal Charge|#fde68a] nhận được sẽ tăng gấp đôi.

Vậy nếu bạn dùng hết năng lượng [Circuit|#fb7eb0] bằng các Đòn Đánh Thường cường hóa mà vẫn chưa nạp đầy [Enhanced Resonance Liberation|#fb923c] thì sao?

Hãy nhìn vào kỹ năng cường hóa của Denia trong [Trạng Thái Đen|#a78bfa].

Khi Denia ở [Trạng Thái Đen|#a78bfa] sở hữu [Dark Core|#c084fc] – tức ba quả cầu nằm dưới thanh [Circuit|#fb7eb0] – thì bất kể có bao nhiêu, chỉ cần còn ít nhất một quả, [Resonance Skill|#fb923c] bình thường của cô ấy sẽ biến thành [Enhanced Resonance Skill|#fb923c].

Giai đoạn đầu của [Enhanced Resonance Skill|#fb923c] có khả năng gom quái. Sau đó, bằng cách nhấn lại nút kỹ năng hoặc nút Đánh Thường, bạn có thể kích hoạt giai đoạn thứ hai. Kỹ năng này sẽ tiêu hao toàn bộ [Dark Core|#c084fc] để gây sát thương và cung cấp một lượng lớn [Conformal Charge|#fde68a]. Mỗi [Dark Core|#c084fc] bị tiêu hao sẽ tăng hệ số sát thương thêm [150%|#86efac].

Sau đó, Denia sẽ để lại một lõi [Erosion Field|#86efac] tại vị trí nơi [Enhanced Resonance Liberation|#fb923c] được kích hoạt. Lõi này sẽ gây sát thương diện rộng và gom quái mỗi 4 giây, tổng cộng gây sát thương [7 lần|#86efac].`,
    },
  ],

  passiveSkills: [
    {
      name: 'Vestiges of Falsehood',
      nameVi: 'Dấu Vết Của Sự Giả Dối',
      description: 'When Denia engages in combat in [Stagecraft Form|#fb7eb0]: restore [Dark Core|#c084fc] to 2 if she has fewer than 2; restore [Void Particle|#fde68a] to 20 points if she has fewer than 20. This effect can be triggered once every 12s.',
    },
    {
      name: 'Etched Colors',
      nameVi: 'Màu Sắc Khắc Sâu',
      description: `While in the Entropy Shift states, Denia obtains the following effects based on her current Resonance Mode:
— Resonance Mode — [Fusion Burst|#fb923c]: All Resonators in the team gain [30% Fusion DMG Bonus|#fb923c].
— Resonance Mode — Tune Strain: All Resonators in the team gain 10 Tune Break Boost. When a Resonator in the team has an Off-Tune Buildup Rate over 100%, every 10% that runs over increases the Resonator's Tune Break Boost by 8, up to 40.`,
    },
  ],

  build: {
    bestWeapon: {
      name: 'Forged Dwarf Star',
      atk: 500,
      critRate: '36.00%',
      description:
        'Tăng ATK 24%. Sau khi người dùng gây Fusion Burst hoặc Tune Strain – Shifting lên mục tiêu, Resonance Liberation DMG Bonus tăng 72% trong 5s. Trong thời gian hiệu ứng, sau khi Resonator trong đội gây Fusion Burst hoặc Tune Strain – Shifting, ATK tăng thêm 48% trong 15s. Hiệu ứng cùng tên không cộng dồn.',
    },
    bestStats: ['ATK', 'ATK%', 'Crit. Rate', 'Crit. DMG', 'Energy Regen'],
    echoSet: {
      name: 'Denia Best Echo Set',
      echoes: [
        { name: 'Lioness of Glory', cost: 4, mainStats: 'Fusion DMG%', subStats: 'Crit. Rate / Crit. DMG / ATK%' },
        { name: "Pilgrim's Shell",  cost: 3, mainStats: 'ATK%',        subStats: 'Crit. Rate / Crit. DMG / ATK%' },
        { name: 'Kerasaur',         cost: 3, mainStats: 'ATK%',        subStats: 'Crit. Rate / Crit. DMG / ATK%' },
        { name: 'Fusion Drake',     cost: 1, mainStats: 'ATK%',        subStats: 'Crit. Rate / Crit. DMG / ATK%' },
        { name: 'Electro Drake',    cost: 1, mainStats: 'ATK%',        subStats: 'Crit. Rate / Crit. DMG / ATK%' },
      ],
      setBonus: [
        'Fusion DMG +10%',
        'Casting Resonance Liberation grants all Resonators in the team 15% Fusion DMG Bonus and the caster 20% Resonance Liberation DMG Bonus, lasting for 35s.',
      ],
    },
    buildStats: {
      hp:              15585,
      atk:             2274,
      def:             1148,
      critRate:        '83.0%',
      critDmg:         '278.0%',
      energyRegen:     '130.8%',
      fusionDmg:       '60.0%',
      resonanceLibDmg: '18.0%',
    },
  },
};

export default denia;
