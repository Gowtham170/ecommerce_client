import './Navbar.scss';

// import { BiSearch } from 'react-icons/bi';
import { FaShoppingCart, FaUser } from 'react-icons/fa';


const Navbar = () => {
  return (
    <nav className='navbar'>
        <h5 className='title btn'>
            <a href='localhost:3000'>Ecommerce</a>
        </h5>
        <ul className='nav place-items-center'>
            <li className='nav-item btn place-items-center'>
                <FaShoppingCart />
                <a href='localhost:3000' className='nav-link'>Cart</a>
            </li>
            <li className='nav-item btn place-items-center'>
                <FaUser />
                <a href='localhost:3000' className='nav-link'>Sign In</a>
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;