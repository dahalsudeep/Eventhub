import axios from 'axios';

const API_URL = '/api/comments';

const getEventComments = async (eventId) => {
  const response = await axios.get(`${API_URL}/${eventId}`);
  return response.data;
};

const createComment = async (commentData) => {
  const response = await axios.post(API_URL, commentData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

const deleteComment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export default { getEventComments, createComment, deleteComment };
