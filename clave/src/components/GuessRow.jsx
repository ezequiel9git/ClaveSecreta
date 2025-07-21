import DigitBox from "./DigitBox";

export default function GuessRow({
  guess,
  isCurrent,
  currentGuess,
  setCurrentGuess,
  onEnter,
}) {
  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    if (new Set(val).size === val.length) {
      setCurrentGuess(val);
    }
  };

  if (guess) {
    return (
      <div className="flex gap-2 justify-center">
        {guess.digits.map((digit, i) => (
          <DigitBox key={i} value={digit} color={guess.feedback[i]} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <DigitBox
          key={i}
          value={currentGuess[i] || ""}
          color="gray"
        />
      ))}
      {isCurrent && (
        <input
          type="text"
          value={currentGuess}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && onEnter()}
          className="mt-2 p-2 border border-gray-400 rounded w-full text-center text-xl tracking-widest"
          placeholder="Ingresa 6 dígitos únicos"
        />

      )}
    </div>
  );
}
