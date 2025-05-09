const Input = ({ 
    label, 
    type = "text", 
    id, 
    name, 
    value, 
    onChange, 
    placeholder = "", 
    error = null,
    required = false
  }) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };
  
  export default Input;
  