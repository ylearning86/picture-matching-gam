import { useState, useEffect } from 'react'
import { GameCard } from './components/GameCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowClockwise, Trophy } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'

const ALL_EMOJIS = ['🐶', '🐱', '🐼', '🦁', '🐸', '🦊', '🐻', '🐰', '🐯', '🐮', '🐷', '🐵']

type Difficulty = 'easy' | 'normal' | 'hard'

const DIFFICULTY_CONFIG = {
  easy: { pairs: 4, label: '簡単', gridCols: 'grid-cols-4' },
  normal: { pairs: 6, label: '普通', gridCols: 'grid-cols-4' },
  hard: { pairs: 8, label: '難しい', gridCols: 'grid-cols-4' },
}

interface CardType {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function App() {
  const [difficulty, setDifficulty] = useKV<Difficulty>('difficulty', 'normal')
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [bestScores, setBestScores] = useKV<Record<Difficulty, number | null>>('bestScores', {
    easy: null,
    normal: null,
    hard: null,
  })

  const currentDifficulty = difficulty || 'normal'
  const currentPairs = DIFFICULTY_CONFIG[currentDifficulty].pairs

  const initializeGame = () => {
    const selectedEmojis = ALL_EMOJIS.slice(0, currentPairs)
    const doubledEmojis = [...selectedEmojis, ...selectedEmojis]
    const shuffled = shuffleArray(doubledEmojis)
    const newCards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
    setCards(newCards)
    setFlippedIndices([])
    setMoves(0)
    setMatches(0)
    setIsChecking(false)
    setGameWon(false)
  }

  useEffect(() => {
    initializeGame()
  }, [difficulty])

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsChecking(true)
      const [first, second] = flippedIndices
      
      if (cards[first].emoji === cards[second].emoji) {
        setCards(currentCards => currentCards.map((card, idx) =>
          idx === first || idx === second ? { ...card, isMatched: true } : card
        ))
        setMatches(currentMatches => currentMatches + 1)
        setFlippedIndices([])
        setIsChecking(false)
        toast.success('マッチ成功！ 🎉')
      } else {
        setTimeout(() => {
          setCards(currentCards => currentCards.map((card, idx) =>
            idx === first || idx === second ? { ...card, isFlipped: false } : card
          ))
          setFlippedIndices([])
          setIsChecking(false)
        }, 1000)
      }
      
      setMoves(currentMoves => currentMoves + 1)
    }
  }, [flippedIndices])

  useEffect(() => {
    if (matches === currentPairs && matches > 0) {
      setGameWon(true)
      const scores = bestScores || { easy: null, normal: null, hard: null }
      const currentBest = scores[currentDifficulty]
      if (currentBest === null || currentBest === undefined || moves < currentBest) {
        setBestScores((current) => {
          const updated = { ...(current || { easy: null, normal: null, hard: null }) }
          const diff = currentDifficulty
          updated[diff] = moves
          return updated
        })
        toast.success(`新記録: ${moves}手！ 🏆`)
      } else {
        toast.success(`${moves}手でクリア！ 🎊`)
      }
    }
  }, [matches, moves, bestScores, currentDifficulty, currentPairs, setBestScores])

  const handleCardClick = (index: number) => {
    if (
      isChecking ||
      flippedIndices.includes(index) ||
      cards[index].isMatched ||
      flippedIndices.length >= 2
    ) {
      return
    }

    setCards(currentCards => currentCards.map((card, idx) =>
      idx === index ? { ...card, isFlipped: true } : card
    ))
    setFlippedIndices(current => [...current, index])
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-background via-muted to-background">
      <Toaster position="top-center" richColors />
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-2"
        >
          <h1 className="text-5xl font-bold text-primary drop-shadow-lg">
            絵合わせゲーム 🎮
          </h1>
          <p className="text-lg text-muted-foreground">すべてのペアを見つけよう！</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {(['easy', 'normal', 'hard'] as Difficulty[]).map((diff) => (
                  <Button
                    key={diff}
                    onClick={() => {
                      setDifficulty(diff)
                      initializeGame()
                    }}
                    variant={currentDifficulty === diff ? 'default' : 'outline'}
                    className={currentDifficulty === diff 
                      ? 'bg-gradient-to-r from-primary to-accent text-white font-bold' 
                      : 'font-semibold'}
                  >
                    {DIFFICULTY_CONFIG[diff].label}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👣</span>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold">手数</div>
                  <Badge variant="secondary" className="text-lg px-3 py-1 font-bold bg-secondary text-secondary-foreground">
                    {moves}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold">ペア数</div>
                  <Badge variant="secondary" className="text-lg px-3 py-1 font-bold bg-accent text-accent-foreground">
                    {matches} / {currentPairs}
                  </Badge>
                </div>
              </div>

              {bestScores?.[currentDifficulty] !== null && bestScores?.[currentDifficulty] !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground font-semibold">最高記録</div>
                    <Badge variant="secondary" className="text-lg px-3 py-1 font-bold bg-primary text-primary-foreground">
                      {bestScores[currentDifficulty]}
                    </Badge>
                  </div>
                </div>
              )}

              <Button
                onClick={initializeGame}
                size="lg"
                className="ml-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold shadow-lg"
              >
                <ArrowClockwise className="mr-2" />
                新しいゲーム
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`grid ${DIFFICULTY_CONFIG[currentDifficulty].gridCols} gap-4 max-w-2xl mx-auto`}
        >
          {cards.map((card, index) => (
            <GameCard
              key={card.id}
              emoji={card.emoji}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(index)}
              disabled={isChecking}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setGameWon(false)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-card rounded-3xl p-8 max-w-md w-full text-center space-y-4 border-4 border-primary shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="text-8xl"
                >
                  🏆
                </motion.div>
                <h2 className="text-4xl font-bold text-primary">クリア！</h2>
                <p className="text-xl text-muted-foreground">
                  <span className="font-bold text-accent">{moves}</span>手でクリアしました！
                </p>
                {bestScores?.[currentDifficulty] === moves && (
                  <p className="text-lg font-semibold text-primary">🎉 新記録達成！ 🎉</p>
                )}
                <Button
                  onClick={() => {
                    setGameWon(false)
                    initializeGame()
                  }}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-lg shadow-lg"
                >
                  <ArrowClockwise className="mr-2" />
                  もう一度プレイ
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App