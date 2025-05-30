import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const baseUrl = process.env.PUBLIC_URL; // https://camaar2.github.io/pogenemisruum

  return (
    <header className="header">
      {/* Left side: Profile circle + “Logi sisse” link */}
      <div className="header-left">
        {/* (siia võid lisada sisselogimise nupu jm) */}
      </div>

      {/* Center: Logo (clickable to home page) */}
      <div className="header-center">
        <Link to="/">
          <img
            src={baseUrl + '/logo.png'}
            alt="Logo"
            className="header-logo"
          />
        </Link>
      </div>

      {/* Right side: Navigation links */}
      <nav className="header-right">
        <ul>
          <li><Link to="/kkk">KKK</Link></li>
          <li><Link to="/meist">Meist</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
