import { ChangeEvent, useReducer } from 'react';

interface DateCounterState {
  count: number;
  step: number;
}

type DateCounterAction =
  | {
      type: 'increment' | 'decrement' | 'setCount' | 'setStep';
      payload: number;
    }
  | { type: 'reset' };

const initialState = { count: 0, step: 1 };

const reducer = (state: DateCounterState, action: DateCounterAction) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + action.payload };
    case 'decrement':
      return { ...state, count: state.count - action.payload };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'decrement', payload: step });
  };

  const inc = function () {
    dispatch({ type: 'increment', payload: step });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) || 0 });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
