import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import Button from '../components/common/Button';

const EventCreatePage = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await eventService.createEvent(eventData);
      navigate('/events');
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">Create a New Event</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input type="date" name="date" value={eventData.date} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input type="text" name="location" value={eventData.location} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Max Attendees</label>
          <input type="number" name="maxAttendees" value={eventData.maxAttendees} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div className="flex gap-4">
          <Button type="submit" className="px-6 py-3" disabled={loading}>{loading ? 'Creating...' : 'Create Event'}</Button>
          <Button variant="secondary" className="px-6 py-3" onClick={() => navigate('/events')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default EventCreatePage;
