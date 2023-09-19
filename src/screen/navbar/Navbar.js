import { useState } from 'react';
import {
    FaUser,
    FaShoppingCart,
} from 'react-icons/fa';
import { MdArrowDropDownCircle } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import SearchBox from '../../components/search_box/SearchBox';
import { logout } from '../../redux/slices/authSlice';
import { useLogoutMutation } from '../../redux/slices/api/userApiSlice';
import './Navbar.scss';

const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const [openAdminMenu, setOpenAdminMenu] = useState(false);

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
                <SearchBox/>
                <Link to='/cart'>
                    <li className='nav-item btn place-items-center'>
                        <FaShoppingCart />
                        {cartItems.length > 0 && (
                            <span className='badge'>
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                        <span className='nav-link'>Cart</span>
                    </li>
                </Link>
                {userInfo
                    ? (
                        <li className='nav-item btn place-items-center' onClick={() => setOpenMenu(!openMenu)}>
                            {userInfo?.name}
                            <MdArrowDropDownCircle />

                            {openMenu &&
                                <div className='dropdown'>
                                    <div className='menu-item'>Profile</div>
                                    <div className='menu-item' onClick={logoutHandler}>Logout</div>
                                </div>}
                        </li>
                    )
                    : (<Link to='/login'>
                        <li className='nav-item btn place-items-center'>
                            <FaUser />
                            <span className='nav-link'>Sign In</span>
                        </li>
                    </Link>)
                }
                <>
                </>
                {userInfo && userInfo.isAdmin && (
                    <li className='nav-item btn place-items-center' onClick={() => setOpenAdminMenu(!openAdminMenu)}>
                        Admin
                        <MdArrowDropDownCircle />

                        {openAdminMenu &&
                            <div className='dropdown admin-dropdown'>
                                <div className='menu-item'>
                                    <Link to='/admin/userlist'>Users</Link>
                                </div>
                                <div className='menu-item'>
                                    <Link to='/admin/orderlist'>Orders</Link>
                                </div>
                                <div className='menu-item'>
                                    <Link to='/admin/productlist'>Products</Link>
                                </div>
                            </div>}
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;


{/* {userInfo
                    ? (
                        <select defaultValue={`${userInfo.name}`}
                            onChange={(e) => e.target.value === 'logout'
                                ? logoutHandler()
                                : console.log(e.target.value)} className='btn profile-btn'>
                            <option value={`${userInfo.name}`} disabled hidden>{userInfo.name}</option>
                            <option value='profile'>Profile</option>
                            <option value='logout'>Logout</option>
                        </select>
                    )
                    : (<Link to='/login'>
                        <li className='nav-item btn place-items-center'>
                            <FaUser />
                            <span className='nav-link'>Sign In</span>
                        </li>
                    </Link>)} */}

 {/* {userInfo && userInfo.isAdmin
                    && (
                        <select defaultValue={`${userInfo.name}`} className='btn profile-btn'
                            onChange={navigateOrderScreen}>
                            <option value={`${userInfo.name}`} disabled hidden>Admin</option>
                            <option value='/admin/orderlist'>Orders</option>
                        </select>
                    )} */}