export function SubHeading({ label }) {
  return (
    <div className="text-slate-500 text-md sm:text-lg md:text-xl font-semibold pt-1 pb-4 px-4 transition-all duration-300 transform hover:text-blue-600 hover:scale-105">
      {label}
    </div>
  );
}
