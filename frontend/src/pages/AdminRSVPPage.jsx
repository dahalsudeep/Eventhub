import { useEffect, useState } from "react";
import eventService from "../services/eventService";
import rsvpService from "../services/rsvpService";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRSVPPage = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") return;

    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        setEvents(response);
      } catch (error) {
        console.error("Failed to load events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentUser]);

  const fetchRSVPs = async (eventId) => {
    setSelectedEventId(eventId);
    setLoading(true);
    try {
      const response = await rsvpService.getEventRSVPs(eventId);
      setRsvps(response);
    } catch (error) {
      console.error("Failed to fetch RSVPs", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage RSVPs</h1>

      {loading && <Spinner />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className={`p-4 border rounded-lg cursor-pointer transition ${
              selectedEventId === event._id ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => fetchRSVPs(event._id)}
          >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">
              {event.location} | {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              {event.maxAttendees} Attendees Limit
            </p>
          </div>
        ))}
      </div>

      {selectedEventId && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">RSVPs for Selected Event</h2>

          {loading ? (
            <Spinner />
          ) : rsvps.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <th className="px-4 py-3 border-b">User</th>
                    <th className="px-4 py-3 border-b">Email</th>
                    <th className="px-4 py-3 border-b">RSVP Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp, idx) => (
                    <tr
                      key={rsvp._id}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 border-b">{rsvp.user.name}</td>
                      <td className="px-4 py-3 border-b">{rsvp.user.email}</td>
                      <td className="px-4 py-3 border-b capitalize">
                        {rsvp.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No RSVPs found for this event.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminRSVPPage;

