import Rating from '../rating/Rating';
import { Link } from 'react-router-dom';
import './Product.scss';

const Product = ({ product}) => {
  return (
    <div className='product-card'>
      <img className='product-image' alt={product.name} src={product.image} />
      <div className='product-details'>
        <Link to={`/product/${product._id}`}>
          <h5 className='product-name'>{product.name}</h5>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        <h3>${product.price}</h3>
      </div>
    </div>
  );
}

export default Product;