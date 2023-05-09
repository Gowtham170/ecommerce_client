import './Products.scss';
import products from '../../dummy_data/data';

const Products = () => {
  return (
    <div>{products.map((product) => product._id)}</div>
  )
}

export default Products;