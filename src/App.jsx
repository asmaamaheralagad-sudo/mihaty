import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgetPassword from './components/ForgetPassword'; 
import Verification from './components/verification';
import ResetPassword from './components/ResetPassword';
import ResetSuccess from './components/ResetSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />}/>
        <Route path="/verification" element={<Verification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
      </Routes>
    </BrowserRouter>
  );}

export default App;