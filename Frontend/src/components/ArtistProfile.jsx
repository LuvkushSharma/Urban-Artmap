import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CardMedia,
  Box,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import Navbar from './Navbar';

const ArtistProfile = () => {
  const { artistId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtistData = async () => {
        setLoading(true);
        try {
          const artistResponse = await axios.get(`http://localhost:3000/api/v1/users/${artistId}`);
          setArtist(artistResponse.data.data.user);
          
          const artworksResponse = await axios.get(`http://localhost:3000/api/v1/artworks/${artistId}`);
          setArtworks(artworksResponse.data);
          
        } catch (error) {
          console.error('Error fetching artist data:', error);
          setError('Failed to fetch artist data.');
        } finally {
          setLoading(false);
        }
      };      

    fetchArtistData();
  }, [artistId]);

  return (
    <div>
      <Navbar />  
      <Container>
        <Box my={4}>
          {loading && <CircularProgress color="inherit" />}
          {error && <Alert severity="error">{error}</Alert>}
          {artist && (
            <Box mb={4}>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <Avatar
                    alt={artist.name}
                    src={artist.cloudinaryImageUrl}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h4">{artist.name}</Typography>
                  <Typography variant="body1">{artist.email}</Typography>
                  <Typography variant="body2">{artist.role}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
            </Box>
          )}
          {artworks.length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>Artworks</Typography>
              <Grid container spacing={3}>
                {artworks.map((artwork) => (
                  <Grid item key={artwork._id} xs={12} sm={6} md={4}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="300"
                        image={artwork.imageUrl}
                        alt={artwork.title}
                      />
                      <CardContent>
                        <Typography variant="h6">{artwork.title}</Typography>
                        <Typography variant="body2" color="textSecondary">{artwork.description}</Typography>
                        <Typography variant="body2">Date: {new Date(artwork.date).toLocaleDateString()}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ArtistProfile;
