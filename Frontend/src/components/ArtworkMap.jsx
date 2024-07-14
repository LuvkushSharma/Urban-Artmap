/*

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import exifr from 'exifr';
import Navbar from './Navbar';

const ArtworkMap = () => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return; // If no file selected, do nothing

    setLoading(true);
    setError(null);

    try {
      const exifData = await exifr.gps(file);

      if (exifData) {
        const { latitude, longitude } = exifData;
        setMarkerPosition([latitude, longitude]);
        setImageFile(URL.createObjectURL(file));
      } else {
        setError('No GPS coordinates found in the image.');
      }
    } catch (error) {
      console.error('Error reading EXIF data:', error);
      setError('Error reading EXIF data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFileChange();
  }, []);

  const clearImage = () => {
    setImageFile(null);
    setMarkerPosition([0, 0]);
  };

  return (
    <div>
      <Navbar/>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{marginTop: "55px"}}/>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '400px', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerPosition[0] !== 0 && markerPosition[1] !== 0 && (
          <Marker position={markerPosition}>
            <Popup>
              <p>Location at ({markerPosition[0]}, {markerPosition[1]})</p>
              {imageFile && (
                <div>
                  <img src={imageFile} alt="Geotagged Image" style={{ maxWidth: '100%' }} />
                  <br />
                  <button onClick={clearImage}>Clear Image</button>
                </div>
              )}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default ArtworkMap;

*/

// v-2
/*

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import exifr from 'exifr';
import Navbar from './Navbar';
import axios from 'axios';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';

const ArtworkMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/artworks');
        const artworksWithGPS = await Promise.all(response.data.map(async (artwork) => {
          try {
            const gpsData = await fetchGPSData(artwork.imageUrl);
            return {
              ...artwork,
              latitude: gpsData.latitude,
              longitude: gpsData.longitude,
            };
          } catch (err) {
            console.error(`Error fetching GPS data for ${artwork.title}:`, err);
            return artwork;
          }
        }));
        setArtworks(artworksWithGPS);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setError('Failed to fetch artworks.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const fetchGPSData = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, { responseType: 'blob' });
      const imageBlob = response.data;
      const exifData = await exifr.gps(imageBlob);
      if (!exifData) throw new Error('No EXIF GPS data found');
      return {
        latitude: exifData.latitude,
        longitude: exifData.longitude,
      };
    } catch (error) {
      console.error('Error fetching GPS data:', error);
      throw error;
    }
  };

  const clearArtworks = () => {
    setArtworks([]);
  };

  return (
    <div>
      <Navbar />
      <div style={{height: "20px"}}/>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {artworks.map((artwork) => (
          artwork.latitude && artwork.longitude && (
            <Marker
              key={artwork._id}
              position={[artwork.latitude, artwork.longitude]}
            >
              <Popup>
                <h3>{artwork.title}</h3>
                <p>{artwork.description}</p>
                <p>Artist: {artwork.artist}</p>
                <p>Date: {new Date(artwork.date).toLocaleDateString()}</p>
                <img src={artwork.imageUrl} alt={artwork.title} style={{ maxWidth: '100%' }} />
                <div>
                  <h4>Share this artwork:</h4>
                  <FacebookShareButton
                    url={window.location.href}
                    quote={artwork.title}
                    hashtag="#urbanart"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={artwork.title}
                    hashtags={['urbanart']}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={window.location.href}
                    title={artwork.title}
                    separator=":: "
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
      <button onClick={clearArtworks}>Clear Artworks</button>
    </div>
  );
};

export default ArtworkMap;

*/

// v-3
/*

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import exifr from 'exifr';
import axios from 'axios';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Snackbar,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ArtworkMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/artworks');
        const artworksWithGPS = await Promise.all(response.data.map(async (artwork) => {
          try {
            const gpsData = await fetchGPSData(artwork.imageUrl);
            return {
              ...artwork,
              latitude: gpsData.latitude,
              longitude: gpsData.longitude,
            };
          } catch (err) {
            console.error(`Error fetching GPS data for ${artwork.title}:`, err);
            return artwork;
          }
        }));
        setArtworks(artworksWithGPS);
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setError('Failed to fetch artworks.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const fetchGPSData = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, { responseType: 'blob' });
      const imageBlob = response.data;
      const exifData = await exifr.gps(imageBlob);
      if (!exifData) throw new Error('No EXIF GPS data found');
      return {
        latitude: exifData.latitude,
        longitude: exifData.longitude,
      };
    } catch (error) {
      console.error('Error fetching GPS data:', error);
      throw error;
    }
  };

  const clearArtworks = () => {
    setArtworks([]);
    setSnackbarOpen(true);
  };

  const handleMarkerClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseDialog = () => {
    setSelectedArtwork(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Artwork Map</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          {loading && (
            <Backdrop open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <MapContainer
            center={[51.505, -0.09]} // Centered on London for a more realistic starting point
            zoom={13} // Increased zoom level for a better view
            style={{ height: '600px', width: '100%' }} // Increased height for a larger map
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {artworks.map((artwork) => (
              artwork.latitude && artwork.longitude && (
                <Marker
                  key={artwork._id}
                  position={[artwork.latitude, artwork.longitude]}
                  eventHandlers={{
                    click: () => handleMarkerClick(artwork),
                  }}
                >
                  <Popup>
                    {!selectedArtwork || selectedArtwork._id !== artwork._id ? (
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={artwork.imageUrl}
                          alt={artwork.title}
                        />
                        <CardContent>
                          <Typography variant="h6">{artwork.title}</Typography>
                          <Typography variant="body2" color="textSecondary">{artwork.description}</Typography>
                          <Typography variant="body2">Artist: {artwork.artist}</Typography>
                          <Typography variant="body2">Date: {new Date(artwork.date).toLocaleDateString()}</Typography>
                          <Box mt={2}>
                            <Typography variant="subtitle2">Share this artwork:</Typography>
                            <Box display="flex" justifyContent="space-around" mt={1}>
                              <FacebookShareButton
                                url={window.location.href}
                                quote={artwork.title}
                                hashtag="#urbanart"
                              >
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                              <TwitterShareButton
                                url={window.location.href}
                                title={artwork.title}
                                hashtags={['urbanart']}
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                              <WhatsappShareButton
                                url={window.location.href}
                                title={artwork.title}
                                separator=":: "
                              >
                                <WhatsappIcon size={32} round />
                              </WhatsappShareButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ) : null}
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
          <Box mt={2} textAlign="center">
            <Button variant="contained" color="primary" onClick={clearArtworks}>
              Clear Artworks
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Artworks updated"
          action={
            <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        {selectedArtwork && (
          <Dialog
            open={true}
            onClose={handleCloseDialog}
            aria-labelledby="artwork-dialog-title"
          >
            <DialogTitle id="artwork-dialog-title">{selectedArtwork.title}</DialogTitle>
            <DialogContent>
              <CardMedia
                component="img"
                image={selectedArtwork.imageUrl}
                alt={selectedArtwork.title}
              />
              <DialogContentText>{selectedArtwork.description}</DialogContentText>
              <Typography variant="body2">Artist: {selectedArtwork.artist}</Typography>
              <Typography variant="body2">Date: {new Date(selectedArtwork.date).toLocaleDateString()}</Typography>
              <Box mt={2}>
                <Typography variant="subtitle2">Share this artwork:</Typography>
                <Box display="flex" justifyContent="space-around" mt={1}>
                  <FacebookShareButton
                    url={window.location.href}
                    quote={selectedArtwork.title}
                    hashtag="#urbanart"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={selectedArtwork.title}
                    hashtags={['urbanart']}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={window.location.href}
                    title={selectedArtwork.title}
                    separator=":: "
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </Box>
              </Box>
            </DialogContent>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </Dialog>
        )}
      </Container>
    </div>
  );
};

export default ArtworkMap;

*/

// v-4 :-
/*
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import exifr from 'exifr';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Snackbar,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ArtworkMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/artworks');
        const artworksWithGPS = await Promise.all(response.data.map(async (artwork) => {
          try {
            const gpsData = await fetchGPSData(artwork.imageUrl);
            return {
              ...artwork,
              latitude: gpsData.latitude,
              longitude: gpsData.longitude,
            };
          } catch (err) {
            console.error(`Error fetching GPS data for ${artwork.title}:`, err);
            return artwork;
          }
        }));
        setArtworks(artworksWithGPS);
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setError('Failed to fetch artworks.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const fetchGPSData = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, { responseType: 'blob' });
      const imageBlob = response.data;
      const exifData = await exifr.gps(imageBlob);
      if (!exifData) throw new Error('No EXIF GPS data found');
      return {
        latitude: exifData.latitude,
        longitude: exifData.longitude,
      };
    } catch (error) {
      console.error('Error fetching GPS data:', error);
      throw error;
    }
  };

  const clearArtworks = () => {
    setArtworks([]);
    setSnackbarOpen(true);
  };

  const handleMarkerClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseDialog = () => {
    setSelectedArtwork(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleVote = async (artworkId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/artworks/${artworkId}/vote`);
      const updatedArtwork = response.data;
      setArtworks(prevArtworks =>
        prevArtworks.map(artwork =>
          artwork._id === artworkId ? { ...artwork, votes: updatedArtwork.votes } : artwork
        )
      );
      // Update selectedArtwork if it's the one being voted on
      if (selectedArtwork && selectedArtwork._id === artworkId) {
        setSelectedArtwork({ ...selectedArtwork, votes: updatedArtwork.votes });
      }
    } catch (error) {
      console.error('Error voting:', error);
      setError('Failed to vote for artwork.');
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Artwork Map</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          {loading && (
            <Backdrop open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <MapContainer
            center={[51.505, -0.09]} // Centered on London for a more realistic starting point
            zoom={13} // Increased zoom level for a better view
            style={{ height: '600px', width: '100%' }} // Increased height for a larger map
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {artworks.map((artwork) => (
              artwork.latitude && artwork.longitude && (
                <Marker
                  key={artwork._id}
                  position={[artwork.latitude, artwork.longitude]}
                  eventHandlers={{
                    click: () => handleMarkerClick(artwork),
                  }}
                >
                  <Popup>
                    {!selectedArtwork || selectedArtwork._id !== artwork._id ? (
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={artwork.imageUrl}
                          alt={artwork.title}
                        />
                        <CardContent>
                          <Typography variant="h6">{artwork.title}</Typography>
                          <Typography variant="body2" color="textSecondary">{artwork.description}</Typography>
                          <Typography variant="body2">Artist: {artwork.artist}</Typography>
                          <Typography variant="body2">Date: {new Date(artwork.date).toLocaleDateString()}</Typography>
                          <Box mt={2}>
                            <Typography variant="subtitle2">Votes: {artwork.votes}</Typography>
                            <Button variant="contained" color="primary" onClick={() => handleVote(artwork._id)}>
                              Vote
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    ) : null}
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
          <Box mt={2} textAlign="center">
            <Button variant="contained" color="primary" onClick={clearArtworks}>
              Clear Artworks
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Artworks updated"
          action={
            <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        {selectedArtwork && (
          <Dialog
            open={true}
            onClose={handleCloseDialog}
            aria-labelledby="artwork-dialog-title"
          >
            <DialogTitle id="artwork-dialog-title">{selectedArtwork.title}</DialogTitle>
            <DialogContent>
              <CardMedia
                component="img"
                image={selectedArtwork.imageUrl}
                alt={selectedArtwork.title}
              />
              <DialogContentText>{selectedArtwork.description}</DialogContentText>
              <Typography variant="body2">Artist: {selectedArtwork.artist}</Typography>
              <Typography variant="body2">Date: {new Date(selectedArtwork.date).toLocaleDateString()}</Typography>
              <Box mt={2}>
                <Typography variant="subtitle2">Votes: {selectedArtwork.votes}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleVote(selectedArtwork._id)}>
                  Vote
                </Button>
              </Box>
            </DialogContent>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </Dialog>
        )}
      </Container>
    </div>
  );
};

export default ArtworkMap;


*/

// v-5
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import exifr from "exifr";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Snackbar,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "react-share";


const ArtworkMap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState(() => {
    const lastVisitedMarker = localStorage.getItem("lastVisitedMarker");
    return lastVisitedMarker ? JSON.parse(lastVisitedMarker) : [51.505, -0.09]; // Default center
  });

  const [votingError, setVotingError] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/artworks"
        );
        const artworksWithGPS = await Promise.all(
          response.data.map(async (artwork) => {
            try {
              const gpsData = await fetchGPSData(artwork.imageUrl);
              return {
                ...artwork,
                latitude: gpsData.latitude,
                longitude: gpsData.longitude,
              };
            } catch (err) {
              console.error(
                `Error fetching GPS data for ${artwork.title}:`,
                err
              );
              return artwork;
            }
          })
        );
        setArtworks(artworksWithGPS);
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setError("Failed to fetch artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const fetchGPSData = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, { responseType: "blob" });
      const imageBlob = response.data;
      const exifData = await exifr.gps(imageBlob);
      if (!exifData) throw new Error("No EXIF GPS data found");
      return {
        latitude: exifData.latitude,
        longitude: exifData.longitude,
      };
    } catch (error) {
      console.error("Error fetching GPS data:", error);
      throw error;
    }
  };

  const clearArtworks = () => {
    setArtworks([]);
    setSnackbarOpen(true);
  };

  const handleMarkerClick = (artwork) => {
    setSelectedArtwork(artwork);
    setMapCenter([artwork.latitude, artwork.longitude]);
    localStorage.setItem(
      "lastVisitedMarker",
      JSON.stringify([artwork.latitude, artwork.longitude])
    ); // Store coordinates in localStorage
  };

  const handleCloseDialog = () => {
    setSelectedArtwork(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleVote = async (artworkId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/artworks/${artworkId}/vote`
        , {
          headers: {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json'
          }, 
          withCredentials: true
        });

      const updatedArtwork = response.data;
      setArtworks((prevArtworks) =>
        prevArtworks.map((artwork) =>
          artwork._id === artworkId
            ? { ...artwork, votes: updatedArtwork.votes }
            : artwork
        )
      );
      // Update selectedArtwork if it's the one being voted on
      if (selectedArtwork && selectedArtwork._id === artworkId) {
        setSelectedArtwork({ ...selectedArtwork, votes: updatedArtwork.votes });
      }
    } catch (error) {
      // console.error("Error voting:", error);
      setVotingError(true);
    }
  };

  const handleProfile = async (artworkId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/artworks/artist/${artworkId}`
      );
      const artistId = response.data._id;
      Navigate(`/artist/${artistId}`);
    } catch (error) {
      console.error("Error viewing artist profile:", error);
      setError("Failed to view artist profile.");
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Artwork Map</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          {loading && (
            <Backdrop open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {votingError && <Snackbar
            open={votingError}
            autoHideDuration={6000}
            onClose={() => setVotingError(false)}
            message="Already voted for this artwork"
            action={
              <IconButton
                size="small"
                color="inherit"
                onClick={() => setVotingError(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />}
          <MapContainer
            center={mapCenter} // Use mapCenter state for the center position
            zoom={13} // Increased zoom level for a better view
            style={{ height: "600px", width: "100%" }} // Increased height for a larger map
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {artworks.map(
              (artwork) =>
                artwork.latitude &&
                artwork.longitude && (
                  <Marker
                    key={artwork._id}
                    position={[artwork.latitude, artwork.longitude]}
                    eventHandlers={{
                      click: () => handleMarkerClick(artwork),
                    }}
                  >
                    <Popup>
                      {!selectedArtwork ||
                      selectedArtwork._id !== artwork._id ? (
                        <Card sx={{ maxWidth: 300 }}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={artwork.imageUrl}
                            alt={artwork.title}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {artwork.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {artwork.description}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Date:{" "}
                              {new Date(artwork.date).toLocaleDateString()}
                            </Typography>
                            <Box mt={2}>
                              <Typography variant="subtitle2">
                                Votes: {artwork.votes}
                              </Typography>
                              <Box
                                mt={2}
                                display="flex"
                                justifyContent="space-between"
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleVote(artwork._id)}
                                >
                                  Vote
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleProfile(artwork._id)}
                                >
                                  View Artist Profile
                                </Button>
                              </Box>
                              <Box mt={2}>
                                <Typography variant="body2" color="textSecondary">
                                  Share:
                                </Typography>
                                <Box mt={1} display="flex" justifyContent="space-around">
                                  <WhatsappShareButton
                                    url={window.location.href}
                                    title={`Check out this artwork: ${artwork.title}`}
                                    separator=" :: "
                                  >
                                    <WhatsappIcon size={32} round />
                                  </WhatsappShareButton>
                                  <FacebookShareButton
                                    url={window.location.href}
                                    quote={`Check out this artwork: ${artwork.title}`}
                                    hashtag="#ArtworkMap"
                                  >
                                    <FacebookIcon size={32} round />
                                  </FacebookShareButton>
                                  <TwitterShareButton
                                    url={window.location.href}
                                    title={`Check out this artwork: ${artwork.title}`}
                                  >
                                    <TwitterIcon size={32} round />
                                  </TwitterShareButton>
                                  {/* Add more sharing buttons as needed */}
                                </Box>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      ) : null}
                    </Popup>
                  </Marker>
                )
            )}
          </MapContainer>
          <Box mt={2} textAlign="center">
            <Button variant="contained" color="primary" onClick={clearArtworks}>
              Clear Artworks
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Artworks updated"
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        {selectedArtwork && (
          <Dialog
            open={true}
            onClose={handleCloseDialog}
            aria-labelledby="artwork-dialog-title"
          >
            <DialogTitle id="artwork-dialog-title">
              {selectedArtwork.title}
            </DialogTitle>
            <DialogContent>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Card sx={{ maxWidth: 600 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {selectedArtwork.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {selectedArtwork.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Date:{" "}
                      {new Date(selectedArtwork.date).toLocaleDateString()}
                    </Typography>
                    <Box mt={2}>
                      <Typography variant="subtitle2">
                        Votes: {selectedArtwork.votes}
                      </Typography>
                      <Box mt={2} display="flex" justifyContent="space-between">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleVote(selectedArtwork._id)}
                        >
                          Vote
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleProfile(selectedArtwork._id)}
                        >
                          View Artist Profile
                        </Button>
                      </Box>
                      <Box mt={2}>
                        <Typography variant="body2" color="textSecondary">
                          Share:
                        </Typography>
                        <Box mt={1} display="flex" justifyContent="space-around">
                          <WhatsappShareButton
                            url={window.location.href}
                            title={`Check out this artwork: ${selectedArtwork.title}`}
                            separator=" :: "
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <FacebookShareButton
                            url={window.location.href}
                            quote={`Check out this artwork: ${selectedArtwork.title}`}
                            hashtag="#ArtworkMap"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={window.location.href}
                            title={`Check out this artwork: ${selectedArtwork.title}`}
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          {/* Add more sharing buttons as needed */}
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </DialogContent>

            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </Dialog>
        )}
      </Container>
    </div>
  );
};

export default ArtworkMap;

