import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Authentication/Login/Login';
import SignUp from './pages/Authentication/Signup/SignUp';
import ForgetPassword from './pages/Authentication/Forgetpassword/ForgetPassword';
import Verification from './pages/Authentication/Verification/verification';
import ResetPassword from './pages/Authentication/Resetpassword/ResetPassword';
import ResetSuccess from './pages/Authentication/Resetsuccess/ResetSuccess';
import Landing from './pages/Landing-page/Landing';
import GrantDetails from './components/GrantDetails/GrantDetails';
import Profile from "./pages/Profile/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/GrantDetails" element={<GrantDetails />} />
        <Route path="/Profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
