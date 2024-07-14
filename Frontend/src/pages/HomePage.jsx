import React from 'react';
import { Container, Grid, Typography, Button, Stack, Box, Divider } from '@mui/material';
import { useMediaQuery } from '@mui/material'; // Import directly from MUI

import SearchIcon from '@mui/icons-material/Search';
import BannerImage from '/dost.jpeg'; // Replace with your banner image
import Navbar from '../components/Navbar';

const HomePage = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <>
    <Navbar />
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant={isMobile ? 'h4' : 'h2'} component="h1" sx={{ mt: 4, mb: 3 }}>
            Discover Urban Art Around the World
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Explore a vibrant collection of street art, murals, and installations. Contribute and share your finds to create a global map of urban creativity.
          </Typography>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
            <Button variant="contained" size="large">
              Explore the Map
            </Button>
            <Button variant="outlined" size="large" startIcon={<SearchIcon />}>
              Search by Location or Artist
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src={BannerImage} alt="Banner Image" style={{ width: '100%', maxWidth: 500 }} />
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider variant="middle" sx={{ mt: 4, mb: 4 }} />

      {/* Why Choose Us Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2">
            Explore Your City Like Never Before
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Uncover hidden gems in your own neighborhood or discover street art hot spots in new destinations.
          </Typography>
          <Button variant="text" underline="none">
            Learn More
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2">
            Be Part of the Community
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Share your finds, contribute photos and descriptions, and help document the ever-changing world of urban art.
          </Typography>
          <Button variant="text" underline="none">
            Join Us
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2">
            Support Street Artists
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Find local artists, learn about their work, and connect with the creative minds behind the murals.
          </Typography>
          <Button variant="text" underline="none">
            Discover Artists
          </Button>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default HomePage;
