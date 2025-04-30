import { QuestionType } from './App.tsx';
import Options from './Options.tsx';
import { AppAction } from './App.tsx';

function Question({
  question,
  dispatch,
  answer,
}: {
  question: QuestionType;
  dispatch: (action: AppAction) => void;
  answer: number | null;
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Options question={question} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}
export default Question;
