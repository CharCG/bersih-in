import imgMascot from '../assets/mascot-rotated.png';

const HeroSection = () => {
  return (
    <section className='hero-container'>
      <div className='hero-top'>
        <div className='hero-title'><h1>Pioneering a Cleaner Tomorrow</h1></div>
        <div className='hero-info'>
          <p><span className='brand-highlight'>Bersih.In</span> is an <span className='underline'>AI-powered</span> platform that instantly classifies waste from a single image.</p>
          <div className='hero-buttons'>
            <button
              className='btn-scan'
              onClick={() => {
                const section = document.getElementById('upload-section');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Scan Now
            </button>
            <a href='http://localhost:5000/docs' target='_blank'><button className='btn-learn'>Learn More</button></a>
          </div>
        </div>
      </div>

      <div className='hero-visual'>
        <div className='video-wrapper'>
          <iframe
            className='video-player'
            src='https://www.youtube.com/embed/ARj_fgwSt8o'
            title='Bersih.In promotional video'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          />
        </div>
        <img src={imgMascot} alt='Bersih.In Mascot' className='floating-mascot' />
      </div>
    </section>
  );
}

export default HeroSection;
