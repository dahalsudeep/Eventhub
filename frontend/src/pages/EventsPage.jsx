import { useState, useEffect } from 'react';
import eventService from '../services/eventService';
import EventCard from '../components/events/EventCard';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventService.getAllEvents();
        console.log("API Response:", response); // Debugging

        // Ensure response is an array or fallback to an empty array
        const eventsArray = Array.isArray(response) ? response : response?.events || [];

        setEvents(eventsArray);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setEvents([]); // Prevent issues
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const canCreateEvent = isAuthenticated && (currentUser?.role === 'admin' || currentUser?.role === 'organizer');

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        {canCreateEvent && (
          <Link to="/events/create">
            <Button className="mt-4 md:mt-0 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Event
            </Button>
          </Link>
        )}
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No events found.</p>
      )}
    </div>
  );
};

export default EventsPage;
