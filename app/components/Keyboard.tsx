import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface KeyboardProps {
    word: string | undefined;
    guesses: string[];
    setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
    currentGuess: number;
    setCurrentGuess: React.Dispatch<React.SetStateAction<number>>;
    matchedLetters: string[];
    setMatchedLetters: React.Dispatch<React.SetStateAction<string[]>>;
    setMatchedInOrderLetters: React.Dispatch<React.SetStateAction<string[]>>;
    matchedInOrderLetters: string[];
    unMatchedLetters: string[];
    setUnMatchedLetters: React.Dispatch<React.SetStateAction<string[]>>;
    setGame: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    win: boolean | undefined;
    setWin: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const Keyboard = ({ win, setWin, word, guesses, setGuesses, currentGuess, setCurrentGuess, matchedLetters, setMatchedLetters, setMatchedInOrderLetters, matchedInOrderLetters, unMatchedLetters, setUnMatchedLetters, setGame }: KeyboardProps) => {
    const lettersFirst = "QWERTYUOIPĞÜ"
    const lettersSecond = "ASDFGHJKLŞİ"
    const lettersThirth = "ZXCVBNMÖÇ"
    const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
        const clickedDiv = e.target as HTMLDivElement;
        const clickedLetter = clickedDiv.textContent;
        setGuesses((prevGuesses: string[]) => {
            const newGuesses = [...prevGuesses];
            newGuesses[currentGuess] = newGuesses[currentGuess] + clickedLetter;
            if (newGuesses[currentGuess].length > 4) {
                const guessedWord = newGuesses[currentGuess];
                if (guessedWord === word) {
                    setGame(true)
                    setWin(true);
                }
                setCurrentGuess((prevCounter: number) => prevCounter + 1);
                const matchingLetters: any = [];
                const matchingOrderedLetters: any = [];
                const unMatchingLetters: any = [];
                if (word) {
                    for (let i = 0; i < guessedWord.length && i < word.length; i++) {
                        if (guessedWord[i] === word[i]) {
                            matchingLetters.push(guessedWord[i]);
                        }
                        else if (word.includes(guessedWord[i])) {
                            matchingOrderedLetters.push(guessedWord[i]);
                        }
                        else {
                            unMatchingLetters.push(guessedWord[i])
                        }
                    }
                }
                setMatchedLetters((prevLetters: any) => prevLetters + matchingLetters)
                setMatchedInOrderLetters((prevLetters: any) => prevLetters + matchingOrderedLetters)
                setUnMatchedLetters((prevLetters: any) => prevLetters + unMatchingLetters)
            }
            return newGuesses;
        });
    };

    const handleDelete = (e: React.SyntheticEvent<HTMLDivElement>) => {
        setGuesses((prevGuesses: string[]) => {
            const newGuesses = [...prevGuesses];
            const lastGuess = newGuesses[currentGuess];
            if (lastGuess.length > 0) {
                newGuesses[currentGuess] = lastGuess.slice(0, -1);
                return newGuesses;
            }
            return prevGuesses;
        });
    }
    return (
        <div className='mt-10 flex flex-col gap-2 text-lg select-none '>
            <div className='flex    justify-center items-center gap-2 '>
                {lettersFirst.split('').map((letter, key) => {
                    const isMatched = matchedLetters.includes(letter);
                    const isOrderedMatched = matchedInOrderLetters.includes(letter);
                    const isUnMatched = unMatchedLetters.includes(letter);
                    return (<div key={key} className={` ${isMatched ? 'bg-green-500' : isOrderedMatched ? 'bg-yellow-500' : isUnMatched ? 'bg-gray-800' : 'bg-black'}  h-12 w-12 flex items-center justify-center cursor-pointer  hover:bg-gray-800 duration-300 rounded-lg`} onClick={handleClick}>
                        {letter}
                    </div>)
                })}
            </div>
            <div className='flex    justify-center items-center gap-2'>
                {lettersSecond.split('').map((letter, key) => {
                    const isMatched = matchedLetters.includes(letter);
                    const isOrderedMatched = matchedInOrderLetters.includes(letter);
                    const isUnMatched = unMatchedLetters.includes(letter);
                    return (<div key={key} className={` ${isMatched ? 'bg-green-500' : isOrderedMatched ? 'bg-yellow-500' : isUnMatched ? 'bg-gray-800' : 'bg-black'} h-12 w-12 flex items-center justify-center cursor-pointer  hover:bg-gray-800 duration-300 rounded-lg`} onClick={handleClick}>
                        {letter}
                    </div>)
                })}
            </div>
            <div className='flex    justify-center items-center gap-2 '>
                {lettersThirth.split('').map((letter, key) => {
                    const isMatched = matchedLetters.includes(letter);
                    const isOrderedMatched = matchedInOrderLetters.includes(letter);
                    const isUnMatched = unMatchedLetters.includes(letter);
                    return (<div key={key} className={` ${isMatched ? 'bg-green-500' : isOrderedMatched ? 'bg-yellow-500' : isUnMatched ? 'bg-gray-800' : 'bg-black'} h-12 w-12 flex items-center justify-center cursor-pointer  hover:bg-gray-800 duration-300 rounded-lg`} onClick={handleClick}>
                        {letter}
                    </div>)
                })}
                <div className={`bg-black  h-12 w-[6.5rem] flex  items-center justify-center cursor-pointer  hover:bg-red-800 duration-300 rounded-lg`} onClick={handleDelete}>
                    <BiArrowBack />
                </div>
            </div>

        </div>
    )
}

export default Keyboard