import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

type Option = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  status: string;
  setStatus: (value: string) => void;
  options: Option[];
};

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  status,
  setStatus,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === status) || options[0];

  const handleSelect = (option: Option) => {
    setStatus(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-pink-100 text-purple-900 font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-pink-200 transition"
      >
        <FaFilter className="text-sm" />
        <span>{selectedOption.label}</span>
        <IoMdArrowDropdown className="text-xl" />
      </button>

      {isOpen && (
        <div className="absolute mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 w-fit">
          <ul className="py-1 text-start ">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 cursor-pointer hover:bg-pink-100 text-gray-800 capitalize"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
