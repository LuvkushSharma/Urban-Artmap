import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setShowMessage(true);
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleOtpSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${BASE_URL}/api/v1/users/validateOtp`,
        { otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/home", { replace: true });
    } catch (err) {
      setError("Invalid OTP");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)", // Gradient background
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
          animation: `${fadeIn} 1s ease-in-out`, // Fade-in animation
        }}
      >
        {showMessage && (
          <Alert severity="info" sx={{ marginBottom: "1rem" }}>
            An OTP has been sent to your email. Kindly check that and enter it.
          </Alert>
        )}
        <Typography variant="h4" gutterBottom align="center">
          Verify Your Email
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: "1rem", color: "#555" }}>
          Please enter the OTP sent to your email address.
        </Typography>
        <TextField
          label="OTP"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{ borderRadius: "8px" }}
        />
        {error && <Alert severity="error" sx={{ marginBottom: "1rem" }}>{error}</Alert>}
        <Button
          variant="contained"
          onClick={handleOtpSubmit}
          disabled={loading}
          fullWidth
          sx={{
            marginTop: "1rem",
            backgroundColor: "#007BFF",
            color: "white",
            '&:hover': {
              backgroundColor: "#0056b3",
            },
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default OTP;
