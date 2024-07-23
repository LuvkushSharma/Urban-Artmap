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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/users/checkAuth",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        navigate("/home", { replace: true });
      } catch (error) {
        // console.error("User is not logged in");
      }
    };

    checkAuth();
  }, [navigate]);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {

    setLoading(true);
    setErrors({});

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
      setLoading(false);
      return;
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password is required" }));
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email address" }));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );


      setIsFailed(false);
      setTimerStarts(true);
      setLoading(false);

      setTimeout(() => {
        setTimerStarts(false);
        navigate("/home", { replace: true });
      }, 2000);

    } catch (error) {
      setIsFailed(true);
      setLoading(false);
      setTimeout(() => {
        setIsFailed(false);
      }, 2000);

      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const move = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "row",
        overflow: "hidden",
        position: "relative",
      }}
    >
     
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1, // Send video to the back
          overflow: "hidden",
        }}
      >
        <video
          src="/videos/loginPage.mp4"
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Login Form Section */}
      <Box
        sx={{
          width: {
            xs: "100%", // Full width on extra-small screens
          },
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: "2rem",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginBottom: "0.9rem",
              textAlign: "center",
            }}
          >
            <img
              src="/images/Login.jpeg"
              alt="Login"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Box>

          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            margin="normal"
            fullWidth
            required
            sx={{ marginBottom: "1rem" }}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
            error={Boolean(errors.password)}
            helperText={errors.password}
            sx={{ marginBottom: "1rem" }}
          />

          {isFailed && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              Please provide correct email and password.
            </Alert>
          )}

          {timerStarts && (
            <Alert severity="success" sx={{ marginBottom: "0.01rem" }}>
              Login Successful!
            </Alert>
          )}

          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{ marginRight: 1 }}
            style={{ backgroundColor: "#495057" }}
          >
            Login
          </Button>

          {!timerStarts && (
            <Button
              variant="contained"
              onClick={move}
              style={{ backgroundColor: "#495057" }}
            >
              Signup
            </Button>
          )}

          {isFailed || (!timerStarts && (
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
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
