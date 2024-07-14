import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isFailed, setIsFailed] = useState(false);
  const [timerStarts, setTimerStarts] = useState(false);

  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users/checkAuth" , {headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
    }, withCredentials: true });
        // navigate("/otp", { replace: true });
        navigate("/home", { replace: true });
        
      } catch (error) {
        // console.error("User is not logged in");
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/login", {
        email,
        password,
      } , { headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
    } , withCredentials: true });

      setIsFailed(false);
      setTimerStarts(true);

      setTimeout(() => {
        setTimerStarts(false);
        // navigate("/otp", { replace: true });
        navigate("/home", { replace: true });
      }, 2000);

      // Redirect to the home page or perform other actions on successful login
    } catch (error) {
      setIsFailed(true);
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      // Handle login error
    }
  };

  const move = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backdropFilter: "blur(5px)", // Blur effect
        position: "relative", // Make the parent relative for absolute positioning of child elements
      }}
    >
      {/* Video Section */}
      <video
        src="/videos/loginPage.mp4"
        autoPlay
        loop
        muted
        style={{
          width: "100%", // Video occupies full width of the screen
          height: "100vh", // Video occupies full height of the screen
          objectFit: "cover",
          position: "fixed", // Fix the video position
          top: 0,
          left: 0,
        }}
      />

      {/* Login Form Section */}
      <Box
        sx={{
          zIndex: 1, // Ensure login form is above the video
          width: "300px", // Adjust the width of the login form as needed
          padding: "2rem",
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent white background
          position: "absolute",
          textAlign: "center", // Center the content horizontally
          borderRadius: "20px", // Rounded corners
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)", // Add shadow effect
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          sx={{ marginBottom: "1rem" }} // Add margin bottom
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
          sx={{ marginBottom: "1rem" }} // Add margin bottom
        />

        {isFailed && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Please provide correct email and password.
          </Alert>
        )}

        {timerStarts && (
          <Alert severity="success" sx={{ marginBottom: "1rem" }}>
            Login Successful!
          </Alert>
        )}

        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ marginRight: 1 }}
          // color="secondary"
          style={{ backgroundColor: "#495057" }}
        >
          Login
        </Button>

        <Button
          variant="contained"
          onClick={move}
          style={{ backgroundColor: "#495057" }}
        >
          Signup
        </Button>

        <Typography
          variant="body2"
          sx={{ marginTop: "1rem", color: "#007bff" }}
        >
          <Link
            to="/foregettingPassword"
            style={{
              textDecoration: "none",
              color: "#050609",
            }}
          >
            Forget Password?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
