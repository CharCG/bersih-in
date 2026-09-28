import icnSustainability from '../assets/icon-sustainability.svg';
import icnInnovation from '../assets/icon-innovation.svg';
import icnAwareness from '../assets/icon-awareness.svg';


const FeatureSection = () => {
  const featureList = [
    {
      icon: icnSustainability, 
      title: 'Sustainability',
      description: 'We promote eco-friendly habits and responsible waste management.'
    },
    {
      icon: icnInnovation, 
      title: 'Innovation',
      description: 'We leverage AI to make waste sorting smarter and faster.'
    },
    {
      icon: icnAwareness, 
      title: 'Awareness',
      description: 'We inspire communities to take action for a cleaner future.'
    }
  ];

  return (
    <section className='features-section'>
      <div className='features-header'>
        <h1>Turning <span className='brand-bold'>Trash</span> into <span className='brand-bold'>Purpose</span></h1>
        <p><span className='brand-bold'>Bersih.In</span> transforms everyday waste into actionable insights by harnessing the power of AI. Our mission is to promote responsible waste disposal and empower communities to make cleaner choices through technology-driven solutions.</p>
      </div>

      <div className='features-grid'>
        {featureList.map((item, index) => (
          <div className='feature-card' key={index}>
            <div className='icon-wrapper'>
              <img src={item.icon} alt={item.title} className='feature-icon-img' />
            </div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
