import Bubble from './Bubble'
import BubbleInput from './BubbleInput'
import { createRef, useCallback, useReducer } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

enum ActionKind {
  Add = 'ADD',
  Remove = 'REMOVE',
}

type Payload = {
  id: number
  message: string
}

type Action = {
  type: ActionKind
  payload: Payload
}

type State = Map<number, string>

function reducer(state: State, action: Action): State {
  const {
    type,
    payload: { id, message },
  } = action

  switch (type) {
    case ActionKind.Add:
      return new Map(state).set(id, message)

    case ActionKind.Remove:
      const newState = new Map(state)
      newState.delete(id)

      return newState
  }
}

let currId = 0

function App() {
  const [state, dispatch] = useReducer(reducer, new Map(), undefined)

  const onSubmit = useCallback(
    (data: string) => {
      const payload = {
        id: currId,
        message: data,
      }

      dispatch({ type: ActionKind.Add, payload })

      setTimeout(() => {
        dispatch({ type: ActionKind.Remove, payload })
      }, 5000)

      currId++
    },
    [dispatch]
  )

  return (
    <div className="h-screen w-screen">
      <div className="h-full container mx-auto">
        <div className="h-full py-4 space-y-4 overflow-hidden flex flex-col justify-end">
          <TransitionGroup className="space-y-4">
            {Array.from(state.entries()).map(([id, item]) => {
              const bubbleRef = createRef<HTMLDivElement>()

              return (
                <CSSTransition
                  key={id}
                  nodeRef={bubbleRef}
                  timeout={500}
                  classNames="fade"
                >
                  <Bubble ref={bubbleRef}>
                    <p>{item}</p>
                  </Bubble>
                </CSSTransition>
              )
            })}
          </TransitionGroup>
          <BubbleInput onSubmit={onSubmit}></BubbleInput>
        </div>
      </div>
    </div>
  )
}

export default App
