import axios from "axios";

const API_URL = "http://localhost:5000/api/rsvps";

// Function to get auth token
const getAuthToken = () => localStorage.getItem("token");

const getUserRSVPs = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${API_URL}/my-rsvps`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user RSVPs:", error.response?.data || error.message);
    throw error;
  }
};

const getEventRSVPs = async (eventId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${API_URL}/${eventId}/rsvps`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching event RSVPs:", error.response?.data || error.message);
    throw error;
  }
};

const getRSVP = async (eventId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${API_URL}/${eventId}/rsvp`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching RSVP:", error.response?.data || error.message);
    throw error;
  }
};

const updateRSVP = async (eventId, status) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("No authentication token found");

    const response = await axios.put(
      `${API_URL}/${eventId}/rsvp`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating RSVP:", error.response?.data || error.message);
    throw error;
  }
};

export default { getUserRSVPs, getRSVP, updateRSVP, getEventRSVPs};
