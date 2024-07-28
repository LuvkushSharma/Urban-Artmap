import React from 'react';
import { Typography, Container, Grid, Box, Link } from '@mui/material';
import Navbar from '../components/Navbar';
import './CSS_Files/AboutUs.css'; 
import { FaHandshake, FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';
import Globe from "./../components/Globe";

function AboutUs() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" align="center" gutterBottom className="gradient-text">
              About Crowdsourced Urban Art Map
            </Typography>
          </Grid>
          <Globe />
          <Grid item xs={12}>
            <Typography variant="h2" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
              Our Vision
            </Typography>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box className="icon-container" sx={{ mr: 2, width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <FaMapMarkerAlt size={24} color="#fff" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Empowering Discovery</Typography>
              </Box>
              <Typography variant="body2" align="justify">
                Our interactive map allows you to discover hidden gems in your city or embark on a virtual exploration of street art across the globe.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box className="icon-container" sx={{ mr: 2, width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #FF5722 30%, #FFC107 90%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <FaHandshake size={24} color="#fff" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Preserving Legacy</Typography>
              </Box>
              <Typography variant="body2" align="justify">
                By documenting and sharing details like artist names, creation dates, and stories behind the pieces, we contribute to the preservation of urban art for future generations.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box className="icon-container" sx={{ mr: 2, width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <FaUserFriends size={24} color="#fff" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Community Building</Typography>
              </Box>
              <Typography variant="body2" align="justify">
                We foster a space for interaction where users can vote on their favorite artworks, share discoveries on social media, and potentially connect with the artists themselves.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
              Join the Movement
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="justify" sx={{ lineHeight: 1.6 }}>
              Whether you're a seasoned urban art explorer or simply appreciate the beauty and message it conveys, we invite you to join our
              community. Help us document this cultural phenomenon, celebrate artistic expression, and make urban art accessible to everyone.
              Let's create a comprehensive and dynamic map that reflects the ever-changing canvas of our streets.
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Link href="#" variant="body1" underline="none" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem', '&:hover': { textDecoration: 'underline' } }}>
              Join Us Today!
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AboutUs;
