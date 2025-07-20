import { useEffect, useState } from "react";
import { generateSecret } from "./utils/generateSecret";
import GuessRow from "./components/GuessRow";

export default function App() {
  const [secret, setSecret] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setSecret(generateSecret());
  }, []);

  const checkGuess = (guess) => {
    const feedback = guess.map((digit, i) => {
      if (digit === secret[i]) return "green";
      else if (secret.includes(digit)) return "yellow";
      else return "red";
    });
    return feedback;
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 6 || new Set(currentGuess).size !== 6) return;

    const guessDigits = currentGuess.split("").map(Number);
    const feedback = checkGuess(guessDigits);

    const newGuess = {
      digits: guessDigits,
      feedback,
    };

    const updatedGuesses = [...guesses, newGuess];
    setGuesses(updatedGuesses);
    setCurrentGuess("");

    if (feedback.every((c) => c === "green") || updatedGuesses.length >= 5) {
      setGameOver(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Caja Fuerte</h1>
      <div className="grid gap-2 max-w-md mx-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <GuessRow
            key={i}
            guess={guesses[i]}
            isCurrent={!gameOver && i === guesses.length}
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            onEnter={handleSubmit}
          />
        ))}
      </div>

      {gameOver && (
        <div className="text-center mt-4">
          {guesses[guesses.length - 1]?.feedback?.every((f) => f === "green") ? (
            <p className="text-green-600 font-bold">¡Correcto! 🎉</p>
          ) : (
            <p className="text-red-600 font-bold">
              Fallaste. La clave era: {secret.join("")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
