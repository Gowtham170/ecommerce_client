import {
    FaUser,
    FaShoppingCart
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <h5 className='title btn'>
                <Link to='/'>Ecommerce</Link>
            </h5>
            <ul className='nav place-items-center'>
                <Link to='/cart'>
                    <li className='nav-item btn place-items-center'>
                        <FaShoppingCart />
                        <span className='nav-link'>Cart</span>
                    </li>
                </Link>
                <Link to='/login'>
                    <li className='nav-item btn place-items-center'>
                        <FaUser />
                        <span className='nav-link'>Sign In</span>
                    </li>
                </Link>
            </ul>
        </nav>
    );
}

export default Navbar;