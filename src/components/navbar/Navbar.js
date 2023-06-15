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
            <li className='nav-item btn place-items-center'>
                <FaUser />
                <a href='localhost:3000' className='nav-link'>Sign In</a>
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;