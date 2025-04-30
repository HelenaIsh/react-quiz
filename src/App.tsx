import './App.css';
import Header from './Header.tsx';
import MainComponent from './MainComponent.tsx';
import { useEffect, useReducer } from 'react';
import Loader from './Loader.tsx';
import ErrorComponent from './ErrorComponent.tsx';
import StartScreen from './StartScreen.tsx';

type AppState = {
  questions: string[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
};

type AppAction =
  | {
      type: 'dataReceived';
      payload: string[];
    }
  | { type: 'dataFailed' };

const initialState: AppState = {
  questions: [],
  status: 'loading' as const,
};

const reducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' as const };
    case 'dataFailed':
      return { ...state, status: 'error' as const };
    default:
      throw new Error('Unknown action type');
  }
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
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
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
      </MainComponent>
    </div>
  );
}

export default App;
