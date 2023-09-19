import { Link, useParams } from 'react-router-dom';

import Products from '../../components/products/Products';
import ProductCarousel from '../../components/product_carousel/ProductCarousel';
import './Home.scss';

const Home = () => {

  const { keyword } = useParams();

  return ( 
    <div className='home'>
        {keyword && (
          <Link to='/' className='btn goback-btn'>
            Go Back
          </Link>
        )}
        {/* <ProductCarousel/> */}
        <span className='home-title'>Latest Products</span>
        <Products keyword={keyword}/>
    </div>
  );
}

export default Home;