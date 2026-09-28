import { useState } from 'react';

import imgLogo from '../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const scrollToUpload = () => {
    closeMenu();
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className='nav' aria-label='Main navigation'>
      <div className='nav-container'>
        <a className='nav-logo' href='#home' onClick={closeMenu} aria-label='Bersih.In home'>
          <img src={imgLogo} alt='Bersih.In Logo' />
        </a>

        <button
          className='nav-menu-toggle'
          type='button'
          aria-label='Toggle navigation menu'
          aria-expanded={menuOpen}
          aria-controls='nav-menu'
          onClick={() => setMenuOpen(current => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-menu${menuOpen ? ' nav-menu-open' : ''}`} id='nav-menu'>
          <ul className='nav-links'>
            <li><a href='#home' onClick={closeMenu}>Home</a></li>
            <li><a href='http://localhost:3000/docs' target='_blank' rel='noreferrer' onClick={closeMenu}>Resources</a></li>
          </ul>
          <button className='btn-try-now' type='button' onClick={scrollToUpload}>Try Now</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
