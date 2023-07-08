import {
    FaUser,
    FaShoppingCart,
    FaArrowAltCircleDown
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.scss';

import { logout } from '../../redux/slices/authSlice';
import { useLogoutMutation } from '../../redux/slices/api/userApiSlice';

const Navbar = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
       try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');
       } catch (err) {
        console.log(err);
       }
    }

    return (
        <nav className='navbar'>
            <h5 className='title btn'>
                <Link to='/'>Ecommerce</Link>
            </h5>
            <ul className='nav place-items-center'>
                <Link to='/cart'>
                    <li className='nav-item btn place-items-center'>
                        <FaShoppingCart/>
                        { cartItems.length > 0 && (
                            <span className='badge'>
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                        <span className='nav-link'>Cart</span>
                    </li>
                </Link>
                {userInfo
                ? ( 
                    <select defaultValue={`${userInfo.name}`} 
                            onChange={(e) => e.target.value=== 'logout' 
                                ? logoutHandler() 
                                : console.log(e.target.value)} className='btn profile-btn'>
                        <option value={`${userInfo.name}`} selected hidden>{userInfo.name}</option>
                        <option value='profile'>Profile</option>
                        <option value='logout'>Logout</option>
                    </select>
                )
                : (<Link to='/login'>
                <li className='nav-item btn place-items-center'>
                    <FaUser />
                    <span className='nav-link'>Sign In</span>
                </li>
            </Link>)}
            </ul>
        </nav>
    );
}

export default Navbar;