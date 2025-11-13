import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Homepage/Home';
import Register from './Components/Signup/Register';
import JobPage from './Components/JobSeekerPage/JobPage';
import AuthContainer from './Components/AuthContainer/AuthContainer';
import Profile from './Components/ProfilePage/Profile';
import { UserProvider } from './Components/UserContext';
import JobPostForm from './Components/JobPostForm/JobPostForm';
import Footer from './Components/Footer/Footer';
import ContactUs from './Components/ContactUsForm/ContactUs';
import HelpCenter from './Components/HelpPage/HelpCenter';
import ResumeBuilder from './Components/Resume Section/ResumeBuilder';
import RecruiterRegistration from './Components/RecruiterPage/RecruiterRegistration';
import ForgotPassword from './Components/Password/ForgotPassword';
import ApplicationTracking from './Components/JobSeekerPage/ApplicationTracking';
import RecruiterProfile from './Components/ProfilePage/RecruiterProfile';
import ApplyJob from './Components/JobSeekerPage/ApplyJob';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import PublicRoute from './RouteAccess/PublicRoute';
import ProtectedRoute from './RouteAccess/ProtectedRoute';
import ProfilePerformance from './Components/ProfilePage/ProfilePerformance';
import SettingsPage from './Components/Settings page/SettingsPage';
import ScrollToTop from './Components/ScrollToTop';
import SavedJobs from './Components/JobSeekerPage/SavedJobs';

function AppContent() {
  return (
    <>
        <ScrollToTop />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path='/' element={<Navigate to="/page/jobpage" />} />
            <Route path='/page/login' element={
              <PublicRoute>
                <AuthContainer />
              </PublicRoute>
            } />
            <Route path='/page/home' element={<Home />} />
            <Route path='/page/register' element={<Register />} />
            <Route path='/page/jobpage' element={<JobPage />} />
            <Route path='/page/jobseeker-profile' element={
              <ProtectedRoute roles={["USER"]} >
                <Profile />
              </ProtectedRoute>
            } />

            <Route path='/profile-performance' element={<ProfilePerformance />} />
            <Route path='/setting-page' element={<SettingsPage />} />
            <Route path='/page/recruiter-profile' element={
              <ProtectedRoute roles={["RECRUITER"]}>
                <RecruiterProfile />
              </ProtectedRoute>
            } />
            <Route path='/page/jobpostform' element={
              <ProtectedRoute roles={["RECRUITER"]} >
                <JobPostForm />
              </ProtectedRoute>
            } />
            <Route path='/page/contactus' element={<ContactUs />} />
            <Route path='/page/helpcenter' element={<HelpCenter />} />
            <Route path='/page/resumebuilder' element={<ResumeBuilder />} />
            <Route path='/page/recruiterform' element={<RecruiterRegistration />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/job-seeker-applied-jobs' element={
              <ProtectedRoute roles={["USER"]}>
                <ApplicationTracking />
              </ProtectedRoute>
            } />
            <Route path='/job-seeker-saved-jobs' element={
              <ProtectedRoute roles={["USER"]}>
                <SavedJobs />
              </ProtectedRoute>
            } />
            <Route path='/apply/:jobId' element={<ApplyJob />} />

          </Routes>
        </div>
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={3}
        />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <UserProvider>
        <AppContent />
      </UserProvider>
    </div>
  )
}

export default App;
