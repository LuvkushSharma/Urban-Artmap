import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../components/Navbar";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import styled from "styled-components";

// Styled Components
const ContactContainer = styled(Container)`
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const FormBox = styled(Box)`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Stronger shadow */
`;

const InfoBox = styled(FormBox)`
  background: linear-gradient(135deg, #f0f0f5, #e0e0e5); /* Gradient background */
`;

const ContactUs = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${BASE_URL}/api/v1/users/contact`,
        { name, message },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    setName("");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <ContactContainer maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}
        >
          Contact Us
        </Typography>
        <Grid container spacing={3}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <FormBox>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Feel free to reach out to us using the form below. We'd love to
                hear from you!
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={handleNameChange}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows={4}
                id="message"
                label="Message"
                name="message"
                value={message}
                onChange={handleMessageChange}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  mt: 2,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
                onClick={handleSubmit}
              >
                Send Message
              </Button>
            </FormBox>
          </Grid>
          {/* Info Section */}
          <Grid item xs={12} md={6}>
            <InfoBox>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Alternatively, you can reach us at the following:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Email: nikhil.453.123@gmail.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Social Media:
              </Typography>
              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item>
                  <FacebookShareButton url="https://facebook.com/yourprofile">
                    <FacebookIcon
                      size={48}
                      round
                      style={{ transition: 'transform 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </FacebookShareButton>
                </Grid>
                <Grid item>
                  <TwitterShareButton url="https://x.com/luvkushSharma_">
                    <TwitterIcon
                      size={48}
                      round
                      style={{ transition: 'transform 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </TwitterShareButton>
                </Grid>
                <Grid item>
                  <LinkedinShareButton url="https://www.linkedin.com/in/luvkush-sharma-4581a3225/">
                    <LinkedinIcon
                      size={48}
                      round
                      style={{ transition: 'transform 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </LinkedinShareButton>
                </Grid>
              </Grid>
            </InfoBox>
          </Grid>
        </Grid>
      </ContactContainer>
    </>
  );
};

export default ContactUs;
