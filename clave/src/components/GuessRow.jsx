import DigitBox from "./DigitBox";

export default function GuessRow({ guess, currentGuess }) {
  const digits = guess
    ? guess.digits
    : currentGuess.split("").map((d) => Number(d));

  const feedback = guess ? guess.feedback : [];

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <DigitBox
          key={i}
          value={digits[i] ?? ""}
          color={guess ? feedback[i] : "gray"}
        />
      ))}
    </div>
  );
}
