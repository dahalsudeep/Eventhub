import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventService from "../services/eventService";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const event = await eventService.getEventById(eventId);
        setEventData({
          title: event.title,
          description: event.description,
          date: event.date.split("T")[0], // Format for input[type=date]
          location: event.location,
          maxAttendees: event.maxAttendees,
        });
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventService.updateEvent(eventId, eventData);
      alert("Event updated successfully!");
      navigate(`/events/${eventId}`); // Redirect to event details
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Failed to update event. Please try again.");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Max Attendees</label>
            <input
              type="number"
              name="maxAttendees"
              value={eventData.maxAttendees}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit">Save Changes</Button>
            <Button variant="secondary" onClick={() => navigate(`/events/${eventId}`)}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;
