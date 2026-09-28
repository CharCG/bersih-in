import imgLogo from '../assets/logo.png'; 
import icnInstagram from '../assets/icon-instagram.svg';
import icnFacebook from '../assets/icon-facebook.svg';
import icnTwitter from '../assets/icon-twitter.svg';
import icnLinkedIn from '../assets/icon-linkedin.svg';
import icnGitHub from '../assets/icon-github.svg';

const Footer = () => {
  return (
    <footer className='footer-section'>
      
      <div className='footer-container'>
        <div className='footer-top'>
          <div className='footer-brand'>
            <div className='footer-logo'><img src={imgLogo} alt='Bersih.In Logo' className='footer-logo-img' /></div>
            <p className='footer-desc'>Bersih.In is an AI-powered platform that instantly classifies waste from a single image.</p>
            <div className='social-icons'>
               <a href="" target='_blank'><img src={icnInstagram} alt='Instagram Logo' className='social-icon' /></a>
               <a href="" target='_blank'><img src={icnFacebook} alt='Facebook Logo' className='social-icon' /></a>
               <a href="" target='_blank'><img src={icnTwitter} alt='Twitter Logo' className='social-icon' /></a>
               <a href="" target='_blank'><img src={icnLinkedIn} alt='LinkedIn Logo' className='social-icon' /></a>
               <a href="https://github.com/bersih-in" target='_blank'><img src={icnGitHub} alt='GitHub Logo' className='social-icon' /></a>
            </div>
          </div>

          <div className='footer-links-wrapper'>
            <div className='footer-column'>
              <h4>Product</h4>
              <ul>
                <li><a href='http://github.com/charcg/bersih-in' target='_blank'>Changelog</a></li>
                <li><a href='' target='_blank'>API</a></li>
                <li><a href=''>Model</a></li>
              </ul>
            </div>
            <div className='footer-column'>
              <h4>Resources</h4>
              <ul>
                <li><a href=''>Documentation</a></li>
                <li><a href=''>Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div> 

      <div className='footer-bottom'>
        <div className='footer-bottom-content'>
          <p>© 2025 Bersih.In. All rights reserved.</p>
          <div className='footer-legal'>
            <a href=''>Privacy Policy</a>
            <a href=''>Terms of Use</a>
            <a href=''>Code of Conduct</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
