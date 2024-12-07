import { Route, Routes } from 'react-router-dom';
import './index.css';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Register from './Pages/Register';
import Login from './Pages/Login';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path='/members/register' element={<Register />} />
            <Route path='/members/login' element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
