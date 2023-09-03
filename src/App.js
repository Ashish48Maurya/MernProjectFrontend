// import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Error from './components/Error';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Notes from './components/Notes';

function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/notes' element={<Notes />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>

  );
}

export default App;