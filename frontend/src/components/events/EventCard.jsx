import { Link } from "react-router-dom";
import Card from "../common/Card";
import { formatDate } from "../../utils/dateUtils";
import useAuth from "../../hooks/useAuth";
import RSVPButton from "./RSVPButton"; 
import eventService from "../../services/eventService"; 

const EventCard = ({ event, onDelete }) => {
  if (!event) return <p className="text-red-500">Error: Event data is missing.</p>;

  const {
    _id,
    title = "Untitled Event",
    description = "No description available.",
    date = "",
    location = "Unknown",
    maxAttendees = 0,
  } = event;

  const { currentUser } = useAuth();
  const canEdit = currentUser && (currentUser.role === "admin" || currentUser.role === "organizer");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
  
    try {
      await eventService.deleteEvent(_id);
      alert("Event deleted successfully!");
      window.location.reload(); // Reload the page after deletion
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event.");
    }
  };
  
  return (
    <Card className="h-full flex flex-col shadow-md rounded-lg transition-transform hover:scale-[1.02] bg-white">
      <div className="h-36 bg-gray-100 rounded-t-lg flex items-center justify-center">
        <div className="text-gray-500 text-4xl opacity-80">📅</div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="space-y-1 text-xs text-gray-600 mb-4">
          <div className="flex items-center">
            <span>{formatDate(date) || "Date not set"}</span>
          </div>
          <div className="flex items-center">
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <span>Max Attendees: {maxAttendees}</span>
          </div>
        </div>

        {currentUser && (
          <div className="mb-2">
            <RSVPButton eventId={_id} currentStatus="pending" />
          </div>
        )}
      </div>

      <div className="px-4 pb-4 flex flex-col gap-2">
        <Link
          to={`/events/${_id}`}
          className="block w-full py-2 text-sm bg-blue-400 hover:bg-blue-500 text-white text-center rounded transition-colors"
        >
          View Details
        </Link>

        {canEdit && (
          <div className="flex gap-2">
            <Link
              to={`/events/${_id}/edit`}
              className="w-1/2 py-2 text-sm bg-yellow-300 hover:bg-yellow-400 text-gray-800 text-center rounded transition-colors"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="w-1/2 py-2 text-sm bg-red-300 hover:bg-red-400 text-gray-800 text-center rounded transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
