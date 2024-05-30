import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#202020', color: 'white', padding: '10px' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>Mithiko Giousouroum</Link>
      <Link to="/upload" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}> Upload</Link>
      {/* You can add more navigation links here */}
    </nav>
  );
}

export default Navbar;
