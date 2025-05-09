import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';


const getAllEvents = async (filters = {}) => {
  const response = await axios.get(`${API_URL}`, { params: filters });
  return response.data;
};


const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

const updateEvent = async (eventId, eventData) => {
  return axios.put(`http://localhost:5000/api/events/${eventId}`, eventData);
};

const deleteEvent = async (eventId) => {
  return axios.delete(`${API_URL}/${eventId}`);
};


export default { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
