import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useAuth } from '../context/useAuth';
import Search from './search';
import BtnOutline from './btnOutline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const links = [
    { name: 'Home', url: user?.role === 'creator' ? '/creator/' : '/' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
    user?.role === 'creator' && { name: 'My Videos', url: '/creator/my-videos' },
    user?.role === 'creator' && { name: 'Upload', url: '/creator/upload-video' },
  ].filter(Boolean);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogin = () => navigate('/login');
  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      {/* Navbar Container */}
      <div className="flex items-center justify-between w-full px-6 lg:px-24 py-4 text-white">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-extrabold text-gradient mb-2">
            <span className="text-white">SHAHMEER</span>
          </h1>
        </div>

        {/* Centered Menu Links */}
        <div className="hidden md:flex gap-8">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => navigate(link.url)}
              className={`text-lg font-medium px-4 py-2 rounded-md transition duration-200 ${
                pathname === link.url
                  ? 'bg-yellow-500 text-black'
                  : 'hover:bg-red-600 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right Side: Search & User/Login */}
        <div className="flex items-center gap-5">
          {/* Custom Styled Search */}
          <div className="relative w-64 hidden lg:block">
            <Search />
          </div>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full cursor-pointer hover:scale-105 transition-transform"
                onClick={handleDropdownToggle}
              >
                <IoPersonSharp className="text-2xl text-yellow-500" />
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md z-10">
                  <button
                    onClick={handleLogout}
                    className="block text-left px-4 py-2 w-full hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <BtnOutline
              text="Login"
              css="bg-yellow-500 text-black hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-medium"
              handleClick={handleLogin}
            />
          )}
        </div>

        {/* Sidebar Toggle for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            {sidebarOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden bg-gray-800 text-white w-full p-6 absolute top-full left-0">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => {
                toggleSidebar();
                navigate(link.url);
              }}
              className="block text-left w-full text-lg font-medium px-4 py-2 hover:bg-red-600"
            >
              {link.name}
            </button>
          ))}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                toggleSidebar();
              }}
              className="block text-left w-full text-lg font-medium px-4 py-2 hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
