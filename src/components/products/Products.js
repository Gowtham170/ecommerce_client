import './Products.scss';
//import products from '../../dummy_data/data';
import Product from '../product/Product';
import { useGetProductsQuery } from '../../redux/slices/api/productsApiSlice';

const Products = () => {

  const { data: products, isLoading, error } = useGetProductsQuery();
  
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
      <>
        <div className='product d-grid'>
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </>
      )}

    </>
  );
}

export default Products;