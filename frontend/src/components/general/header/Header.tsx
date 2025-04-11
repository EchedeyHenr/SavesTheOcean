import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import "./header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleDashboard = () => {
    // Redirige al Dashboard
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header-container">
      <img src="Logo.svg" alt="" />
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/reports">Reports</a>
      </nav>
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      {user && (
        <div className="header-buttons">
          <button className="header-button dashboard-btn" onClick={handleDashboard}>
            Dashboard
          </button>
          <button className="header-button logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;