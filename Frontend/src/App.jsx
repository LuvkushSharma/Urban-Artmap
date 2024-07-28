import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import UploadArtworkScreen from "./pages/UploadArtworkScreen";
import ArtworkMap from "./components/ArtworkMap";
import Oops from "./components/Oops";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ArtistProfile from "./components/ArtistProfile";
import UserNotFoundPage from "./pages/userNotFoundPage";
import { fetchUserData } from "./helper/userAPI";
import Spinner from "./components/Spinner";
import OTP from "./pages/OTP";


const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows`;

const pinData = {
  title: "Aceternity UI",
  href: "https://twitter.com/mannupaaji",
  description: "Customizable Tailwind CSS and Framer Motion Components.",
  backgroundColor:
    "bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500",
};

const cardData = {
  title: "Lorem ipsum dolor sit amet.",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, dolore.",
  imageUrl:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  linkUrl: "#",
  buttonText: "Lorem, ipsum dolor.",
};

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route
            path="/home"
            element={<PrivateRoute component={<HomePage />} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/foregettingPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/otp" element={<PrivateRoute component={<OTP />} />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={<Profile />} />}
          />
          <Route
            path="/upload"
            element={<PrivateRoute component={<UploadArtworkScreen />} />}
          />
          <Route
            path="/artwork-map"
            element={<PrivateRoute component={<ArtworkMap />} />}
          />
          <Route
            path="/about"
            element={<PrivateRoute component={<AboutUs />} />}
          />
          <Route
            path="/contact"
            element={<PrivateRoute component={<ContactUs />} />}
          />
          <Route
            path="/artist/:artistId"
            element={<PrivateRoute component={<ArtistProfile />} />}
          />
          <Route path="/user-not-found" element={<UserNotFoundPage />} />
          <Route path="*" element={<Oops />} />
        </Routes>
      </main>
    </Router>
  );
}

// A private route component to check if user exists
const PrivateRoute = ({ component }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return userData ? component : <Navigate to="/user-not-found" />;
};

export default App;
