import React from 'react';

interface GameResultMessageProps {
  resultText: string;
  playedGame: number;
  winCounter: number;
  time?: number;
  currentGuess: number;
  word?: string;
  playAgain: () => void;
}

const GameResultMessage = ({
  resultText,
  playedGame,
  winCounter,
  time,
  currentGuess,
  word,
  playAgain,
}: GameResultMessageProps) => (
  <div className="bg-black p-10 rounded-md flex flex-col gap-4">
    <p className={`text-center text-3xl font-bold ${resultText === 'Tebrikler' ? 'text-green-300' : 'text-red-300'}`}>
      {resultText}
    </p>
    {resultText === 'Tebrikler' ? (
      <>
        <p>{playedGame} oyunda {winCounter} tane kelimeyi bilmeyi başardın</p>
        <p>Bilme hızın : {time} sn</p>
        <p>{currentGuess} Hamlede kazanmayı başardın.</p>
      </>
    ) : (
      <>
        <p>Doğru kelime {word}. {currentGuess} denemede bulmayı başaramadın</p>
        <p>{playedGame} oyunda {winCounter} tane kelimeyi bilmeyi başardın</p>
      </>
    )}
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      onClick={playAgain}
    >
      Tekrar Oyna
    </button>
  </div>
);

export default GameResultMessage;