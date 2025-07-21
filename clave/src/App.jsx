// App.jsx
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

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    if (new Set(val).size === val.length) {
      setCurrentGuess(val);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-yellow-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white/80 rounded-3xl shadow-2xl p-8 max-w-lg w-full border-4 border-blue-300 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 drop-shadow-lg animate-bounce">
          🗝️ Caja Fuerte
        </h1>

        {/* Las filas del juego */}
        <div className="grid gap-4 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <GuessRow
              key={i}
              guess={guesses[i]}
              currentGuess={i === guesses.length ? currentGuess : ""}
            />
          ))}
        </div>

        {/* Input del usuario */}
        {!gameOver && (
          <input
            type="text"
            inputMode="numeric"
            autoFocus
            value={currentGuess}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            maxLength={6}
            className="block w-full text-center text-2xl tracking-widest border-2 border-blue-400 rounded-xl px-4 py-2 mb-2 outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            placeholder="Introduce 6 dígitos únicos"
          />
        )}

        {gameOver && (
          <div className="text-center mt-6">
            {guesses[guesses.length - 1]?.feedback?.every((f) => f === "green") ? (
              <p className="text-green-600 font-extrabold text-2xl animate-pulse">
                ¡Correcto! 🎉
              </p>
            ) : (
              <div>
                <p className="text-red-600 font-extrabold text-2xl animate-shake">
                  Fallaste. La clave era:
                </p>
                <div className="flex justify-center gap-2 mt-2">
                  {secret.map((d, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-br from-pink-400 via-blue-400 to-yellow-300 text-white rounded-lg px-3 py-1 text-xl font-bold shadow"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px);}
          20%, 80% { transform: translateX(4px);}
          30%, 50%, 70% { transform: translateX(-8px);}
          40%, 60% { transform: translateX(8px);}
        }
      `}
      </style>
    </div>
  );
}
