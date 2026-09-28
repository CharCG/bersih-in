import './App.css';

import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx'; 
import FeatureSection from './components/FeatureSection.jsx';
import CategorySection from './components/CategorySection.jsx';
import UploadSection from './components/UploadSection.jsx'; 
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection /> 
      <FeatureSection />  
      <CategorySection />
      <UploadSection />
      <Footer />
    </div>
  );
}

export default App;
