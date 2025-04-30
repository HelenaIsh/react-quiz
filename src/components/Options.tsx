import { AppAction, QuestionType } from './App.tsx';

function Options({
  question,
  dispatch,
  answer,
}: {
  question: QuestionType;
  dispatch: (action: AppAction) => void;
  answer: number | null;
}) {
  const hasAnswered = answer !== null;
  return (
    <>
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? 'answer' : ''}  ${hasAnswered ? (i === question.correctOption ? 'correct' : 'wrong') : ''} `}
          key={option}
          onClick={() => {
            dispatch({ type: 'newAnswer', payload: i });
          }}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Options;
