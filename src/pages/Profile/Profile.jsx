import React from 'react';
import Navbar from '../../components/Profile/Navbar';
import HeroSection from '../../components/Profile/HeroSection';
import ScholarshipsGrid from '../../components/Profile/ScholarshipsGrid';
import CallToAction from '../../components/Profile/CallToAction';
import Footer from '../../components/Profile/Footer';
import './Profile.css';
import "../../index.css";

function Profile() {
  return (
    <div className="profile-page">
      <Navbar userName="إيمان" />
      <HeroSection />
      <ScholarshipsGrid />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default Profile;