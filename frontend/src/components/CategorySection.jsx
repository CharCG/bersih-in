import icnBattery from '../assets/icon-electronics.svg';
import icnBiological from '../assets/icon-biological.svg';
import icnBrownGlass from '../assets/icon-glass.svg';
import icnCardboard from '../assets/icon-cardboard.svg';
import icnClothes from '../assets/icon-clothes.svg';
import icnMetal from '../assets/icon-metal.svg';
import icnPaper from '../assets/icon-paper.svg';
import icnPlastic from '../assets/icon-plastic.svg';
import icnShoes from '../assets/icon-shoes.svg';
import icnTrash from '../assets/icon-trash.svg';

const CategorySection = () => {
  const categoryList = [
    { name: 'Electronics', icon: icnBattery },
    { name: 'Biological', icon: icnBiological },
    { name: 'Glass', icon: icnBrownGlass },
    { name: 'Cardboard', icon: icnCardboard },
    { name: 'Clothes', icon: icnClothes },
    { name: 'Metal', icon: icnMetal },
    { name: 'Paper', icon: icnPaper },
    { name: 'Plastic', icon: icnPlastic },
    { name: 'Shoes', icon: icnShoes },
    { name: 'Trash', icon: icnTrash },
  ];

  return (
    <section className='categories-section'>
      <div className='categories-header'>
        <h2>Classify up to <span className='brand-bold'>10 categories</span>!</h2>
        <p>
          <span className='brand-bold'>Bersih.In</span> provide instant and accurate waste classification across 10 distinct categories, helping users identify recyclable, organic, and other waste types with ease and precision.
        </p>
      </div>

      <div className='categories-grid'>
        {categoryList.map((item, index) => (
          <div className='category-card' key={index}>
            <div className='cat-icon-wrapper'>
              <img src={item.icon} alt={item.name} className='category-icon-img' />
            </div>
            <span className='category-name'>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
