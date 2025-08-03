import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Homepage/Home';
import Register from './Components/Signup/Register';
import JobPage from './Components/JobSeekerPage/JobPage';
import AuthContainer from './Components/AuthContainer/AuthContainer';
import Profile from './Components/ProfilePage/Profile';
import {  UserProvider } from './Components/UserContext';
import JobPostForm from './Components/JobPostForm/JobPostForm';

function AppContent() {
  return (
    <>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Navigate to="/page/home" />} />
          <Route path='/page/login' element={<AuthContainer />} />
          <Route path='/page/home' element={<Home />} />
          <Route path='/page/register' element={<Register />} />
          <Route path='/page/jobpage' element={<JobPage />} />
          <Route path='/page/profile' element={<Profile />} />
          <Route path='/page/jobpostform' element={<JobPostForm/>}/>
        </Routes>
    </>
  );
}

function App(){
  return (
    <div className="App">
      <UserProvider>
        <AppContent/>
      </UserProvider>
    </div>
  )
}

export default App;
