import { Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import checkAuth from './utils/checkAuth';
import MyPageLayout from './components/MyPageLayout';
import MyPage from './Pages/MemberProfile/MyPage';
import Profile from './Pages/MemberProfile/Profile';
import Message from './Pages/MemberProfile/Message';
import Applied from './Pages/MemberProfile/Applied';
import Favorites from './Pages/MemberProfile/Favorites';
import Recent from './Pages/MemberProfile/Recent';
import Resumes from './Pages/MemberProfile/Resumes';
import Edit from './Pages/MemberProfile/ProfileEdit';
import CompanyLandingPage from './Pages/Customer/CompanyLandingPage';
import Top from './Pages/Top';
import CertainJob from './Pages/CertainJob';
import JobDetails from './Pages/CertainJob/JobDetails';
import JobOffer from './Pages/CertainJob/JobOffer';
import CSLayout from './components/CSLayout';
import CLLayout from './components/CLLayout';
import CustomerSignUp from './Pages/Customer/CustomerAuth/CustomerSingUp';
import CustomerSignIn from './Pages/Customer/CustomerAuth/CustomerSignIn';
import Setting from './Pages/MemberProfile/Setting';
import NotFound from './Pages/NotFound';
import { getAllJobTypeValues } from './utils/getFunctions';
import { JobType } from './utils/constants/categories';
import Rule from './Pages/Customer/CustomerRule';
import CLMainLayout from './components/CLMainLayout';
import CLTop from './Pages/Customer/TopPage';
import FacilityPage from './Pages/Customer/FacilityPage';
function App() {
  const { setIsAuthenticated, setUser, user } = useAuth();
  const token = localStorage.getItem('token')

  checkAuth();

  const getUserData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/tokenlogin`);
    setUser(res.data.user)
    setIsAuthenticated(true)
  }
  
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      getUserData()
    }
  },[])
  
  return (
    <>
      <Routes>
        <Route path='/company' element={<CompanyLandingPage />} />
        <Route element={<CLLayout />}>
          <Route path='/customers/new' element={<CustomerSignUp />} />
          <Route path='/customers/sign_in' element={<CustomerSignIn />} />
          <Route path='/customers/rule' element={<Rule />} />
          <Route path='/customers' element={<CLMainLayout />}>
            <Route path='/customers' element={<CLTop />} />
            <Route path='/customers/facility' element={<FacilityPage />} />
          </Route>
        </Route>
        <Route element={<CSLayout />}>
          <Route path='/' element={<Top />} />
          <Route path='/members/sign_up' element={<Register />} />
          <Route path='/members/sign_in' element={<Login />} />
          {getAllJobTypeValues(JobType).map((jobType) => (
            <>
              <Route path={`/${jobType}/:pref?/:employmentType?/:feature?`} element={<CertainJob />} />
              <Route path={`/${jobType}/details/:id/`} element={<JobDetails />} />
              <Route path={`/${jobType}/details/apply/:id`} element={<JobOffer />} />
            </>
          ))}
          {token ? (
            <Route element={<MyPageLayout />}>
              <Route path='/members/mypage' element={<MyPage />} />
              <Route path='/members/profiles' element={<Profile />} />
              <Route path='/members/profiles/edit/*' element={<Edit />} />
              <Route path='/members/message' element={<Message />} />
              <Route path='/members/job_offers/apply' element={<Applied />} />
              <Route path='/members/job_offers/favorite' element={<Favorites />} />
              <Route path='/members/job_offers/recent' element={<Recent />} />
              <Route path='/members/resumes/*' element={<Resumes />} />
              <Route path='/members/settings' element={<Setting />} />
            </Route>
          ) : (
            <Route path='/*' element={<Navigate to="/members/login" />} />
          )}
          {/* 404 Page for Undefined Routes */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
