const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EventHub</h3>
              <p className="text-gray-300">
                Bringing people together through organized events.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/events" className="hover:text-blue-400">Events</a></li>
                <li><a href="/login" className="hover:text-blue-400">Login</a></li>
                <li><a href="/register" className="hover:text-blue-400">Sign Up</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">
                Email: info@eventhub.com<br />
                Phone: +44  7467 609924
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
            <p>&copy; {currentYear} EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;