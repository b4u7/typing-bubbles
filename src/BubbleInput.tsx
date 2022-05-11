import {useCallback, useState} from 'react';
import Bubble from './Bubble';

function BubbleInput({onSubmit}) {
  const [value, setValue] = useState('')

  const handleChange = useCallback(({target: {value: newVal}}) => {
    setValue(newVal)
  }, [setValue])

  const onKeyDown = useCallback(event => {
    if (event.keyCode !== 13) {
      return
    }

    event.preventDefault()
    onSubmit(value)
    setValue('')
  }, [onSubmit, value, setValue]);

  return (
    <Bubble hidden={!value.length}>
      <input
        className={`${!value.length ? 'caret-transparent' : 'caret-slate-800'} appearance-none outline-none bg-transparent `}
        type="text"
        onKeyDown={onKeyDown}
        onChange={handleChange}
        value={value}
      />
    </Bubble>
  )
}

export default BubbleInput