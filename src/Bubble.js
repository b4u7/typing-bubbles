import React from 'react'

function Bubble(props) {
  return (
    <div
      className={`${props.hidden ? 'bg-transparent' : 'bg-white'} text-slate-900 p-4 rounded-2xl transition dark:bg-slate-500 dark:text-slate-100`}
    >
      {props.children}
    </div>
  )
}

export default Bubble
