import { useState } from 'react';
import './ProductPreview.scss';
// import products from '../../dummy_data/data';
import Rating from '../../components/rating/Rating';
import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../../redux/slices/api/productsApiSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import Button from '../../components/button/Button';

const ProductPreview = () => {

    const { id } = useParams();

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const product = products.find((p) => p._id === id);
    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}));
        navigate('/cart');
    }

    return (
        <div className='preview-container'>
            <Link to='/' className='btn goback-btn'>Go Back</Link>
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
                            {product.countInStock > 0 && (
                                 <div className='table-col'>
                                 <span>Qty:</span>
                                 <select className='btn' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                     {[...Array(product.countInStock).keys()].map((current_value) =>(
                                        <option  key={current_value + 1} value={current_value + 1}>
                                            {current_value + 1}
                                        </option>
                                     ) )}
                                 </select>
                                 <hr style={{ marginBlock: '.7rem' }} />
                             </div>
                            )}
                            <Button children='Add to Cart'
                                className='btn' 
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductPreview;