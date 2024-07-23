import React from 'react';
import { Box, Container, Typography, IconButton, Grid, Divider, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, MailOutline, Phone } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  return (
    <footer style={{ background: theme.palette.background.default }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Footer Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body1">
                <a href="/" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Home</a>
              </Typography>
              <Typography variant="body1">
                <a href="/about" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>About Us</a>
              </Typography>
              <Typography variant="body1">
                <a href="/contact" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Contact</a>
              </Typography>
              <Typography variant="body1">
                <a href="/faq" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>FAQ</a>
              </Typography>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Follow Us
            </Typography>
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
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Subscribe to Our Newsletter
            </Typography>
            <Box
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.dark}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.main}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 Crowdsourced Urban Art Map. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
