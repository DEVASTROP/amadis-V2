'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function TextRotate({
  texts,
  rotationInterval = 3000,
  transition = { type: 'spring', damping: 30, stiffness: 400 },
  mainClassName = '',
  staggerDuration = 0.03,
  staggerFrom = 'last',
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length)
    }, rotationInterval)
    return () => clearInterval(interval)
  }, [texts.length, rotationInterval])

  const currentText = texts[currentIndex]
  const characters = currentText.split('')

  const getDelay = (i) => {
    if (staggerFrom === 'last') {
      return (characters.length - 1 - i) * staggerDuration
    }
    return i * staggerDuration
  }

  return (
    <span className={mainClassName}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          style={{ display: 'inline-flex', overflow: 'hidden' }}
        >
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ ...transition, delay: getDelay(i) }}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
