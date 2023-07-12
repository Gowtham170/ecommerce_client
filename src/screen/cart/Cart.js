import './Cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import Button from '../../components/button/Button';
//import cartItems from '../../dummy_data/data';

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({...product, qty}));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const navigateToCheckout = () => {
    navigate('/shipping');
  }


  return (
    // <div className='home'>
      <div className='d-grid cart-container'>
        <span className='cart-title'>Shopping cart</span>
        {cartItems.length === 0
          ? (
            <div className='message'> Your cart is empty <Link to='/'>Go Back</Link></div>
          ) : (
            <div className='cart'>
              {cartItems.map((item) => (
                <table key={item._id}>
                  <tbody>
                    <tr>
                      <td> <img src={item.image} className='cart-image' /></td>
                      <td style={{ width: '260px' }}><Link to={`/product/${item._id}`} className='cart-name'>{item.name}</Link></td>
                      <td className='cart-price'>&#8377; {item.price}</td>
                      <td>
                        <select className='btn cart-qty' value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                          {[...Array(item.countInStock).keys()].map((current_value) => (
                            <option key={current_value + 1}>
                              {current_value + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button className='btn delete-btn' onClick={() => removeFromCartHandler(item._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          )}
        <div className='price-calculation'>
          <h5 className='sub-total'> Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h5>
          <div className='total-price'>&#8377;{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</div>
          <hr style={{ marginBlock: '.7rem' }} /> 
          <Button children='Proceed To Ckeckout'
              type='button'
              className='btn checkout-btn'
              disabled={cartItems.length === 0}
              onClick={navigateToCheckout}/>
              
        </div>
      </div>
  );
}

export default Cart