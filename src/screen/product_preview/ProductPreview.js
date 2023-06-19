import './ProductPreview.scss';
// import products from '../../dummy_data/data';
import Rating from '../../components/rating/Rating';
import { Link, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../../redux/slices/api/productsApiSlice';

const ProductPreview = () => {

    let { id } = useParams();
    // const product = products.find((p) => p._id === id);
    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

    console.log(product);

    return (
        <div className='preview-container'>
            <Link to='/' className='btn back-btn'>Go Back</Link>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <div>{error?.data?.message || error.error}</div>
            ) : (
                <div className='preview d-grid'>
                    <img src={product.image} alt={product.name} className='preview-image' />
                    <div className='preview-details'>
                        <h3 className='preview-name'>{product.name}</h3>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        <div className='preview-price'>
                            <strong>Price: &#8377; {product.price}</strong>
                        </div>
                        <div>Description: {product.description}</div>
                    </div>
                    <div className='add-to-cart'>
                        <div className='table'>
                            <div className='table-col'>
                                <span>Price:</span>
                                <span className='table-value'>&#8377;{product.price}</span>
                                <hr style={{ marginBlock: '.7rem' }} />
                            </div>
                            <div className='table-col'>
                                <span>Stock:</span>
                                <span className='table-value'>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                <hr style={{ marginBlock: '.7rem' }} />
                            </div>
                            <button className='btn' type='button' disabled={product.countInStock === 0}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductPreview;