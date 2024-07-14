import React from 'react';
import { Typography, Container, Grid, Box, Link } from '@mui/material';

function AboutUs() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1" align="center" gutterBottom>
            About Crowdsourced Urban Art Map
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="justify">
            Urban art, encompassing graffiti, murals, and street installations, is a vibrant and ever-evolving expression of creativity. However,
            its ephemeral nature and lack of centralized documentation often lead to underappreciation and potential loss. Crowdsourced Urban Art Map
            was born from a passion for preserving this art form and fostering a global community of enthusiasts.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <h2>Our Mission</h2>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="justify">
            We aim to create a collaborative platform where users can document, share, and explore urban artworks from around the world. Here's
            how we strive to achieve this:
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box component="span" sx={{ mr: 2, width: '50px', height: '50px', backgroundColor: 'primary.main', borderRadius: '50%' }} />
            <Typography variant="body1">Empowering Discovery</Typography>
          </Box>
          <Typography variant="body2" align="justify">
            Our interactive map allows you to discover hidden gems in your city or embark on a virtual exploration of street art across the globe.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box component="span" sx={{ mr: 2, width: '50px', height: '50px', backgroundColor: 'secondary.main', borderRadius: '50%' }} />
            <Typography variant="body1">Preserving Legacy</Typography>
          </Box>
          <Typography variant="body2" align="justify">
            By documenting and sharing details like artist names, creation dates, and stories behind the pieces, we contribute to the preservation of urban art for future generations.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box component="span" sx={{ mr: 2, width: '50px', height: '50px', backgroundColor: 'info.main', borderRadius: '50%' }} />
            <Typography variant="body1">Community Building</Typography>
          </Box>
          <Typography variant="body2" align="justify">
            We foster a space for interaction where users can vote on their favorite artworks, share discoveries on social media, and potentially connect with the artists themselves.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <h2>Join the Movement</h2>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="justify">
            Whether you're a seasoned urban art explorer or simply appreciate the beauty and message it conveys, we invite you to join our
            community. Help us document this cultural phenomenon, celebrate artistic expression, and make urban art accessible to everyone.
            Let's create a comprehensive and dynamic map that reflects the ever-changing canvas of our streets.
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Link href="#" variant="body1" underline="none" sx={{ color: 'primary.main' }}>
            Join Us Today!
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutUs;
