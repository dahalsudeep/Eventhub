import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import rsvpService from "../../services/rsvpService";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [rsvpEvents, setRsvpEvents] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && currentUser?.role !== "admin") {
      const fetchRSVPEvents = async () => {
        try {
          const response = await rsvpService.getUserRSVPs();
          setRsvpEvents(response);
        } catch (error) {
          console.error("Error fetching RSVP events:", error);
        }
      };
      fetchRSVPEvents();
    }
  }, [isAuthenticated, currentUser]);

  const handleRSVPClick = () => {
    const path = currentUser?.role === "admin" ? "/admin/rsvps" : "/rsvp-events";
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            EventHub
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/events" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Events
            </Link>

            {isAuthenticated && (
              <button
                onClick={handleRSVPClick}
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                {currentUser?.role === "admin" ? "RSVPs" : "My RSVPs"}
              </button>
            )}

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                {(currentUser?.role === "admin" || currentUser?.role === "organizer") && (
                  <Link to="/events/create" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                    Create Event
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2 pb-4">
            <Link
              to="/events"
              className="px-4 py-2 text-left text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Events
            </Link>

            {isAuthenticated && (
              <button
                onClick={handleRSVPClick}
                className="px-4 py-2 text-left text-gray-700 hover:text-blue-600"
              >
                {currentUser?.role === "admin" ? "RSVPs" : "My RSVPs"}
              </button>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-2 text-left text-gray-700 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                {(currentUser?.role === "admin" || currentUser?.role === "organizer") && (
                  <Link
                    to="/events/create"
                    className="px-4 py-2 text-left text-gray-700 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-left text-gray-700 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-left text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
