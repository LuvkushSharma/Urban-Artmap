import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Divider,
  Card,
  CardContent,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  Badge,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wave from "../components/Wave/Wave";
import "./CSS_Files/HomePage.css"

import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [transform, setTransform] = useState("rotateY(0deg) rotateX(0deg)");
  const [topArtworks, setTopArtworks] = useState({});

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const Navigate = useNavigate();

  const rankLabels = {
    1: "Rank 1",
    2: "Rank 2",
    3: "Rank 3",
  };

  useEffect(() => {
    const fetchTopArtworks = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/artworks/top-voted`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const data = response.data;

        // Check if the response is empty
        if (Object.keys(data).length === 0) {
          setTopArtworks(null); // Hide section if all ranks are empty
        } else {
          setTopArtworks(data);
        }
      } catch (error) {
        console.error("Error fetching top artworks:", error);
      }
    };

    fetchTopArtworks();
  }, []);

  const handleMouseMove = (e) => {
    const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
    const { clientX: x, clientY: y } = e;

    const xPos = (x / width - 0.5) * 30; // Max tilt angle for X-axis
    const yPos = (y / height - 0.5) * -30; // Max tilt angle for Y-axis

    setTransform(`rotateY(${xPos}deg) rotateX(${yPos}deg)`);
  };

  const handleProfile = async (artistId) => {
    Navigate(`/artist/${artistId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box
        sx={{
          py: 5,
          background: "linear-gradient(to bottom right, #22687FFF, #F2F8F8FF)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  pr: { md: 5 },
                  textAlign: { xs: "center", md: "left" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                  justifyContent: "center",
                  height: "100%", // Ensure content aligns properly
                }}
              >
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  component="h1"
                  className="floating-text"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    fontSize: isMobile ? "2rem" : "3.8rem",
                  }}
                >
                  Crowdsourced Urban Art Map
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    fontSize: isMobile ? "1rem" : "1.125rem", // Adjust font size for mobile
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Document, share, and explore urban artworks from around the
                  world. Create a global map of urban creativity.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    padding: "12px 24px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    transform: "perspective(1px) translateZ(0)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.4)",
                      transform: "translateY(-3px) scale(1.05)",
                      backgroundColor: "#22687FFF",
                    },
                    backgroundColor: "#22687FFF",
                  }}
                  onClick={() => Navigate("/artwork-map")}
                >
                  Start Exploring
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.5)", // Enhanced shadow for 3D effect
                  borderRadius: 2,
                  overflow: "hidden",
                  pt: "56.25%",
                  position: "relative",
                  transformStyle: "preserve-3d", // Enables 3D effect
                  transition: "transform 0.6s ease", // Smooth transition on hover
                  "&:hover": {
                    transform: "rotateY(15deg) scale(1.05)", // 3D rotation on hover
                  },
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline // Recommended for iOS autoplay
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  aria-label="Urban art montage"
                >
                  <source src="/videos/background.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Divider variant="middle" sx={{ my: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Card shadow
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)", // Lift effect on hover
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)", // Enhanced shadow
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Explore Your City Like Never Before
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Uncover hidden gems in your own neighborhood or discover
                  street art hot spots in new destinations.
                </Typography>
                <Button variant="text" underline="none">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Card shadow
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)", // Lift effect on hover
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)", // Enhanced shadow
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Connect with Artists
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Engage with artists, follow their work, and share your own
                  discoveries with the community.
                </Typography>
                <Button variant="text" underline="none">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Card shadow
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)", // Lift effect on hover
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)", // Enhanced shadow
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Join the Community
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Be part of a global network of urban art enthusiasts and
                  contribute to a vibrant and diverse map.
                </Typography>
                <Button variant="text" underline="none">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, display: "flex", alignItems: "center", gap: 3 }}>
          <Box
            sx={{
              width: "50%",
              height: 300,
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
              transformStyle: "preserve-3d",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTransform("rotateY(0deg) rotateX(0deg)")}
            style={{ transform }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              aria-label="Urban art creation"
            >
              <source src="/videos/background_2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          <Box sx={{ width: "50%" }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Our mission is to celebrate and preserve urban art through a
              collaborative platform that brings people together to share and
              explore the beauty of street art from around the world. Join us in
              creating a lasting digital archive that honors the creativity and
              culture of urban spaces.
            </Typography>
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Divider variant="middle" sx={{ my: 4 }} />
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 4, textAlign: "center" }}
          >
            Top Artworks
          </Typography>
          {topArtworks ? (
            <Grid container spacing={3}>
              {Object.entries(topArtworks).map(([rank, artworks]) =>
                artworks.map((artwork, index) => (
                  <Grid item xs={12} sm={6} md={4} key={`${rank}-${index}`}>
                    <Badge badgeContent={rankLabels[rank]} color="primary">
                      <Card
                        sx={{
                          height: "100%",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                          },
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            height: 200,
                            width: "100%",
                            objectFit: "cover",
                            backgroundColor: "#ddd",
                          }}
                          src={artwork.imageUrl}
                          alt={artwork.title}
                        />
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{ mb: 2 }}
                          >
                            {artwork.title}
                          </Typography>
                          <Typography variant="body1">
                            {artwork.description}
                          </Typography>
                        </CardContent>
                        <Box sx={{ p: 2, textAlign: "center" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleProfile(artwork.artist.toString())
                            }
                            sx={{
                              boxShadow: 3,
                              transition:
                                "transform 0.3s ease, box-shadow 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                              },
                            }}
                          >
                            View Artist Profile
                          </Button>
                        </Box>
                      </Card>
                    </Badge>
                  </Grid>
                ))
              )}
            </Grid>
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              No top artworks available.
            </Typography>
          )}
        </Container>

        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Divider variant="middle" sx={{ my: 4 }} />
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 4, textAlign: "center" }}
          >
            Upcoming Events
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Card shadow
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Scale effect on hover
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)", // Enhanced shadow
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    Art Festival 2024
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Join us for a celebration of urban art with live
                    performances, workshops, and exhibitions.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Card shadow
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Scale effect on hover
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)", // Enhanced shadow
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    Street Art Workshop
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Participate in workshops led by renowned street artists and
                    learn new techniques.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Divider variant="middle" sx={{ my: 4 }} />
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 4, textAlign: "center" }}
          >
            User Testimonials
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Card shadow
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Scale effect on hover
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)", // Enhanced shadow
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    John Doe
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    "This platform is amazing! I've discovered so many hidden
                    gems in my city."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Card shadow
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Scale effect on hover
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)", // Enhanced shadow
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    Jane Smith
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    "A fantastic way to connect with artists and fellow art
                    lovers. Highly recommended!"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Card shadow
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Scale effect on hover
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)", // Enhanced shadow
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    Alex Johnson
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    "The best way to explore and appreciate street art from
                    around the world."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Footer />
      <Wave />
    </ThemeProvider>
  );
};

export default HomePage;
