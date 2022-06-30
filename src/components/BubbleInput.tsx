import { useCallback, useRef, useState } from 'react'
import MotionBubble from './Bubble'

function BubbleInput({ onSubmit }: any) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  const [visible, setVisible] = useState(false)

  const handleChange = useCallback(
    ({ target: { value: newVal } }: any) => {
      setValue(newVal)
    },
    [setValue]
  )

  const onKeyUp = useCallback(() => {
    setVisible(value.length > 0)
  }, [value, setVisible])

  const onKeyDown = useCallback(
    (event: any) => {
      if (event.keyCode !== 13) {
        return
      }

      event.preventDefault()
      onSubmit(value)
      setValue('')
    },
    [onSubmit, value, setValue]
  )

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      if (!inputRef.current) {
        return
      }

      inputRef.current.focus()
    }, 0)
  }, [inputRef])

  return (
    <MotionBubble
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      exit={{ opacity: 0 }}
    >
      <input
        ref={inputRef}
        className={`${
          !value.length ? 'caret-transparent' : 'caret-slate-800'
        } bubble-input appearance-none outline-none bg-transparent`}
        style={{ width: `${value.length}ch` }}
        type="text"
        value={value}
        autoFocus
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </MotionBubble>
  )
}

export default BubbleInput
