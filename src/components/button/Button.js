const Button = ({children, onClick, disabled, className}) => {
    return (
        <button className={className}
            type='button'
            disabled={disabled}
            onClick={onClick}>
           {children}
        </button>
    );
}

export default Button;