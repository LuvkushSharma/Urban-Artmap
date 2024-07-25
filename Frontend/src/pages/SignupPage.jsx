import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
  Alert,
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    // Simple regex for email validation
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      const condn =
        formData.password !== undefined &&
        formData.password !== "" &&
        formData.passwordConfirm !== undefined &&
        formData.passwordConfirm !== "" &&
        formData.name !== undefined &&
        formData.name !== "" &&
        formData.email !== undefined &&
        formData.email !== "" &&
        formData.role !== undefined &&
        formData.role !== "";

      if (formData.password !== formData.passwordConfirm) {
        setErrors({ passwordConfirm: "Passwords do not match" });
        setLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        setErrors({ password: "Password must be at least 8 characters long" });
        setLoading(false);
        return;
      }

      if (!validateEmail(formData.email)) {
        setErrors({ email: "Invalid email address" });
        setLoading(false);
        return;
      }

      if (condn) {
        const response = await axios.post(
          `${BASE_URL}/api/v1/users/signup`,
          formData,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        navigate("/home");
      } else {
        // Handle missing fields
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.passwordConfirm)
          newErrors.passwordConfirm = "Confirm Password is required";
        if (!formData.role) newErrors.role = "Role is required";
        setErrors(newErrors);
        setLoading(false);
      }
    } catch (error) {
      // Handle error response
      console.error(error);
      setErrors(error.response.data.errors);
      setLoading(false);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:900px)");

  return (
    <Grid container sx={{ height: "100vh", overflowY: "hidden" }}>
      {!isSmallScreen && (
        <Grid item xs={12} md={6} sx={{ position: "relative" }}>
          <video
            src="/videos/loginPage.mp4"
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={6}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 3, overflowY: "auto" }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              background: "linear-gradient(135deg, #FFDDC1 0%, #FFC5E0 100%)",
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ textAlign: "center", color: "#333" }}
            >
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  variant="outlined"
                  required
                  InputProps={{
                    style: {
                      borderRadius: 8,
                    },
                  }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  variant="outlined"
                  required
                  InputProps={{
                    style: {
                      borderRadius: 8,
                    },
                  }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  variant="outlined"
                  required
                  InputProps={{
                    style: {
                      borderRadius: 8,
                    },
                  }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  error={Boolean(errors.passwordConfirm)}
                  helperText={errors.passwordConfirm}
                  variant="outlined"
                  required
                  InputProps={{
                    style: {
                      borderRadius: 8,
                    },
                  }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  variant="outlined"
                  style={{
                    borderRadius: 8,
                  }}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="artist">Artist</MenuItem>
                </Select>
              </FormControl>

              {errors.general && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.general}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  background: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
                  color: "#fff",
                  padding: "12px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: 8,
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Sign Up"}
              </Button>
            </form>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
