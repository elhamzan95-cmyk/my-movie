import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/logu.png';
import phoneImage from '@/assets/arrow.png';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      closeMobileMenu();
    }
  };

  return (
    <>
      <header className="bg-[#171717] text-white shadow-md sticky top-0 z-50 rounded-t-3xl">
        <div className="container mx-auto px-4 sm:px-8 pt-6 pb-3 flex items-center justify-between">
          {/* Logo + site name */}
          <Link to="/" className="flex items-center gap-x-2" onClick={closeMobileMenu}>
            <img
              src={logo}
              alt="Logo"
              className="w-9 h-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-white text-2xl font-bold">CineHub</span>
          </Link>

          {/* Desktop menu - hidden on mobile */}
          <nav className="hidden md:flex flex-1 justify-center gap-x-12">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/about">About Us</NavLink>

            {isAuthenticated() ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                {isAdmin && <NavLink to="/admin">Admin</NavLink>}
              </>
            ) : (
              <>
                <NavLink to="/login">Sign In</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </nav>

          {/* Contact button (desktop) */}
          <div className="hidden md:block">
            <ContactButtonDesktop />
          </div>

          {/* Hamburger button for mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#2A2A2A] transition"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu - absolute with overlay */}
        {mobileMenuOpen && (
          <>
            {/* Dark overlay - z-30 */}
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Dropdown menu - z-40, rounded bottom */}
            <div className="absolute left-0 right-0 top-full bg-[#2A2A2A] border-t border-gray-700 px-4 py-3 space-y-3 z-40 md:hidden shadow-xl rounded-b-3xl">
              <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
              <MobileNavLink to="/movies" onClick={closeMobileMenu}>Movies</MobileNavLink>
              <MobileNavLink to="/about" onClick={closeMobileMenu}>About Us</MobileNavLink>

              {isAuthenticated() ? (
                <>
                  <MobileNavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</MobileNavLink>
                  {isAdmin && <MobileNavLink to="/admin" onClick={closeMobileMenu}>Admin Panel</MobileNavLink>}
                </>
              ) : (
                <>
                  <MobileNavLink to="/login" onClick={closeMobileMenu}>Sign In</MobileNavLink>
                  <MobileNavLink to="/register" onClick={closeMobileMenu}>Register</MobileNavLink>
                </>
              )}

              {/* Contact */}
              <MobileNavLink to="/contact" onClick={closeMobileMenu}>
                Contact Us
              </MobileNavLink>

              {/* Logout */}
              {isAuthenticated() && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-400 hover:text-red-300"
                >
                  Log Out
                </button>
              )}
            </div>
          </>
        )}
      </header>
    </>
  );
};

// Helper components
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative overflow-hidden text-white transition-colors duration-700 z-10 after:content-[''] after:absolute after:inset-0 after:bg-[#666666] after:z-[-1] after:origin-bottom after:scale-y-0 after:transition-transform after:duration-700 hover:after:scale-y-100 px-3 py-1"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    className="block py-2 text-white hover:text-orange-400 transition"
    onClick={onClick}
  >
    {children}
  </Link>
);

const ContactButtonDesktop = () => (
  <Link
    to="/contact"
    className="bg-[#666666] text-white py-1 pl-3 pr-1 rounded-full flex items-center gap-x-4"
  >
    <span>Contact Us</span>
    <span className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
      <img src={phoneImage} alt="Old phone" className="w-5 h-5 object-contain" />
    </span>
  </Link>
);

export default Header;