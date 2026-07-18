import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const st = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  return (
    <nav>
      <Link className="nb" to="/" onClick={st}>
        Offline<span>·</span>AI
      </Link>

      <div className={`nl ${open ? 'open' : ''}`}>
        <Link to="/" onClick={st}>Home</Link>
        <a href="/#features">Features</a>
        <Link to="/talk-to-agent" onClick={st}>AI Agent</Link>
        <Link to="/about" onClick={st}>About & Impact</Link>
        <Link to="/truck-owner" onClick={st}>Register your Truck</Link>
      </div>

      <button
        className="hb"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <FiMenu size={28} />
      </button>
    </nav>
  );
}