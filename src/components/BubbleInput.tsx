import { useCallback, useRef, useState } from 'react'
import Bubble from './Bubble'

function BubbleInput({ onSubmit }: any) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  const handleChange = useCallback(
    ({ target: { value: newVal } }: any) => {
      setValue(newVal)
    },
    [setValue]
  )

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
    <Bubble hidden={!value.length}>
      <input
        ref={inputRef}
        className={`${
          !value.length ? 'caret-transparent' : 'caret-slate-800'
        } appearance-none outline-none bg-transparent `}
        style={{
          width: `${value.length}ch`,
          minWidth: '4ch',
          padding: '0',
          margin: '0',
        }}
        type="text"
        value={value}
        autoFocus
        onKeyDown={onKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Bubble>
  )
}

export default BubbleInput
