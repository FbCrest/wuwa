import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#07070f', borderTop: '1px solid rgba(165,180,252,0.08)' }}
    >
      {/* Shimmer line */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #dc2626, #fbbf24, #dc2626, transparent)', width: '60%' }}
        animate={{ x: ['-60%', '160%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
      />

      <div className="flex items-center justify-center gap-3 py-3 px-6">
        <span className="text-sm text-white">
          Vẽ ra ngàn thế giới, nhưng không vẽ nổi một người đã rời đi{' '}
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            💔
          </motion.span>
        </span>

        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>|</span>

        <span className="text-xs text-white">
          Tạo bởi{' '}
          <motion.span
            className="font-semibold shimmer-text"
            style={{ color: '#dc2626' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Mèo.Đi.Bụi
          </motion.span>
          {' '}&copy; 2025
        </span>
      </div>
    </footer>
  );
}
