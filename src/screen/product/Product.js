import './Product.scss';
import products from '../../dummy_data/data';

const Product = () => {
  return (
    <div className='product d-grid'>
      {products.map((product) => (
        <div className='product-card'>
          <img className='product-image' alt={product.name} src={product.image} />
          <div className='product-details'>
            <h5 className='product-name'>{product.name}</h5>
            <div className='product-rating'>{product.rating}</div>
            <div className='product-price'>{product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;