import React from 'react';

interface GuessProps {
  guess: string;
  isGuess: boolean;
  word: string | undefined;
  setGame: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const Guess = ({ guess, isGuess, word, setGame }: GuessProps) => {
  if (guess === word) {
    setGame(true);
  }
  return (
    <div className="flex gap-3 mb-3">
      {new Array(5).fill(0).map((_, key) => {
        const bgColor = !isGuess
          ? 'bg-black'
          : guess[key] === word?.[key]
            ? 'bg-green-500 slideRotate'
            : word?.includes(guess[key])
              ? 'bg-yellow-500 slideRotate'
              : 'bg-gray-800 slideRotate';
        return (
          <div key={key}
            className={`flex h-16 w-16 items-center justify-center border rounded-lg border-gray-700 font-bold uppercase text-white  ${bgColor}`}
          >
            {guess[key]}
          </div>
        )
      })}
    </div>
  )
}

export default Guess;
