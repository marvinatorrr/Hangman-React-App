import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./components/helpers/helpers";
import "./App.css";
import GetWord from "./API";

const figureParts = document.querySelectorAll(".figure-part");

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  const setWord = (word) => {
    setSelectedWord(word);
    console.log(`here ${selectedWord}`);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        console.log(`selectedWord: ${selectedWord}`);
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playable, correctLetters, wrongLetters, selectedWord]);

  useEffect(() => {
    GetWord().then((word) => {
      setSelectedWord(word);
    });
  }, []);

  function playAgain() {
    GetWord().then(setSelectedWord);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    setPlayable(true);
  }

  return (
    <>
      <Header />
      {selectedWord}
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
