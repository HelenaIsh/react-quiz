import { AppAction } from './App.tsx';

function FinishScreen({
  points,
  maxPoints,
  highScore,
  dispatch,
}: {
  points: number;
  maxPoints: number;
  highScore: number;
  dispatch: (action: AppAction) => void;
}) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🥈';
  if (percentage >= 50 && percentage < 80) emoji = '🥉';
  if (percentage > 0 && percentage < 50) emoji = '🧐';
  if (percentage === 0) emoji = '🤦‍♀️';

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
        {maxPoints} ({percentage}%)
      </p>
      <p className={'highscore'}>High Score: {highScore}</p>
      <button className="btn" onClick={() => dispatch({ type: 'restart' })}>
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
