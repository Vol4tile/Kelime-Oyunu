"use client"
import { useEffect, useState } from 'react';
import Guess from './components/Guess'
import Keyboard from './components/Keyboard';

export default function Home() {
  const [word, setWord] = useState<string>()
  const [matchedLetters, setMatchedLetters] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);
  const [winCounter, setWinCounter] = useState<number>(0);
  const [playedGame, setPlayedGame] = useState<number>(0);
  const [unMatchedLetters, setUnMatchedLetters] = useState<string[]>([]);
  const [matchedInOrderLetters, setMatchedInOrderLetters] = useState<string[]>([]);
  const [game, setGame] = useState<boolean>()
  const [win, setWin] = useState<boolean>()
  const [guesses, setGuesses] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentGuess, setCurrentGuess] = useState(0);
  const turkish5LetterWords = [
    "BAĞIR", "BALIK", "BİBER", "BİLGİ", "BÖCEK", "ÇAYIR",
    "DAVET", "DEFNE", "DEMİR", "DOLAP", "DÜŞEN", "EŞLİK", "FİLİZ", "GÖRÜN", "GÜNEŞ",
    "GÖLGE", "HASTA", "HAYAL", "İÇERİ", "KAHVE", "KALEM", "KAYIK", "KELİM", "KIZIL", "KOÇAN",
    "KULAK", "KUMLU", "KURŞU", "KÜMES", "LİMAN", "MELEK", "MERAK", "NAKIŞ", "OKYAN", "ORMAN",
    "PATİK", "PİLAV", "RENK", "SAKIZ", "SAZAN", "SAYFA", "SEBZE", "SİLGİ", "SONUÇ", "ŞEKER",
    "TUZAK", "ÜZERİ", "YABAN", "YAKIŞ",
    "YÜZME", "ZEMİN", "ZORBA",
  ];

  useEffect(() => {
    wordChanger();
    const newTimer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    setTimer(newTimer);

    return () => {
      if (timer) {
        clearInterval(timer);
        console.log("Interval cleared");
      }
    };
  }, []);

  useEffect(() => {
    if (game) {
      if (timer) {
        clearInterval(timer);
        console.log("Interval cleared");
      }

      const gamesPlayed = localStorage.getItem('gamesPlayed') || '0';
      const victories = localStorage.getItem('victories') || '0';
      setPlayedGame(parseInt(gamesPlayed, 10))
      localStorage.setItem('gamesPlayed', String(parseInt(gamesPlayed, 10) + 1));

      if (win) {
        setWinCounter((parseInt(victories, 10) + 1))
        localStorage.setItem('victories', String(parseInt(victories, 10) + 1));
      }
    }
    console.log(game, win);
  }, [game, win]);

  const wordChanger = () => {
    setWord(turkish5LetterWords[Math.floor(Math.random() * (turkish5LetterWords.length + 1))]);
  }

  const playAgain = () => {
    setMatchedLetters([])
    setUnMatchedLetters([])
    setMatchedInOrderLetters([])
    setGame(undefined)
    setGuesses(["", "", "", "", "", ""])
    wordChanger();
    setCurrentGuess(0)
    setTime(0)
    setWin(false)

    if (timer) {
      clearInterval(timer);
      console.log("Interval cleared");
    }

    const newTimer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    setTimer(newTimer);

    setWin(false);
  }

  useEffect(() => {
    if (currentGuess > 5) {
      setGame(true);
    }
  }, [currentGuess]);
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 >
        Kelime Bulma Oyunu
      </h1>
      {<div><span>{Math.floor(time / 3600).toString().padStart(2, '0')}:</span> <span>{Math.floor((time % 3600) / 60).toString().padStart(2, '0')}:</span> <span>{(time % 60).toString().padStart(2, '0')}</span> </div>}
      {guesses.map((_, key) => (
        <Guess
          key={key}
          word={word}
          guess={guesses[key]}
          isGuess={key < currentGuess}
          setGame={setGame}
        />
      ))}
      {game &&
        <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-center h-screen">
          <div className="bg-black p-10 rounded-md flex flex-col gap-4">
            <p className="text-center text-3xl font-bold text-green-300">"Tebrikler"</p>
            <p>{playedGame} oyunda {winCounter} tane kelimeyi bilmeyi başardın</p>
            <p>Bilme hızın : {time} sn</p>
            <p>{currentGuess} Hamlede kazanmayı başardın.</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              onClick={playAgain}>Tekrar Oyna</button>
          </div>
        </div>}
      {currentGuess > 5 &&
        <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-center h-screen">
          <div className="bg-black p-10 rounded-md flex flex-col gap-4">
            <p className="text-center text-3xl font-bold text-red-300">"Üzgünüm"</p>
            <p> Doğru kelime {word}.{currentGuess} denemede bulmayı başaramadın</p>
            <p>{playedGame} oyunda {winCounter} tane kelimeyi bilmeyi başardın</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              onClick={playAgain}>Tekrar Oyna</button>
          </div>
        </div>}
      {!game && currentGuess < 6 && <Keyboard win={win} setWin={setWin} matchedLetters={matchedLetters} setGame={setGame} unMatchedLetters={unMatchedLetters} setUnMatchedLetters={setUnMatchedLetters} setMatchedLetters={setMatchedLetters} matchedInOrderLetters={matchedInOrderLetters} setMatchedInOrderLetters={setMatchedInOrderLetters} word={word} guesses={guesses} setGuesses={setGuesses} currentGuess={currentGuess} setCurrentGuess={setCurrentGuess} />}
    </div>
  )
}
