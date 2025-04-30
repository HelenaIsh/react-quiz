import { AppAction } from './App.tsx';

function NextButton({
  dispatch,
  index,
  numQuestions,
}: {
  dispatch: (action: AppAction) => void;
  index: number;
  numQuestions: number;
}) {
  if (index === numQuestions - 1) {
    return (
      <button className="btn" onClick={() => dispatch({ type: 'finish' })}>
        Finish
      </button>
    );
  }
  return (
    <button className="btn" onClick={() => dispatch({ type: 'nextQuestion' })}>
      Next Question
    </button>
  );
}

export default NextButton;
