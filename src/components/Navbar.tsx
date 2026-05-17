import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  notificationCount?: number;
}

export default function Navbar({ darkMode, toggleDarkMode, notificationCount = 0 }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Clubs', href: '#clubs' },
    { label: 'Posts', href: '#posts' },
    { label: 'Members', href: '#members' },
    { label: 'Events', href: '#events' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo">
            <span className="logo-text">ClubHub</span>
            <div className="logo-accent"></div>
          </div>
        </div>

        <div className={`nav-center ${isMenuOpen ? 'nav-center-open' : ''}`}>
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search clubs, posts, members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="nav-right">
          <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleDarkMode} aria-label="Toggle theme">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="icon-btn notification-btn" aria-label="Notifications">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="notification-badge">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>

            <div className="user-menu">
              <div className="user-avatar">JD</div>
            </div>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}