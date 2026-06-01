import { Character } from '../../types';

const aemeath: Character = {
  id: 'aemeath',
  name: 'Aemeath',
  element: 'Fusion',
  rarity: 5,
  weapon: 'Sword',
  imageUrl: '/images/characters/5_stars/Aemeath_avatar.png',
  splashUrl: '/images/characters/5_stars/Aemeath.png',

  intro: {
    description:
      'Aemeath là nhân vật 5 sao hệ Fusion sử dụng Sword. Từng là Exostrider Synchronist của Học viện Rabelle, cô ấy hiện là một hồn ma kỹ thuật số lặng lẽ ngân nga giữa những vì sao.',
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

  mechanics: [
    {
      tag: '',
      tagColor: '',
      title: '',
      content: `Nhân vật DPS hệ kép đầu tiên trong Wuthering Waves cuối cùng đã xuất hiện. Tóm tắt ngắn gọn: Aemeath là một main carry hệ kép chuyên về cả [Tune Rupture|#fb923c] lẫn [Fusion Burst|#fb7eb0], giúp cô ấy mạnh cả trong chiến đấu đơn mục tiêu lẫn tình huống đánh diện rộng AoE. Cô ấy cũng sở hữu hai bộ animation riêng biệt — dạng người và dạng cơ giáp — có thể tự do chuyển đổi trong thế giới mở.

Gameplay của Aemeath về cơ bản xoay quanh việc tích [Resonance Rate|#fde68a], sau đó dùng Trọng Kích để mở khóa đòn kết liễu [RL Finisher|#fb923c]. Vậy làm thế nào để tích [Resonance Rate|#fde68a]?

Đầu tiên, sử dụng [Resonance Liberation|#fb923c] sau [Intro Skill|#7dd3fc] sẽ trực tiếp nhận được [2 điểm|#86efac] Resonance Rate. Tiếp theo, hãy nhìn vào thanh [Forte Circuit|#fde68a] của Aemeath. Sau khi nạp đầy thanh này thông qua tấn công, bạn có thể tung ra hai [Enhanced Resonance Skill|#fb923c]; mỗi lần sẽ cho [1 điểm|#86efac] Resonance Rate, cộng dồn tối đa lên [4|#86efac]. Cuối cùng, dùng Trọng Kích để mở khóa và tung ra [RL Finisher|#fb923c].

Để tối đa hóa sát thương của Aemeath, bạn cần hiểu hai hệ thống mà cô ấy hỗ trợ.

Đầu tiên, Aemeath có thể tự do chọn giữa hai chế độ:

• [Tune Rupture|#fb923c]

• [Fusion Burst|#fb7eb0]

Chế độ [Tune Rupture|#fb923c] thiên về chiến đấu đơn mục tiêu, trong khi [Fusion Burst|#fb7eb0] mạnh hơn trong các tình huống AoE.

Nếu chọn chế độ [Tune Rupture|#fb923c], Aemeath sẽ có khả năng gắn debuff [Tune Rupture|#fb923c] lên kẻ địch. Ngoài ra, các kỹ năng cường hóa của cô ấy sẽ gây thêm các đòn sát thương [Tune Rupture|#fb923c].

Khi áp dụng debuff [Tune Rupture|#fb923c] hoặc gây sát thương [Tune Rupture|#fb923c] thông qua Tune Break, Aemeath sẽ nhận thêm sát thương chí mạng dựa trên số nhân vật thuộc hệ Tune Rupture Response trong đội hình.

Hiện tại, đội hình gồm Aemeath, Lynae và Mornye có thể đạt tối đa:

• [60% Crit. DMG|#86efac]

• Đồng thời tăng cường [25%|#86efac] sát thương cho [RL Finisher|#fb923c]

Sau khi kích hoạt Tune Break, kẻ địch sẽ nhận hiệu ứng [Rupturous Trail|#fb923c]. Hiệu ứng này có thể cộng dồn tối đa [30 tầng|#86efac] dựa trên số lần Response, giúp tăng tối đa [120%|#86efac] hệ số sát thương cho phần sát thương [Tune Rupture|#fb923c] bổ sung từ kỹ năng cường hóa.

Nếu chọn chế độ [Fusion Burst|#fb7eb0], Aemeath có thể áp dụng hiệu ứng [Fusion Burst|#fb7eb0] lên kẻ địch. Các kỹ năng cường hóa của cô ấy cũng sẽ tính sát thương dựa trên số tầng tối đa của [Fusion Burst|#fb7eb0] mà không tiêu hao các tầng đó.

Khi nhân vật trong đội áp dụng hiệu ứng [Fusion Burst|#fb7eb0] lên kẻ địch, Aemeath cũng nhận được buff Crit. DMG:

• [30%|#86efac] nếu có ít nhất một đồng đội có thể áp dụng hiệu ứng này

• Tối đa [60%|#86efac] nếu có hai nhân vật áp dụng được

Ngoài ra còn nhận:

• [25%|#86efac] tăng cường sát thương cho [RL Finisher|#fb923c]

Hiện tại, chỉ riêng Aemeath có thể áp dụng hiệu ứng [Fusion Burst|#fb7eb0]; đội hình Fusion Burst vẫn còn thiếu một sub-DPS có khả năng áp dụng hiệu ứng này để hoàn thiện đội hình.

Khi áp dụng hiệu ứng [Fusion Burst|#fb7eb0], đồng thời sẽ tăng hiệu ứng [Fusion Trail|#fb7eb0], tối đa [30 tầng|#86efac]. Điều này giúp tăng tới [300%|#86efac] hệ số sát thương cho lượng [Fusion Burst|#fb7eb0] được tính bởi các kỹ năng cường hóa.

Cuối cùng, Aemeath thay đổi cơ chế kích nổ [Fusion Burst|#fb7eb0] từ yêu cầu [10 tầng|#fde68a] ban đầu xuống còn [6 tầng|#86efac], nhưng vẫn gây lượng sát thương tương đương mốc 10 tầng ban đầu.`,
    },
  ],

  build: {
    bestWeapon: {
      name: 'Everbright Polestar',
      atk: 587.50,
      critRate: '24.30%',
      description:
        'Tăng All-Attribute DMG Bonus 24%. Khi gây Tune Rupture – Shifting hoặc Fusion Burst, Resonance Liberation DMG của người dùng bỏ qua 64% DEF và 30% Fusion RES của mục tiêu trong 8s.',
    },
    bestStats: ['ATK', 'ATK%', 'Crit. Rate', 'Crit. DMG', 'Energy Regen'],
    echoSet: {
      name: 'Aemeath Best Echo Set',
      echoes: [
        { name: 'Sigillum',                  cost: 4, mainStats: 'Fusion DMG%', subStats: 'Crit. Rate / Crit. DMG / ATK%' },
        { name: 'Kronablight',               cost: 3, mainStats: 'ATK%',        subStats: 'Crit. Rate / Crit. DMG / ATK%' },
        { name: 'Twin Nova: Collapsar Blade', cost: 3, mainStats: 'ATK%',        subStats: 'Crit. Rate / Crit. DMG / ATK%' },
        { name: 'Geospider S4',              cost: 1, mainStats: 'ATK%',        subStats: 'Crit. Rate / Crit. DMG / ATK%' },
        { name: 'Shadow Stepper',            cost: 1, mainStats: 'ATK%',        subStats: 'Crit. Rate / Crit. DMG / ATK%' },
      ],
      setBonus: [
        'Fusion DMG +10%',
        'Inflicting Fusion Burst or Tune Rupture – Shifting increases the Resonator\'s Crit. Rate by 20% and grants 20% Fusion DMG Bonus for 8s.',
      ],
    },
    buildStats: {
      hp:              15585,
      atk:             2432,
      def:             1148,
      critRate:        '71.3%',
      critDmg:         '278.0%',
      energyRegen:     '130.8%',
      fusionDmg:       '60.0%',
      resonanceLibDmg: '0.0%',
    },
  },
};

export default aemeath;
