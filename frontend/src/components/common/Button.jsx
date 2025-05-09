const Button = ({ 
    children, 
    onClick, 
    type = "button", 
    variant = "primary", 
    className = "", 
    disabled = false 
  }) => {
    const baseClasses = "btn";
    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      danger: "btn-danger"
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;