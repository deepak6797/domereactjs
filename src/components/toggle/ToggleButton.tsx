import React, { ChangeEvent } from 'react';

interface ToggleButtonProps {
  label: string;
  name: string;
  checked?: boolean;
  required?: boolean;
  toogleBtnStyle?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  onChange,
  name,
  toogleBtnStyle,
  checked = false,
  required = true,
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        required={required}
        onChange={onChange}
        name={name}
        checked={checked}
      />
      <div
        className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${toogleBtnStyle}`}
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
};

export default ToggleButton;
