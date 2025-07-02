// React Hooks
import { useAuthUser } from '@/hooks/auth/useAuthUser';

// React Tools
import { useState, useRef, useEffect, useContext } from 'react';

// Cookies
import Cookies from 'js-cookie';

// React Router
import { useNavigate } from 'react-router';

// Auth Context
import { AuthContext } from '@/context/AuthContext';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ambil data user
  const user = useAuthUser();

  // Router
  const navigate = useNavigate();

  // Auth Context (Logout)
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    auth?.setIsAuthenticated(false);
    navigate('/login');
  };

  // Menutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-transparent px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-700">Semangat Pagi, {user?.name}</h2>
        </div>

        <div className="relative" ref={dropdownRef}>
          {/* Profile */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setShowDropdown((prev) => !prev)}>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Profile" className="w-8 h-8 rounded-full" />
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
