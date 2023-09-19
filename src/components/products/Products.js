import Product from '../product/Product';
import { useGetProductsQuery } from '../../redux/slices/api/productsApiSlice';
import './Products.scss';

const Products = ({ keyword }) => {

  const { data: products, isLoading, error } = useGetProductsQuery({ keyword });

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