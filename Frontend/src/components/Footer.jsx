import React from 'react';
import { Box, Container, Typography, IconButton, Grid, Divider, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, MailOutline, Phone } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  return (
    <footer style={{ background: theme.palette.background.paper, padding: '2rem 0', borderTop: `1px solid ${theme.palette.divider}` }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Footer Links */}
          <Grid item xs={12} sm={4} textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body1">
                <a href="/home" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Home</a>
              </Typography>
              <Typography variant="body1">
                <a href="/about" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>About Us</a>
              </Typography>
              <Typography variant="body1">
                <a href="/contact" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Contact</a>
              </Typography>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={4} container direction="column" alignItems="center" textAlign={{ xs: 'center', sm: 'center' }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MailOutline sx={{ mr: 1, color: theme.palette.text.secondary }} />
                <Typography variant="body1">info@urbanartmap.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, color: theme.palette.text.secondary }} />
                <Typography variant="body1">+1 (555) 123-4567</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={4} container direction="column" alignItems="center" textAlign={{ xs: 'center', sm: 'right' }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  aria-label="Facebook"
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      color: theme.palette.primary.main,
                    },
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter"
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      color: theme.palette.primary.main,
                    },
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  aria-label="Instagram"
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      color: theme.palette.primary.main,
                    },
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      color: theme.palette.primary.main,
                    },
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Crowdsourced Urban Art Map. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
