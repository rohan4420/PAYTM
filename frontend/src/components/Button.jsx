export function Button({ label, onClick }) {
  return (
      <button
          onClick={onClick}
          type="button"
          aria-label={label}  // Accessibility enhancement
          className="w-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition-all duration-300 transform hover:scale-105 shadow-md"
      >
          {label}
      </button>
  );
}
