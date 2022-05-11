import Bubble from './Bubble';
import BubbleInput from './BubbleInput';
import {useCallback, useReducer} from 'react';

function App() {
  const [state, dispatch] = useReducer((state, item) => state.concat(item), [], undefined)

  const onSubmit = useCallback((data) => {
    dispatch(data)
  }, [dispatch])

  return (
    <div className="h-screen w-screen">
      <div className="py-4 container mx-auto">
        <div className="space-y-4">
          {state.map(
            (item, index) =>
              <Bubble key={`${item}-${index}`}>
                <p>
                  {item}
                </p>
              </Bubble>
          )}
          <BubbleInput onSubmit={onSubmit}></BubbleInput>
        </div>
      </div>
    </div>
  )
}

export default App;
