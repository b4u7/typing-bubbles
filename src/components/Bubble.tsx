import React from 'react'
import '../styles/bubble.css'

function Bubble(props: {
  hidden?: boolean
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
}) {
  return (
    <div
      className={`${
        props.hidden ? 'opacity-0' : 'opacity-100'
      } bubble bg-white relative w-fit text-slate-900 p-4 rounded-3xl transition dark:bg-slate-500 dark:text-slate-100`}
    >
      {props.children}
    </div>
  )
}

export default Bubble
