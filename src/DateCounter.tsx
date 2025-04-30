import { ChangeEvent, useReducer, useState } from 'react';

const reducer = (state: number, action: { type: string; payload: number }) => {
  switch (action.type) {
    case 'increment':
      return state + action.payload;
    case 'decrement':
      return state - action.payload;
    case 'setCount':
      return action.payload;
    default:
      return state;
  }
};

function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, dispatch] = useReducer(reducer, 0);

  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'decrement', payload: step });
  };

  const inc = function () {
    dispatch({ type: 'increment', payload: step });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: 'setCount', payload: 0 });
    setStep(1);
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
