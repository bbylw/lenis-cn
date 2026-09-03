import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** 视口内露出多少比例才触发，默认 0.2 */
  amount?: number
}

export function Reveal({ children, className, delay = 0, amount = 0.2 }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

type RevealGroupProps = {
  children: ReactNode
  className?: string
  /** 子元素依次延迟出现的步长（秒） */
  step?: number
}

/** 让一组子元素按顺序浮现，用于列表、卡片网格。只适合矮容器，长列表请逐项用 Reveal。 */
export function RevealGroup({ children, className, step = 0.05 }: RevealGroupProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: reduce ? 0 : step } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}
