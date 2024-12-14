import { FaEnvelope } from "react-icons/fa"; // Import icon

export function InputBox({ label, placeholder, onChange, type = "text", icon }) {
  return (
    <div className="w-full relative">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700 py-2">{label}</label>

      {/* Input Container with Icon */}
      <div className="relative">
        {/* Input */}
        <input
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 hover:border-blue-400 pl-10" // Added padding-left to make space for icon
        />
        
        {/* Icon */}
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
