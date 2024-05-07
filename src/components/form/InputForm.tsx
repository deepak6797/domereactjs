import React, { ChangeEvent } from 'react';
import { FaEye } from 'react-icons/fa';
import { LuAsterisk } from 'react-icons/lu';

interface InputFormProps {
  label: string;
  type?: string;
  name: string;
  placeHolder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  inputStyle?: string;
  showLabel?: boolean;
  required?: boolean;
  showEye?: boolean;
  onEyeClick?: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  label,
  name,
  placeHolder,
  onChange,
  value,
  inputStyle,
  type = 'text',
  showLabel = true,
  required = true,
  showEye = false,
  onEyeClick,
}) => {
  return (
    <div className="w-full sm:flex-1">
      <div className="flex items-start gap-1">
        <div>
          {showLabel && (
            <label
              htmlFor={name}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              {label}
            </label>
          )}
        </div>

        {required && <LuAsterisk className="text-red-600 text-xs" />}
      </div>
      <div className="relative">
        {showEye && (
          <FaEye
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:cursor-pointer"
            size={16}
            onClick={onEyeClick}
          />
        )}
        <input
          type={type}
          name={name}
          id={name}
          className={`border border-gray-300 text-gray-900 sm:text-sm  pr-2.5  block w-full p-2.5 dark:bg-[#0F172A]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white active:outline-none focus:outline-none focus:border-white form-input ${inputStyle}`}
          placeholder={placeHolder}
          required={required}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default InputForm;
