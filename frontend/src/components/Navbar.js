import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-600';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-primary-600">
            Öğrenci Ders Çalışma Sistemi
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>
              Ana Sayfa
            </Link>
            <Link to="/survey" className={`${isActive('/survey')} transition-colors duration-200`}>
              Anket
            </Link>
            <Link to="/students" className={`${isActive('/students')} transition-colors duration-200`}>
              Öğrenciler
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link to="/" className={`${isActive('/')} py-2`} onClick={toggleMenu}>
                Ana Sayfa
              </Link>
              <Link to="/survey" className={`${isActive('/survey')} py-2`} onClick={toggleMenu}>
                Anket
              </Link>
              <Link to="/students" className={`${isActive('/students')} py-2`} onClick={toggleMenu}>
                Öğrenciler
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 