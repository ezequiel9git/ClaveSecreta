export default function DigitBox({ value, color }) {
  const colorMap = {
    green: "bg-green-500 text-white",
    yellow: "bg-yellow-400 text-white",
    red: "bg-red-500 text-white",
    gray: "bg-gray-300 text-black",
  };

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded ${colorMap[color]}`}
    >
      {value}
    </div>
  );
}
