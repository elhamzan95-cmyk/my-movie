// FormSelect.jsx
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  disabled,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || name;

  return (
    <div>
      <label htmlFor={selectId} className="block text-gray-200 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-[#374151] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#374151]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;