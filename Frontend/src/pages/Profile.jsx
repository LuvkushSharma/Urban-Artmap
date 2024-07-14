import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Input,
  Container,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { fetchUserData } from "../helper/userAPI";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        
        setName(userData.name);
        setEmail(userData.email);
        setImageUrl(userData.cloudinaryImageUrl);
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (event) => {
    console.log("event.target.files[0]", event.target.files[0].name);
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

      const cloudinaryImageUrl = response.data.secure_url; // Extract Cloudinary image URL

      console.log("Image uploaded successfully:", cloudinaryImageUrl);

      // Update user schema with the Cloudinary image URL
      await axios.patch(
        `${baseUrl}/api/v1/users/update`,
        { cloudinaryImageUrl },
        {headers: {
          'Access-Control-Allow-Origin': '*', 
          'Content-Type': 'application/json'
      }, withCredentials: true }
      );

      setImageUrl(cloudinaryImageUrl);
      setUploading(false);
      console.log("Image uploaded successfully:", response.data.imageUrl);
      // Optionally, you can update the profile picture in the UI after successful upload
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="lg" sx={{ mt: 5, background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)"}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
          p: 5,
        }}
      >
        <Card
          sx={{
            maxWidth: 350,
            p: 4,
            mb: 3,
            borderRadius: 10,
            bgcolor: "#0096c7",
          }}
        >
          <CardContent>
            <CardMedia
              component="img"
              sx={{ pt: 2, height: 250, borderRadius: "5%" }}
              image={imageUrl ? imageUrl : "/default-avatar.png"}
              alt="Profile Picture"
            />
            <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </CardContent>
        </Card>

        <Box mt={3}>
          <Input type="file" onChange={handleImageChange} />
          <Button
            variant="contained"
            onClick={handleImageUpload}
            disabled={uploading}
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
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default Profile;
