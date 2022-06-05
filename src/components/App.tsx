import Bubble from './Bubble'
import BubbleInput from './BubbleInput'
import { useCallback, useReducer, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

enum ActionKind {
  Add = 'ADD',
  Remove = 'REMOVE',
}

type Action = {
  type: ActionKind
  payload?: string
}

type State = string[]

function reducer(state: State, action: Action): State {
  const { type, payload } = action

  switch (type) {
    case ActionKind.Add:
      return payload ? state.concat(payload) : state

    case ActionKind.Remove:
      return state.slice(1)

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, [], undefined)
  const nodeRef = useRef(null)

  const onSubmit = useCallback(
    (data: string) => {
      dispatch({ type: ActionKind.Add, payload: data })

      setTimeout(() => {
        dispatch({ type: ActionKind.Remove })
      }, 2000)
    },
    [dispatch]
  )

  return (
    <div className="h-screen w-screen">
      <div className="h-full container mx-auto">
        <div className="h-full py-4 space-y-4 overflow-hidden flex flex-col justify-end">
          <TransitionGroup>
            {state.map((item: string, index: number) => (
              <CSSTransition
                nodeRef={nodeRef}
                appear={true}
                key={`${item}-${index}`}
                timeout={500}
                classNames="fade"
                unmountOnExit
              >
                <Bubble ref={nodeRef}>
                  <p>{item}</p>
                </Bubble>
              </CSSTransition>
            ))}
          </TransitionGroup>
          <BubbleInput onSubmit={onSubmit}></BubbleInput>
        </div>
      </div>
    </div>
  )
}

export default App
