import { Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import checkAuth from './utils/checkAuth';
import Dashboard from './Pages/Dashboard';
import MyPageLayout from './components/MyPageLayout';
import MyPage from './Pages/MemberProfile/MyPage';
import Profile from './Pages/MemberProfile/Profile';
import Message from './Pages/MemberProfile/Message';
import Applied from './Pages/MemberProfile/Applied';
import Favorites from './Pages/MemberProfile/Favorites';
import Recent from './Pages/MemberProfile/Recent';
import Resumes from './Pages/MemberProfile/Resumes';
import Edit from './Pages/MemberProfile/ProfileEdit';
import CompanyLandingPage from './Pages/CompanyLandingPage';
import Top from './Pages/Top';
import CertainJobList from './Pages/CertainJobList';
function App() {
  const { setIsAuthenticated, setUser } = useAuth();
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
        <Route element={<Layout />}>
          <Route path='/company' element={<CompanyLandingPage />} />
          <Route path='/' element={<Top />} />
          <Route path='/members/sign_up' element={<Register />} />
          <Route path='/members/sign_in' element={<Login />} />
          <Route path='/*' element={<CertainJobList />} />
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
            </Route>
          ) : (
            <Route path='/*' element={<Navigate to="/members/login" />} />
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
