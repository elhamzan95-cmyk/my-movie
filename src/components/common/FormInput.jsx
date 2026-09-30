// FormInput.jsx
const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div>
      <label htmlFor={inputId} className="block text-gray-200 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-[#374151] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormInput;