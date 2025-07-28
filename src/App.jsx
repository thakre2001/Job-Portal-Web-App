import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Homepage/Home';
import Register from './Components/Signup/Register';
import JobPage from './Components/JobSeekerPage/JobPage';
import AuthContainer from './Components/AuthContainer/AuthContainer';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Navigate to="/page/home"/>}/>
          <Route path='/page/login' element={<AuthContainer/>}/>
          <Route path='/page/home' element={<Home/>}/>
          <Route path='/page/register' element={<Register/>}/>
          <Route path='/page/jobpage' element={<JobPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
