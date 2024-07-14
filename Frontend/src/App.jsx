import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import UploadArtworkScreen from "./pages/UploadArtworkScreen";
import ArtworkMap from "./components/ArtworkMap";
import Oops from "./components/Oops";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgettingPassword" element={<ForgetPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadArtworkScreen />} />
            <Route path="/artwork-map" element={<ArtworkMap />} /> 
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route path="*" element={<Oops />} />
          </Routes>
        </Router>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
