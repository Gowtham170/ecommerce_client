import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Rating from '../../components/rating/Rating';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation
} from '../../redux/slices/api/productsApiSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-hot-toast';
import './ProductPreview.scss';

const ProductPreview = () => {

    const { id: productId } = useParams();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await createReview({ productId, rating, comment }).unwrap();
            if (res?.error) {
                toast.error(res?.error?.data?.message);
            } else {
                toast.success('Review Submitted');
                refetch();
                setRating(0);
                setComment('');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <>
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
                            <hr style={{ marginBlock: '2rem' }} />
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            <hr style={{ marginBlock: '2rem' }} />
                            <div className='preview-price'>
                                <strong>Price: ${product.price}</strong>
                            </div>
                            <hr style={{ marginBlock: '2rem' }} />
                            <div className='preview-description'><strong>Description: </strong>{product.description}</div>
                        </div>
                        <div className='add-to-cart'>
                            <div className='table d-grid'>
                                <div className='table-col'>
                                    <div className='table-padding'>Price:</div>
                                    <hr/>
                                    <div className='table-padding'>Stock:</div>
                                    <hr/>
                                    <div className='table-padding'>Qty:</div>
                                    <hr/>
                                </div>
                                <div className='table-value'>
                                    <div className='table-padding'><strong>${product.price}</strong></div>
                                    <hr/>
                                    <div className='table-padding'>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                                    <hr/>
                                    <select className='btn qty' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                            {[...Array(product.countInStock).keys()].map((current_value) => (
                                                <option key={current_value + 1} value={current_value + 1}>
                                                    {current_value + 1}
                                                </option>
                                            ))}
                                    </select>
                                    <hr/>
                                </div>
                            </div>
                            <Button children='Add to Cart'
                                    type='button'
                                    className='btn add-to-cart-btn'
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0} />
                        </div>
                    </div>
                )}
            </div>
            <div className='review d-grid'>
                <div>
                    <h2>Reviews</h2>
                    {product?.reviews?.length === 0 && <Message children='No Reviews' className='no-review-message' />}
                    <div className='review-container'>
                        {product?.reviews?.map((review) => (
                            <>
                                <div key={review.name} className=''>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review?.createdAt?.substring(0, 10)}</p>
                                    <p className='comment'>{review.comment}</p>
                                </div>
                                <hr style={{ marginBlock: '3rem' }} />
                            </>
                        ))}

                        <>
                            <h2>Write a Customer Review</h2>
                            {loadingProductReview && <div>loading...</div>}
                            {userInfo ? (
                                <form className='review-form' onSubmit={onSubmitHandler}>
                                    <div className='form-group'>
                                        <label htmlFor='rating'
                                            className='form-label'>
                                            Rating
                                        </label>
                                        <select id='rating'
                                            name='rating'
                                            className='form-control'
                                            value={rating}
                                            onChange={(e) => setRating(Number(e.target.value))}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </select>
                                        <label htmlFor='comment'
                                            className='form-label'>
                                            Comment
                                        </label>
                                        <textarea id='comment'
                                            name='comment'
                                            className='form-control'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)} />
                                        <Button children='Submit'
                                            type='submit'
                                            className='btn submit-btn'
                                            disabled={loadingProductReview} />
                                    </div>
                                </form>
                            ) : (
                                <div className='message'>
                                    Please {<Link to='/login'>Sign in</Link>} to write a review
                                </div>
                            )}
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPreview;