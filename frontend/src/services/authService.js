import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: { "Content-Type": "application/json" }
  });

  console.log(response.data);
  const { user, token } = response.data;

  if (user && token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // Store user details
  }

  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  console.log(response.data);
  const { user, token } = response.data;
  console.log(token);

  if (user && token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // Store user details
  }

  return response.data;
};

const getCurrentUser = async () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}


const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/user`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const updatedUser = response.data;
  if (updatedUser) {
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Update stored user data
  }

  return updatedUser;
};

export default { register, login, getCurrentUser, updateProfile , getAllUsers};
