import {Route, Routes} from 'react-router-dom';
import Home from './features/Home/Home.tsx';

const App = () => {

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>

    </>
  );
};

export default App;