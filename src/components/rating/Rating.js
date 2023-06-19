import './Rating.scss';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
        <span className='star'>
          {value >= 1 
            ? <BsStarFill/> 
            : value >= 0.5 ? <BsStarHalf/> : <BsStar/>}
        </span>
        <span className='star'>
          {value >= 2 
            ? <BsStarFill/> 
            : value >= 1.5 ? <BsStarHalf/> : <BsStar/>}
        </span>
        <span className='star'>
          {value >= 3 
            ? <BsStarFill/> 
            : value >= 2.5 ? <BsStarHalf/> : <BsStar/>}
        </span>
        <span className='star'>
          {value >= 4
            ? <BsStarFill/> 
            : value >= 3.5 ? <BsStarHalf/> : <BsStar/>}
        </span>
        <span className='star'>
          {value >= 5
            ? <BsStarFill/> 
            : value >= 4.5 ? <BsStarHalf/> : <BsStar/>}
        </span>
        <span className='text'>{text}</span>
    </div>
  );
}

export default Rating;