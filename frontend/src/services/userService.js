import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const userService = {
  getUserProfile: async () => {
    const token = localStorage.getItem("token"); 
    if (!token) throw new Error("No auth token found");

    const res = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;
  },

  updateUserProfile: async (data) => {
    const token = localStorage.getItem("token"); 
    await axios.put(`${API_URL}/user`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  changePassword: async (passwordData) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/user/password`,
      passwordData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  getAllUsers: async () => {
    const token = localStorage.getItem("token"); 
    const res = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },
};

export default userService;
