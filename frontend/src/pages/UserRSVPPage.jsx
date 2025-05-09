import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rsvpService from "../services/rsvpService";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/common/Spinner";

const UserRSVPPage = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchRSVPs = async () => {
      try {
        setLoading(true);
        const response = await rsvpService.getUserRSVPs();
        setRsvps(response);
      } catch (err) {
        console.error("Error fetching RSVPs:", err);
        setError("Failed to load RSVPs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p className="text-center text-red-500">Please log in to view your RSVPs.</p>;
  }

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">My RSVPs</h2>

      {rsvps.length === 0 ? (
        <p className="text-center text-gray-600">You have not RSVP'd for any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rsvps.map(({ event, status }) => (
            <div key={event._id} className="border rounded-lg p-4 shadow-sm bg-white">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">
                📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
              </p>
              <p className={`mt-2 font-medium ${status === "accepted" ? "text-green-600" : status === "declined" ? "text-red-600" : "text-yellow-500"}`}>
                RSVP Status: {status}
              </p>
              <Link 
                to={`/events/${event._id}`} 
                className="mt-3 inline-block text-blue-500 hover:underline"
              >
                View Event
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRSVPPage;
