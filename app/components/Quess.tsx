import React from 'react';
interface props {
  isQuess: boolean;
  quess: string;
  word: string | undefined;
  setGame: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
const Quess = ({ isQuess, quess, word, setGame }: props) => {
  if (quess === word) {
    setGame(true);
  }
  return (
    <div className="flex gap-3 mb-3">
      {new Array(5).fill(0).map((_, key) => {

        const bgColor = !isQuess
          ? 'bg-black'
          : quess[key] === word?.[key] 
            ? 'bg-green-500 slideRotate'
            : word?.includes(quess[key]) 
              ? 'bg-yellow-500 slideRotate'
              : 'bg-gray-800 slideRotate';

        return (
          <div key={key}
            className={`flex h-16 w-16 items-center justify-center border rounded-lg border-gray-700 font-bold uppercase text-white  ${bgColor}`}
          >
            {quess[key]}
          </div>
        )
      })}

    </div>
  )
}

export default Quess;
