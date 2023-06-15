import Products from '../../screen/products/Products';
import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
        <span className='home-title'>Latest Products</span>
        <Products/>
    </div>
  );
}

export default Home;