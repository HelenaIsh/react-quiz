import '../App.css';
import Header from './Header.tsx';
import MainComponent from './MainComponent.tsx';
import { useEffect, useReducer } from 'react';
import Loader from './Loader.tsx';
import ErrorComponent from './ErrorComponent.tsx';
import StartScreen from './StartScreen.tsx';
import Question from './Question.tsx';
import NextButton from './NextButton.tsx';
import Progress from './Progress.tsx';
import FinishScreen from './FinishScreen.tsx';

type AppState = {
  questions: QuestionType[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
};

export type AppAction =
  | {
      type: 'dataReceived';
      payload: QuestionType[];
    }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' };

export type QuestionType = {
  question: string;
  id: string;
  correctOption: number;
  points: 10;
  options: string[];
};

const initialState: AppState = {
  questions: [],
  status: 'loading' as const,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

const reducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' as const };
    case 'dataFailed':
      return { ...state, status: 'error' as const };
    case 'start':
      return { ...state, status: 'active' as const };
    case 'newAnswer': {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case 'nextQuestion': {
      return { ...state, index: state.index + 1, answer: null };
    }
    case 'finish':
      return {
        ...state,
        status: 'finished' as const,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready' as const,
        highScore: state.highScore,
      };
    default:
      throw new Error('Unknown action type');
  }
};

function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainComponent>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorComponent />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            {answer !== null && (
              <NextButton
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            )}
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </MainComponent>
    </div>
  );
}

export default App;
