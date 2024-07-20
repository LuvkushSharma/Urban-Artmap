import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../components/Navbar";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "http://localhost:3000";

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
        `${baseUrl}/api/v1/users/contact`,
        {
          name,
          message,
        },
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
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ mt: 4, mb: 3 }}>
          Contact Us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
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
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              Alternatively, you can reach us at the following:
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Email: nikhil.453.123@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Social Media:
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item>
                <FacebookShareButton url="https://facebook.com/yourprofile">
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </Grid>
              <Grid item>
                <TwitterShareButton url="https://x.com/luvkushSharma_">
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Grid>
              <Grid item>
                <LinkedinShareButton url="https://www.linkedin.com/in/luvkush-sharma-4581a3225/">
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactUs;
