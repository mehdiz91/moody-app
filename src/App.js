import React, { useState } from "react";
import quotesData from "./Data/quotes.json";
import "./App.css";

function App() {
  const [selectedQuote, setSelectedQuote] = useState("");

  const handleMoodClick = (mood) => {
    const moodData = quotesData.find((item) => item.mood === mood);

    if (moodData) {
      // Sélectionner une citation aléatoire
      const randomQuote = moodData.quotes[Math.floor(Math.random() * moodData.quotes.length)];
      setSelectedQuote(randomQuote);

      // Lire la citation à voix haute
      const utterance = new SpeechSynthesisUtterance(randomQuote);
      utterance.lang = "fr-FR"; // Langue de lecture (adapter si nécessaire, par exemple "fr-FR" pour le français)
      utterance.rate = 1; // Vitesse de lecture
      utterance.pitch = 1; // Tonalité de la voix
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Générateur de Citations par Humeur</h1>
      <p className="subtitle">Sélectionnez une humeur pour recevoir une citation lue à haute voix !</p>
      <div className="button-container">
        {quotesData.map((item, index) => (
          <button
            key={index}
            className="mood-button"
            style={{
              backgroundColor: item.color,
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.7)",
            }}
            onClick={() => handleMoodClick(item.mood)}
          >
            {item.emoji} {item.mood}
          </button>
        ))}
      </div>
      {selectedQuote && (
        <div
          className="quote-container"
          style={{
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.7)",
          }}
        >
          <p className="quote">{selectedQuote}</p>
        </div>
      )}
    </div>
  );
}

export default App;
