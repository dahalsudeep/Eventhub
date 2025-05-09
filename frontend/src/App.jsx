import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EditEventPage from './pages/EditEventPage';
import EventDetailPage from './pages/EventDetailPage';
import EventCreatePage from './pages/EventCreatePage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './utils/protectedRoute';
import UserRSVPPage from './pages/UserRSVPPage';
import AdminRSVPPage from './pages/AdminRSVPPage';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/events/:eventId/edit" element={<EditEventPage />} />
            <Route path="/rsvp-events" element={<UserRSVPPage />} />
            <Route path="/admin/rsvps" element={<ProtectedRoute><AdminRSVPPage /></ProtectedRoute>} />
            <Route 
              path="/events/create" 
              element={
                <ProtectedRoute>
                  <EventCreatePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;