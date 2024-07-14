import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL params
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = "http://localhost:3000";

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`${baseUrl}/api/v1/users/resetPassword/${token}`, {
        oldPassword,
        newPassword,
        confirmPassword,
      }, {headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
    }, withCredentials: true });

      // If reset password is successful, set resetSuccess to true
      setResetSuccess(true);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(
        error.response ? error.response.data.message : "Password reset failed"
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#eae2b7",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src="/images/resetPassword.jpeg"
          alt="Reset Password"
          style={{ marginBottom: "20px", maxWidth: "100%" }}
        />

        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>

        <TextField
          label="Old Password"
          variant="outlined"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          margin="normal"
          fullWidth
        />

        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          fullWidth
        />

        <br />
        {error && (
          <Alert severity="error" sx={{ marginBottom: "10px" }}>
            {error}
          </Alert>
        )}
        {resetSuccess && (
          <Alert severity="success" sx={{ marginBottom: "10px" }}>
            Password Reset Successful!
          </Alert>
        )}
        <br />
        <Button
          variant="contained"
          onClick={handleResetPassword}
          disabled={loading || resetSuccess}
          fullWidth
          sx={{ marginTop: "10px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Reset Password"}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
