import imgLogo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className='nav-container'>
        <div className='nav-logo'><img src={imgLogo} alt='Bersih.In Logo' /></div>
        <ul className='nav-links'>
          <li><a href=''>Home</a></li>
          <li><a href='http://localhost:5000/docs' target='_blank'>Resources</a></li>
        </ul>
        <button
          className='btn-try-now'
          onClick={() => {
            const section = document.getElementById('upload-section');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Try Now
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
