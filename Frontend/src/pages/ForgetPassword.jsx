import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [timerStarts, setTimerStarts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = "http://localhost:3000";

  const handleForget = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/api/v1/users/forgotPassword`, {
        email,
      }, {headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
    }, withCredentials: true });

      setLoading(false);
      setTimerStarts(true);

      setTimeout(() => {
        setTimerStarts(false);
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(
        error.response ? error.response.data.message : "Something went wrong"
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
        background: "linear-gradient(to right, #9B90C2, #605B73)", // Gradient background
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
          boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)", // Box shadow
        }}
      >
        <img src="/images/forgetPassword.jpeg" alt="Forget Password" style={{ marginBottom: "20px", maxWidth: "100%" }} />

        <Typography variant="h5" align="center" gutterBottom>
          Forget Password
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          autoFocus
        />

        <br />
        {error && (
          <Alert severity="error" sx={{ marginBottom: "10px" }}>
            {error}
          </Alert>
        )}
        {timerStarts ? (
          <Alert severity="success" sx={{ marginBottom: "10px" }}>
            Forget Password Link Generated!
          </Alert>
        ) : null}
        <Button
          variant="contained"
          onClick={handleForget}
          disabled={loading || timerStarts}
          fullWidth
          sx={{ marginTop: "10px" }}
        >
          {loading ? "Processing..." : "Forget"}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
