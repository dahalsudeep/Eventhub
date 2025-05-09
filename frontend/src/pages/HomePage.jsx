import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import eventService from "../services/eventService";
import EventCard from "../components/events/EventCard";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";

const HomePage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]); // Ensure default state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser, isAuthenticated } = useContext(AuthContext);

  // Debugging: Check current user on each render
  useEffect(() => {
    console.log("🏠 HomePage Re-rendered. Current User:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        setLoading(true);
        // Get only a few events for the homepage
        const response = await eventService.getAllEvents({ limit: 3 });

        console.log("📢 API Response:", response); // Debugging: Check what API returns

        // Ensure we set an array (handle different response structures)
        const events = Array.isArray(response) ? response : response?.events || [];

        setFeaturedEvents(events);
      } catch (err) {
        console.error("❌ Error fetching featured events:", err);
        setError("Failed to load featured events");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 rounded-xl">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isAuthenticated ? `Welcome Back, ${currentUser?.name}!` : "Discover and Join Amazing Events"}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isAuthenticated
              ? "Browse upcoming events or create your own!"
              : "Connect with others, find events near you, and create unforgettable memories."}
          </p>

          {/* Show different buttons based on authentication state */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/events">
              <Button className="text-lg px-6 py-3">Browse Events</Button>
            </Link>
            {!isAuthenticated ? (
              <Link to="/register">
                <Button variant="secondary" className="text-lg px-6 py-3">
                  Sign Up Free
                </Button>
              </Link>
            ) : null} {/* Remove Go to Dashboard button */}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50 rounded-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            <p className="mt-4 text-xl text-gray-600">Check out these popular upcoming events</p>
          </div>

          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center text-red-600">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {Array.isArray(featuredEvents) && featuredEvents.length > 0 ? (
                featuredEvents.map((event) => <EventCard key={event._id} event={event} />)
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-600">No events found. Check back soon!</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/events">
              <Button variant="secondary">View All Events</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
