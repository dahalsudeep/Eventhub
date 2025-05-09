import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import Button from '../components/common/Button';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching event with ID:", id); // Debugging

    if (!id) {
      setError("Invalid event ID.");
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const data = await eventService.getEventById(id);
        console.log("Event fetched:", data); // Debugging
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-gray-500 text-center">Loading event...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="flex flex-wrap gap-4 text-gray-800">
          <p><strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>📍 Location:</strong> {event.location}</p>
          <p><strong>👥 Max Attendees:</strong> {event.maxAttendees}</p>
          <p><strong>🧑‍💼 Organizer:</strong> {event.organizer?.name} ({event.organizer?.email})</p>
        </div>

        <div className="mt-6 flex gap-4">
          <Button className="px-6 py-3" onClick={() => navigate('/events')}>Back to Events</Button>
          {/* Add Edit/Delete buttons if user is the organizer */}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
