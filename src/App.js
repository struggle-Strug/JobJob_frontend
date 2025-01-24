import './index.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import { getAllJobTypeValues, getAllPrefectureValues } from './utils/getFunctions';
import { JobType } from './utils/constants/categories';
import { Prefectures } from './utils/constants/categories/prefectures';
import { Spin } from 'antd';
import Loading from './components/Loading';

// Lazy load components
const Register = lazy(() => import('./Pages/Auth/Register'));
const Login = lazy(() => import('./Pages/Auth/Login'));
const MyPageLayout = lazy(() => import('./components/MyPageLayout'));
const MyPage = lazy(() => import('./Pages/MemberProfile/MyPage'));
const Profile = lazy(() => import('./Pages/MemberProfile/Profile'));
const Message = lazy(() => import('./Pages/MemberProfile/Message'));
const Applied = lazy(() => import('./Pages/MemberProfile/Applied'));
const Favorites = lazy(() => import('./Pages/MemberProfile/Favorites'));
const Recent = lazy(() => import('./Pages/MemberProfile/Recent'));
const Resumes = lazy(() => import('./Pages/MemberProfile/Resumes'));
const Edit = lazy(() => import('./Pages/MemberProfile/ProfileEdit'));
const CompanyLandingPage = lazy(() => import('./Pages/Customer/CompanyLandingPage'));
const Top = lazy(() => import('./Pages/Top'));
const CertainJob = lazy(() => import('./Pages/CertainJob'));
const JobDetails = lazy(() => import('./Pages/CertainJob/JobDetails'));
const JobLists = lazy(() => import('./Pages/CertainJob/JobLists'));
const JobOffer = lazy(() => import('./Pages/CertainJob/JobOffer'));
const CSLayout = lazy(() => import('./components/CSLayout'));
const CLLayout = lazy(() => import('./components/CLLayout'));
const CustomerSignUp = lazy(() => import('./Pages/Customer/CustomerAuth/CustomerSingUp'));
const CustomerSignIn = lazy(() => import('./Pages/Customer/CustomerAuth/CustomerSignIn'));
const Setting = lazy(() => import('./Pages/MemberProfile/Setting'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const Rule = lazy(() => import('./Pages/Customer/CustomerRule'));
const CLMainLayout = lazy(() => import('./components/CLMainLayout'));
const CLTop = lazy(() => import('./Pages/Customer/TopPage'));
const FacilityPage = lazy(() => import('./Pages/Customer/FacilityPage'));
const FacilityEdit = lazy(() => import('./Pages/Customer/FacilityPage/FacilityEdit'));
const JobPostEdit = lazy(() => import('./Pages/Customer/FacilityPage/JobPostEdit'));

function App() {
  const { setIsAuthenticated, setUser, user, setCustomer, customer } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const { pathname } = useLocation();
  const pref = pathname.split("/")[2];

  const getUserData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/tokenlogin`);
      res.data.user.type === "member" && setUser(res.data.user.data);
      res.data.user.type === "member" && setIsAuthenticated(true);
      res.data.user.type === "customer" && setCustomer(res.data.user.data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false); // Ensure loading state is updated
    }
  };
  
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      getUserData();
    } else {
      setIsLoading(false); // No token, skip loading
    }
  }, [token]);

  if (isLoading) {
      return (<Loading />);
  }

  return (
    <Suspense  fallback={<Loading />}>
      <Routes>
        <Route path='/company' element={<CompanyLandingPage />} />
        <Route path='/customers/new' element={<CustomerSignUp />} />
        <Route path='/customers/sign_in' element={<CustomerSignIn />} />
        {token && customer ? (
          <Route element={<CLLayout />}>
            <Route path='/customers/rule' element={<Rule />} />
            <Route path='/customers' element={<CLMainLayout />}>
              <Route path='/customers' element={<CLTop />} />
              <Route path='/customers/facility' element={<FacilityPage />} />
              <Route path='/customers/facility/edit/:facility_id' element={<FacilityEdit />} />
              <Route path='/customers/jobpost/edit/:jobpost_id' element={<JobPostEdit />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        ) : (
          <Route path='/*' element={<CustomerSignIn />} />
        )}
        <Route element={<CSLayout />}>
          <Route path='/' element={<Top />} />
          <Route path='/members/sign_up' element={<Register />} />
          <Route path='/members/sign_in' element={<Login />} />
          <Route path='/:jobtype/details/:id' element={<JobDetails />} />
          <Route path='/:jobtype/apply/:id' element={<JobOffer />} />
          {getAllJobTypeValues(JobType).map((jobType) => {
            const hasPrefecture = getAllPrefectureValues(Prefectures).includes(pref);
            return hasPrefecture ? (
              <Route
                key={jobType}
                path={`/${jobType}/${pref}/:employmentType?/:feature?`}
                element={<JobLists />}
              />
            ) : (
              <Route
                key={jobType}
                path={`/${jobType}/:employmentType?/:feature?`}
                element={<CertainJob />}
              />
            );
          })}
          {token && user?.role === "member" ? (
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
            <Route path='/*' element={<Navigate to="/members/sign_in" />} />
          )}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
