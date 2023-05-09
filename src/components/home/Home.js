import Product from '../../screen/product/Product';
import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
        <span className='home-title'>Latest Products</span>
        <Product/>
    </div>
  );
}

export default Home;