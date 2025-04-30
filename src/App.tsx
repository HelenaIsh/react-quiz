import './App.css';
import DateCounter from './DateCounter.tsx';
import Error from './Error.tsx';
import Header from './Header.tsx';
import Loader from './Loader.tsx';

function App() {
  return (
    <>
      <Header />
      <DateCounter />
      <Error />
      <Loader />
    </>
  );
}

export default App;
