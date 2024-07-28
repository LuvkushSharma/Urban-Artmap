import axios from "axios";

const fetchUserData = async () => {
  try {
    const res = await axios.get("https://urban-artmap.onrender.com/api/v1/users/profile", {headers: {
      'Access-Control-Allow-Origin': '*', 
      'Content-Type': 'application/json'
  }, withCredentials: true });
    return res.data.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; 
  }
};

export { fetchUserData };
