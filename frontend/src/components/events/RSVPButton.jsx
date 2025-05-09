import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import rsvpService from "../../services/rsvpService";

const RSVPButton = ({ eventId, onStatusChange }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !currentUser) return;

    const fetchRSVP = async () => {
      try {
        const response = await rsvpService.getRSVP(eventId);
        setStatus(response.status);
      } catch (error) {
        console.error("Failed to fetch RSVP:", error);
        setStatus("none");
      }
    };

    fetchRSVP();
  }, [eventId, isAuthenticated, currentUser]);

  const updateRSVP = async (newStatus) => {
    if (!isAuthenticated) {
      alert("Please log in to RSVP for this event");
      return;
    }

    setIsSubmitting(true);
    try {
      await rsvpService.updateRSVP(eventId, newStatus);
      setStatus(newStatus);
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
    } catch (err) {
      console.error("RSVP error:", err);
      alert("Failed to update RSVP status");
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseBtn =
    "px-4 py-2 rounded text-sm font-medium transition duration-150 border";

  const activeStyles = {
    accepted: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200",
    declined: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200",
  };

  const inactiveStyles =
    "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";

  return (
    <div className="space-y-2 mt-2">
      <p className="font-medium text-sm text-gray-700">
        Your RSVP status:{" "}
        <span className="capitalize font-semibold text-blue-600">
          {status || "Not Responded"}
        </span>
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          className={`${baseBtn} ${
            status === "accepted" ? activeStyles.accepted : inactiveStyles
          }`}
          onClick={() => updateRSVP("accepted")}
          disabled={isSubmitting}
        >
          Going
        </button>

        <button
          className={`${baseBtn} ${
            status === "pending" ? activeStyles.pending : inactiveStyles
          }`}
          onClick={() => updateRSVP("pending")}
          disabled={isSubmitting}
        >
          Maybe
        </button>

        <button
          className={`${baseBtn} ${
            status === "declined" ? activeStyles.declined : inactiveStyles
          }`}
          onClick={() => updateRSVP("declined")}
          disabled={isSubmitting}
        >
          Not Going
        </button>
      </div>
    </div>
  );
};

export default RSVPButton;
