import React from 'react';
import { Container, Typography, Grid, TextField, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContactUs = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" sx={{ mt: 4, mb: 3 }}>
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            Feel free to reach out to us using the form below. We'd love to hear from you!
          </Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            Alternatively, you can reach us at the following:
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Email: info@urbanartmap.com
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Social Media: (Links to social media profiles)
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
