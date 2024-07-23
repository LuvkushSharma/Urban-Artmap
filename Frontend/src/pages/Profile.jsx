import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, CircularProgress, TextField, IconButton, Input } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchUserData } from "../helper/userAPI";
import Navbar from "../components/Navbar";
import './CSS_Files/Profile.css'; 

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setName(userData.name);
        setEmail(userData.email);
        setImageUrl(userData.cloudinaryImageUrl);
        setNewName(userData.name);
        setNewEmail(userData.email);
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    fetchData();
  }, []);

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

      const cloudinaryImageUrl = response.data.secure_url; // Extract Cloudinary image URL

      // Update user schema with the Cloudinary image URL
      await axios.patch(
        `${baseUrl}/api/v1/users/update`,
        { cloudinaryImageUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setImageUrl(cloudinaryImageUrl);
      setUploading(false);
    
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Update user schema with new name and email
      await axios.patch(
        `${baseUrl}/api/v1/users/updateMe`,
        { name: newName, email: newEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setName(newName);
      setEmail(newEmail);
      setEditing(false);
      
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleCancelClick = () => {
    setNewName(name); // Reset to original values
    setNewEmail(email);
    setEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <img
            className="profile-image"
            src={imageUrl ? imageUrl : "/default-avatar.png"}
            alt="Profile"
          />
          <div className="profile-content">
            {editing ? (
              <>
                <TextField 
                  label="Name" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth
                />
                <TextField 
                  label="Email" 
                  value={newEmail} 
                  onChange={(e) => setNewEmail(e.target.value)} 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth
                />
                <div className="button-group">
                  <Button 
                    variant="contained" 
                    startIcon={<SaveIcon />} 
                    onClick={handleSaveClick} 
                    className="save-button"
                  >
                    Save
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<CancelIcon />} 
                    onClick={handleCancelClick} 
                    className="cancel-button"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Typography variant="h5" className="profile-name">
                  {name}
                </Typography>
                <Typography variant="body2" className="profile-email">
                  {email}
                </Typography>
                <IconButton onClick={handleEditClick} className="edit-icon">
                  <EditIcon />
                </IconButton>
              </>
            )}
          </div>

          <div className="upload-section">
            <Input
              type="file"
              onChange={handleImageChange}
              className="file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                className="choose-file-button"
              >
                Choose File
              </Button>
            </label>
            <Button
              variant="contained"
              onClick={handleImageUpload}
              disabled={uploading}
              startIcon={uploading ? <CircularProgress size={24} color="inherit" /> : null}
              className="upload-button"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
