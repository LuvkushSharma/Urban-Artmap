/*

import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Input,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import exif from "exif-js";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadArtworkScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      artist,
      date,
      story,
      imageUrl,
      location,
    };

    console.log("data", data);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/artworks",
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      exif.getData(file, function () {
        const allExifData = exif.getAllTags(this);
        if (Object.keys(allExifData).length === 0) {
          toast.error("No EXIF data found in the image. Please upload a different image.");
          setImage(null);
        } else {
          setImage(file);
        }
      });
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dost_luvkush");
      formData.append("cloud_name", "dx2vel6vy");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dx2vel6vy/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cloudinaryImageUrl = response.data.secure_url;
      setImageUrl(cloudinaryImageUrl);
      setUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Upload Artwork
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Artist"
                  variant="outlined"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Story"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Input type="file" onChange={handleImageChange} />
                <Button
                  variant="contained"
                  onClick={handleImageUpload}
                  disabled={!image || uploading}
                  sx={{
                    ml: 2,
                    backgroundColor: uploading ? "#adb5bd" : "#343a40",
                    color: uploading ? "#6c757d" : "#fff",
                    "&:hover": {
                      backgroundColor: uploading ? "#adb5bd" : "#495057",
                    },
                  }}
                >
                  {uploading ? <CircularProgress size={24} /> : "Upload Image"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UploadArtworkScreen;

*/

/*
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Input,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const UploadArtworkScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      artist,
      date,
      story,
      imageUrl,
      location,
    };

    console.log("data", data);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/artworks",
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dost_luvkush");
      formData.append("cloud_name", "dx2vel6vy");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dx2vel6vy/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cloudinaryImageUrl = response.data.secure_url;
      setImageUrl(cloudinaryImageUrl);
      setUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Upload Artwork
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Artist"
                  variant="outlined"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Story"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Input type="file" onChange={handleImageChange} />
                <Button
                  variant="contained"
                  onClick={handleImageUpload}
                  disabled={!image || uploading}
                  sx={{
                    ml: 2,
                    backgroundColor: uploading ? "#adb5bd" : "#343a40",
                    color: uploading ? "#6c757d" : "#fff",
                    "&:hover": {
                      backgroundColor: uploading ? "#adb5bd" : "#495057",
                    },
                  }}
                >
                  {uploading ? <CircularProgress size={24} /> : "Upload Image"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UploadArtworkScreen;


*/

/*

import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Input,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const UploadArtworkScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null); // New state for latitude
  const [longitude, setLongitude] = useState(null); // New state for longitude
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      artist,
      date,
      story,
      imageUrl,
      location,
      latitude, // Include latitude in the data object
      longitude, // Include longitude in the data object
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/artworks",
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dost_luvkush");
      formData.append("cloud_name", "dx2vel6vy");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dx2vel6vy/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cloudinaryImageUrl = response.data.secure_url;
      setImageUrl(cloudinaryImageUrl);
      setUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  const handleLocationChange = async (e) => {
    setLocation(e.target.value);

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          location
        )}&key=50f421418d544756be713787e7c29289`
      );

      console.log('response', response);
      
      const { lat, lng } = response.data.results[0].geometry;

      console.log('lat', lat);
      console.log('lng', lng);
      

      setLatitude(lat);
      setLongitude(lng);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Upload Artwork
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Artist"
                  variant="outlined"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Story"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={handleLocationChange} // Call handleLocationChange on change
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Input type="file" onChange={handleImageChange} />
                <Button
                  variant="contained"
                  onClick={handleImageUpload}
                  disabled={!image || uploading}
                  sx={{
                    ml: 2,
                    backgroundColor: uploading ? "#adb5bd" : "#343a40",
                    color: uploading ? "#6c757d" : "#fff",
                    "&:hover": {
                      backgroundColor: uploading ? "#adb5bd" : "#495057",
                    },
                  }}
                >
                  {uploading ? <CircularProgress size={24} /> : "Upload Image"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UploadArtworkScreen;

*/

import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Input,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import piexif from "piexifjs"; // Import piexifjs library

const UploadArtworkScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      artist,
      date,
      story,
      imageUrl,
      location,
      latitude,
      longitude,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/artworks",
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleLocationChange = async () => {
    try {
      const query = encodeURIComponent(location);
      const apiKey = "pk.dbab5bd47d3cb9cfc075ea5c8c1da39c";
      const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json&limit=1`);
  
      // Log the entire response for debugging
      console.log("Geocoding API response:", response.data);
  
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        console.log("Coordinates fetched:", lat, lon); // Debugging log
  
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lon));
        return { lat: parseFloat(lat), lon: parseFloat(lon) }; // Return coordinates for further use
      } else {
        console.error("No results found for the provided location.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
    return null; // Return null if coordinates could not be fetched
  };
  

  const insertGeoCoordinates = async (file, lat, lng) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;

        // Extract EXIF data
        const exifObj = piexif.load(dataUrl);

        // Define GPS coordinates in EXIF format
        const gpsData = {
          [piexif.GPSIFD.GPSLatitudeRef]: lat >= 0 ? "N" : "S",
          [piexif.GPSIFD.GPSLatitude]: piexif.GPSHelper.degToDmsRational(
            Math.abs(lat)
          ),
          [piexif.GPSIFD.GPSLongitudeRef]: lng >= 0 ? "E" : "W",
          [piexif.GPSIFD.GPSLongitude]: piexif.GPSHelper.degToDmsRational(
            Math.abs(lng)
          ),
        };

        // Insert GPS data into EXIF
        exifObj["GPS"] = gpsData;
        const modifiedExif = piexif.dump(exifObj);

        // Insert modified EXIF data back into the image
        const modifiedDataUrl = piexif.insert(modifiedExif, dataUrl);

        // Convert modified data URL back to Blob
        const base64Data = modifiedDataUrl.split(",")[1];
        const binaryData = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }

        const updatedBlob = new Blob([uint8Array], { type: file.type });
        resolve(updatedBlob);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read image file."));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!image) {
      console.error("No image selected.");
      return;
    }

    try {
      setUploading(true);

      // Fetch latitude and longitude based on the location entered
      const coords = await handleLocationChange();
      if (!coords) {
        console.error("Failed to get latitude and longitude.");
        setUploading(false);
        return;
      }

      // Insert GPS coordinates into the image
      const updatedBlob = await insertGeoCoordinates(image, coords.lat, coords.lon);

      if (!updatedBlob) {
        console.error("Failed to update image with GPS coordinates.");
        navigate("/home");
        return;
      }

      // Upload modified image to Cloudinary
      const formData = new FormData();
      formData.append("file", updatedBlob);
      formData.append("upload_preset", "dost_luvkush");
      formData.append("cloud_name", "dx2vel6vy");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dx2vel6vy/image/upload",
        formData
      );

      const cloudinaryImageUrl = response.data.secure_url;
      setImageUrl(cloudinaryImageUrl);
      setUploading(false);

      // Now submit other artwork data to your backend
      const data = {
        title,
        description,
        artist,
        date,
        story,
        imageUrl: cloudinaryImageUrl,
        location,
        latitude: coords.lat,
        longitude: coords.lng,
      };

      console.log("Data being sent to backend:", data); // Debugging log

      const res = await axios.post(
        "http://localhost:3000/api/v1/artworks",
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/home");
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };


  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Upload Artwork
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Artist"
                  variant="outlined"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Story"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Input type="file" onChange={handleImageChange} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={uploading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {uploading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UploadArtworkScreen;
