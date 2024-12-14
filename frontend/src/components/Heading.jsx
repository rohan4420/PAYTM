export function Heading({ label }) {
  return (
    <div
      className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-6 text-gray-800 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-center animate__animated animate__fadeIn animate__delay-1s"
    >
      {label}
    </div>
  );
}
