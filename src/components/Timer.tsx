import { useEffect } from 'react';
import { AppAction } from './App.tsx';

function Timer({
  dispatch,
  seconds,
}: {
  seconds: number;
  dispatch: (action: AppAction) => void;
}) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
  return (
    <div className={'timer'}>
      {mins} : {secs}
    </div>
  );
}

export default Timer;
