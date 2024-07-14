import React, { useState } from 'react';
import axios from 'axios';
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
  Box
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'user'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const baseUrl = "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});


    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/signup`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*', 
          'Content-Type': 'application/json'
        }, 
        withCredentials: true
      });
      
      // Handle successful response
      console.log(response.data);
      setLoading(false);

      Navigate('/home');
      
    } catch (error) {
      // Handle error response
      console.error(error);
      setErrors(error.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2, mt: 5 }}>
      <video
        src="/videos/loginPage.mp4"
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />

      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{textAlign: "center"}}>
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
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              variant="outlined"
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
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
