const Button = ({children, onClick, disabled, className, type}) => {
    return (
        <button className={className}
            type={type}
            disabled={disabled}
            onClick={onClick}>
           {children}
        </button>
    );
}

export default Button;