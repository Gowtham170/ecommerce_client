import { Link } from "react-router-dom";

const Message = ({ children, className}) => {
  return (
    <div className={`${className}`}>
      {children} {('Your cart is empty' === children) && <Link to='/'>Go Back</Link>}
    </div>
  );
}

export default Message;