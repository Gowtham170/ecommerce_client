import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import './Cart.scss';

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const navigateToCheckout = () => {
    navigate('/shipping');
  }


  return (
    <div className='d-grid cart-container'>
      <span className='cart-title'>Shopping cart</span>
      {cartItems.length === 0
        ? (
          <Message children={`Your cart is empty`} className='message' />
        ) : (
          <div className='cart'>
            {cartItems.map((item) => (
              <div className='cart-wrapper'>
                <img src={item.image} className='cart-image' alt={item.name}></img>
                <Link to={`/product/${item._id}`} className='cart-name'>{item.name}</Link>
                <p className='cart-price'>&#8377;{item.price}</p>
                <div className='action-area'>
                  <select className='btn cart-qty' value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                    {[...Array(item.countInStock).keys()].map((current_value) => (
                      <option key={current_value + 1}>
                        {current_value + 1}
                      </option>
                    ))}
                  </select>
                  <button className='btn delete-btn' onClick={() => removeFromCartHandler(item._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      <div className='price-calculation'>
          <h5 className='sub-total'> Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h5>
          <div className='total-price'>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</div>
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

export default Cart;


// <table key={item._id}>
              //   <tbody>
              //     <tr>
              //       <td> <img src={item.image} className='cart-image' /></td>
              //       <td style={{ width: '260px' }}><Link to={`/product/${item._id}`} className='cart-name'>{item.name}</Link></td>
              //       <td className='cart-price'>&#8377; {item.price}</td>
              //       <td>
              //         <select className='btn cart-qty' value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
              //           {[...Array(item.countInStock).keys()].map((current_value) => (
              //             <option key={current_value + 1}>
              //               {current_value + 1}
              //             </option>
              //           ))} 
              //         </select>
              //       </td>
              //       <td>
              //         <button className='btn delete-btn' onClick={() => removeFromCartHandler(item._id)}>
              //           <FaTrash />
              //         </button>
              //       </td>
              //     </tr>
              //   </tbody>
              // </table>