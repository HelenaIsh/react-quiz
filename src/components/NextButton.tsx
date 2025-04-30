import { AppAction } from './App.tsx';

function NextButton({ dispatch }: { dispatch: (action: AppAction) => void }) {
  return (
    <button className="btn" onClick={() => dispatch({ type: 'nextQuestion' })}>
      Next Question
    </button>
  );
}

export default NextButton;
