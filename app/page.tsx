"use client"
import React, { useEffect, useState } from 'react';
import Guess from './components/Guess';
import Keyboard from './components/Keyboard';
import GameResultMessage from './components/GameResultMessage';
export default function Home() {
  const [word, setWord] = useState<string>();
  const [matchedLetters, setMatchedLetters] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);
  const [winCounter, setWinCounter] = useState<number>(0);
  const [playedGame, setPlayedGame] = useState<number>(0);
  const [unMatchedLetters, setUnMatchedLetters] = useState<string[]>([]);
  const [matchedInOrderLetters, setMatchedInOrderLetters] = useState<string[]>([]);
  const [game, setGame] = useState<boolean | undefined>(false);
  const [win, setWin] = useState<boolean | undefined>(false);
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentGuess, setCurrentGuess] = useState<number>(0);

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
      setTime(time => time + 1);
    }, 1000);

    setTimer(newTimer);

    return clearTimer;
  }, []);

  useEffect(() => {
    if (game) {
      clearTimer();
      const gamesPlayed = parseInt(localStorage.getItem('gamesPlayed') || '0', 10);
      const victories = parseInt(localStorage.getItem('victories') || '0', 10);

      setPlayedGame(gamesPlayed);
      localStorage.setItem('gamesPlayed', String(gamesPlayed + 1));

      if (win) {
        setWinCounter(victories + 1);
        localStorage.setItem('victories', String(victories + 1));
      }
    }
  }, [game, win]);

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const wordChanger = () => {
    setWord(turkish5LetterWords[Math.floor(Math.random() * turkish5LetterWords.length)]);
  };

  const playAgain = () => {
    setMatchedLetters([]);
    setUnMatchedLetters([]);
    setMatchedInOrderLetters([]);
    setGame(false);
    setGuesses(Array(6).fill(''));
    wordChanger();
    setCurrentGuess(0);
    setTime(0);
    setWin(false);
    clearTimer();
    const newTimer = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    setTimer(newTimer);
  };

  useEffect(() => {
    if (currentGuess > 5) {
      setGame(true);
    }
  }, [currentGuess]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1>Kelime Bulma Oyunu</h1>
      <div>
        <span>
          {Math.floor(time / 3600).toString().padStart(2, '0')}:
        </span>
        <span>
          {Math.floor((time % 3600) / 60).toString().padStart(2, '0')}:
        </span>
        <span>
          {(time % 60).toString().padStart(2, '0')}
        </span>
      </div>
      {guesses.map((_, key) => (
        <Guess
          key={key}
          word={word}
          guess={guesses[key]}
          isGuess={key < currentGuess}
          setGame={setGame}
        />
      ))}
      {game && (
        <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-center h-screen">
          <GameResultMessage
            resultText="Tebrikler"
            playedGame={playedGame}
            winCounter={winCounter}
            time={time}
            currentGuess={currentGuess}
            playAgain={playAgain}
          />
        </div>
      )}
      {currentGuess > 5 && (
        <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-center h-screen">
          <GameResultMessage
            resultText="Üzgünüm"
            playedGame={playedGame}
            winCounter={winCounter}
            word={word}
            currentGuess={currentGuess}
            playAgain={playAgain}
          />
        </div>
      )}
      {!game && currentGuess < 6 && (
        <Keyboard
          win={win}
          setWin={setWin}
          matchedLetters={matchedLetters}
          setGame={setGame}
          unMatchedLetters={unMatchedLetters}
          setUnMatchedLetters={setUnMatchedLetters}
          setMatchedLetters={setMatchedLetters}
          matchedInOrderLetters={matchedInOrderLetters}
          setMatchedInOrderLetters={setMatchedInOrderLetters}
          word={word}
          guesses={guesses}
          setGuesses={setGuesses}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
        />
      )}
    </div>
  );
}