import { motion } from 'framer-motion'

interface GameCardProps {
  emoji: string
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
  disabled: boolean
}

export function GameCard({ emoji, isFlipped, isMatched, onClick, disabled }: GameCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isMatched}
      className="relative w-full aspect-square"
      style={{ perspective: '1000px' }}
      whileHover={!disabled && !isMatched ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isMatched ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br from-primary via-secondary to-accent shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-5xl">✨</span>
        </div>
        
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center text-6xl bg-card shadow-xl border-4 border-primary/20"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <motion.span
            animate={isMatched ? {
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {emoji}
          </motion.span>
        </div>
      </motion.div>
    </motion.button>
  )
}
