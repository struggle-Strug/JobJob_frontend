import "./index.css";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import {
  getAllFacilityValues,
  getAllJobTypeValues,
  getAllPrefectureValues,
} from "./utils/getFunctions";

// Lazy load components
const Register = lazy(() => import("./Pages/Auth/Register"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const ForgotPasswordRequest = lazy(() =>
  import("./Pages/Auth/ForgotPassword/ForgotPasswordRequest")
);
const ResetPassword = lazy(() =>
  import("./Pages/Auth/ForgotPassword/ResetPassword")
);
const MyPageLayout = lazy(() => import("./components/MyPageLayout"));
const MyPage = lazy(() => import("./Pages/MemberProfile/MyPage"));
const Profile = lazy(() => import("./Pages/MemberProfile/Profile"));
const Message = lazy(() => import("./Pages/MemberProfile/Message"));
const Applied = lazy(() => import("./Pages/MemberProfile/Applied"));
const Favorites = lazy(() => import("./Pages/MemberProfile/Favorites"));
const Recent = lazy(() => import("./Pages/MemberProfile/Recent"));
const Resumes = lazy(() => import("./Pages/MemberProfile/Resumes"));
const Edit = lazy(() => import("./Pages/MemberProfile/ProfileEdit"));
const CompanyLandingPage = lazy(() =>
  import("./Pages/Customer/CompanyLandingPage")
);
const Top = lazy(() => import("./Pages/Top"));
const CertainJob = lazy(() => import("./Pages/CertainJob"));
const JobDetails = lazy(() => import("./Pages/CertainJob/JobDetails"));
const JobLists = lazy(() => import("./Pages/CertainJob/JobLists"));
const JobOffer = lazy(() => import("./Pages/CertainJob/JobOffer"));
const CSLayout = lazy(() => import("./components/CSLayout"));
const CLLayout = lazy(() => import("./components/CLLayout"));
const CLLogoLayout = lazy(() => import("./components/CLLayout/CLLogoLayout"));
const CustomerSignUp = lazy(() =>
  import("./Pages/Customer/CustomerAuth/CustomerSignUp")
);
const CustomerSignIn = lazy(() =>
  import("./Pages/Customer/CustomerAuth/CustomerSignIn")
);
const Setting = lazy(() => import("./Pages/MemberProfile/Setting"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Preparing = lazy(() => import("./Pages/Preparing"));
const Rule = lazy(() => import("./Pages/Customer/Rule"));
const CLMainLayout = lazy(() => import("./components/CLMainLayout"));
const CLTop = lazy(() => import("./Pages/Customer/TopPage"));
const FacilityPage = lazy(() => import("./Pages/Customer/FacilityPage"));
const FacilityEdit = lazy(() =>
  import("./Pages/Customer/FacilityPage/FacilityEdit")
);
const JobPostEdit = lazy(() =>
  import("./Pages/Customer/FacilityPage/JobPostEdit")
);
const Loading = lazy(() => import("./components/Loading"));
const MessageDetail = lazy(() =>
  import("./Pages/MemberProfile/Message/MessageDetail")
);
const ProcessManagementPage = lazy(() =>
  import("./Pages/Customer/ProcessManagementPage")
);
const PhotoManagement = lazy(() => import("./Pages/Customer/PhotoManagement"));
const CLMessage = lazy(() => import("./Pages/Customer/Message"));
const CustomerSetting = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage")
);
const MailChange = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/MailChange")
);
const PasswordChange = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/PasswordChange")
);
const CoporateInformation = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/CoporateInformation")
);
const CoporateManagement = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/CoporateManagement")
);

const CertainFacility = lazy(() => import("./Pages/CertiainFacility"));
const FacilityAdd = lazy(() =>
  import("./Pages/Customer/FacilityPage/FacilityAdd")
);
const FacilityDetails = lazy(() =>
  import("./Pages/CertiainFacility/FacilityDetails")
);
const AddJobPost = lazy(() =>
  import("./Pages/Customer/FacilityPage/AddJobPost")
);
const CSRule = lazy(() => import("./Pages/Rule"));
const Coporate = lazy(() => import("./Pages/CoporatePage"));
const LinkRequirement = lazy(() => import("./Pages/LinkRequirement"));

function App() {
  const {
    setIsAuthenticated,
    setUser,
    user,
    setCustomer,
    customer,
    admin,
    setAdmin,
  } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();
  const prefOrFacility = pathname.split("/")[2];
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/tokenlogin`
      );
      res.data.user.type === "member" && setUser(res.data.user.data);
      res.data.user.type === "member" && setIsAuthenticated(true);
      res.data.user.type === "customer" && setCustomer(res.data.user.data);
      res.data.user.type === "admin" && setAdmin(res.data.user.data);
    } catch (err) {
      if (err.response?.status === 401) {
        message.error("ログインしてください。");
        localStorage.removeItem("token"); // Remove token from localStorage
        setIsAuthenticated(false); // Set authentication state to false
        setTimeout(() => {
          navigate("/"); // Redirect to login page after a short delay
        }, 500);
      }
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
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<CSLayout />}>
          <Route path="/rule" element={<CSRule />} />
          <Route path="/" element={<Top />} />
          <Route path="/coporate" element={<Coporate />} />
          <Route path="/forgot-password" element={<ForgotPasswordRequest />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/members/sign_up" element={<Register />} />
          <Route path="/members/sign_in" element={<Login />} />
          <Route path="/:jobtype/apply/:id" element={<JobOffer />} />

          {getAllJobTypeValues().map((jobType) => {
            const hasPrefecture =
              getAllPrefectureValues().includes(prefOrFacility);
            const hasFacility = getAllFacilityValues().includes(prefOrFacility);
            if (hasPrefecture) {
              return (
                <Route
                  key={jobType}
                  path={`/${jobType}/${prefOrFacility}/*`}
                  element={<JobLists />}
                />
              );
            }

            if (hasFacility) {
              return (
                <Route
                  key={jobType}
                  path={`/${jobType}/${prefOrFacility}/:employmentType?/:pref?`}
                  element={<CertainFacility />}
                />
              );
            }
            if (pathname.split("/").length >= 3) {
              const prefOrMuniOrJobId = pathname.split("/").pop();

              if (
                !prefOrMuniOrJobId.includes("muni") &&
                !prefOrMuniOrJobId.includes("pref") &&
                !prefOrMuniOrJobId.includes("search")
              ) {
                return (
                  <Route path={`/${jobType}/:id`} element={<JobDetails />} />
                );
              }

              if (prefOrMuniOrJobId.includes("muni")) {
                return (
                  <Route path={`/${jobType}/:muniId`} element={<JobLists />}>
                    <Route path="modal/:modal" element={<JobLists />} />
                  </Route>
                );
              }

              if (prefOrMuniOrJobId.includes("pref")) {
                return (
                  <Route path={`/${jobType}/:prefId`} element={<JobLists />}>
                    <Route path="modal/:modal" element={<JobLists />} />
                  </Route>
                );
              }

              if (prefOrFacility === "search") {
                const filters = params.get("filters")
                  ? JSON.parse(decodeURIComponent(params.get("filters")))
                  : {};

                return (
                  <Route
                    key={`${jobType}-search`}
                    path={`/${jobType}/search/*`}
                    element={
                      filters.pref === undefined || filters.pref === "" ? (
                        <CertainJob />
                      ) : (
                        <JobLists />
                      )
                    }
                  />
                );
              }
            }

            return (
              <>
                <Route
                  key={jobType}
                  path={`/${jobType}/*`}
                  element={<CertainJob />}
                />
                <Route
                  key={jobType}
                  path={`/${jobType}/search/*`}
                  element={<CertainJob />}
                />
                <Route
                  path={`${jobType}/:pref?/:muni?/:employmentType?/:feature?/*`}
                  element={<JobLists />}
                />
              </>
            );
          })}
          <Route path={"/facility/:id"} element={<FacilityDetails />} />
          {getAllFacilityValues().map((facility) => {
            return (
              <Route
                key={facility}
                path={`/${facility}/:employmentType?/:pref?`}
                element={<CertainFacility />}
              />
            );
          })}
          {token && user?.role === "member" ? (
            <Route element={<MyPageLayout />}>
              <Route path="/members/mypage" element={<MyPage />} />
              <Route path="/members/profiles" element={<Profile />} />
              <Route path="/members/profiles/edit/*" element={<Edit />} />
              <Route path="/members/message" element={<Message />} />
              <Route path="/members/message/:id" element={<MessageDetail />} />
              <Route path="/members/job_offers/apply" element={<Applied />} />
              <Route
                path="/members/job_offers/favorite"
                element={<Favorites />}
              />
              <Route path="/members/job_offers/recent" element={<Recent />} />
              <Route path="/members/resumes/*" element={<Resumes />} />
              <Route path="/members/settings" element={<Setting />} />
            </Route>
          ) : (
            <Route path="/*" element={<Navigate to="/members/sign_in" />} />
          )}
          <Route path="*" element={<NotFound />} />
          <Route path="/contact" element={<Preparing />} />
        </Route>
        <Route path="/company" element={<CompanyLandingPage />} />
        <Route element={<CLLogoLayout />}>
          <Route path="/customers/new" element={<CustomerSignUp />} />
          <Route path="/customers/sign_in" element={<CustomerSignIn />} />
          <Route path="/customers/rule" element={<Rule />} />
          <Route path="/customers/banner" element={<LinkRequirement />} />
        </Route>
        {token && (customer || admin) ? (
          <>
            <Route element={<CLLayout />}>
              <Route path="/customers" element={<CLMainLayout />}>
                <Route path="/customers" element={<CLTop />} />
                <Route
                  path="/customers/facility/add"
                  element={<FacilityAdd />}
                />
                <Route path="/customers/facility" element={<FacilityPage />} />
                <Route
                  path="/customers/facility/edit/:facility_id"
                  element={<FacilityEdit />}
                />
                <Route
                  path="/customers/jobpost/edit/:jobpost_id"
                  element={<JobPostEdit />}
                />
                <Route
                  path="/customers/jobpost/:facilityId/add"
                  element={<AddJobPost />}
                />
                <Route
                  path="/customers/recruit/edit/"
                  element={<ProcessManagementPage />}
                />
                <Route
                  path="/customers/picture/"
                  element={<PhotoManagement />}
                />
                <Route path="/customers/message" element={<CLMessage />} />
                <Route
                  path="/customers/settings/"
                  element={<CustomerSetting />}
                />
                <Route
                  path="/customers/settings/mail"
                  element={<MailChange />}
                />
                <Route
                  path="/customers/settings/pass"
                  element={<PasswordChange />}
                />
                <Route
                  path="/customers/settings/corporate/"
                  element={<CoporateInformation />}
                />
                <Route
                  path="/customers/settings/user"
                  element={<CoporateManagement />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
              <Route path="/customers/contact" element={<Preparing />} />
            </Route>
          </>
        ) : (
          <Route element={<CLLogoLayout />}>
            <Route path="/*" element={<CustomerSignIn />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}

export default App;
