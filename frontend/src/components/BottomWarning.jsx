import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-3 text-sm flex justify-center items-center bg-yellow-100 border-t border-yellow-300 shadow-inner">
      {/* Label Text */}
      <div className="text-gray-700 font-medium">
        {label}
      </div>
      
      {/* Link Button */}
      <Link
        className="pl-1 text-blue-600 font-semibold underline hover:text-blue-800 transition-all duration-300 transform hover:scale-105"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
