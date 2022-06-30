import { motion } from 'framer-motion'
import { forwardRef, ReactElement } from 'react'
import '../styles/bubble.css'

type content = {
  hidden?: boolean
  children: string | number | boolean | ReactElement
}

const Bubble = forwardRef<HTMLDivElement, content>((props, ref) => (
  <div
    ref={ref}
    className="bubble bg-white relative w-fit text-slate-900 p-4 rounded-3xl dark:bg-slate-500 dark:text-slate-100"
  >
    {props.children}
  </div>
))

const MotionBubble = motion(Bubble, { forwardMotionProps: true })

export default MotionBubble
