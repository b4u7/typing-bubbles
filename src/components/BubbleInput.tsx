import { useCallback, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Bubble from './Bubble'

function BubbleInput({ onSubmit }: any) {
  const bubbleRef = useRef<HTMLDivElement>(null)
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
    <CSSTransition
      in={visible}
      timeout={0}
      nodeRef={bubbleRef}
      classNames="fade"
    >
      <Bubble hidden={!visible} ref={bubbleRef}>
        <input
          ref={inputRef}
          className={`${
            !visible ? 'caret-transparent' : 'caret-slate-800'
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
      </Bubble>
    </CSSTransition>
  )
}

export default BubbleInput
