import React, { useState } from 'react';
import quotesData from './Data/quotes.json';
import './App.css';

function App() {
  const [selectedQuote, setSelectedQuote] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#f0f8ff"); // Couleur initiale

  const generateRandomBackgroundColor = () => {
    const colors = ["#FFB6C1", "#87CEFA", "#98FB98", "#FFDAB9", "#D8BFD8"]; // Couleurs possibles
    const usedColors = quotesData.map((item) => item.color); // Couleurs des humeurs

    // Filtrer pour exclure les couleurs des humeurs
    const filteredColors = colors.filter((color) => !usedColors.includes(color));

    // Choisir une couleur aléatoire
    return filteredColors[Math.floor(Math.random() * filteredColors.length)];
  };

  const handleMoodClick = (mood) => {
    const moodData = quotesData.find((item) => item.mood === mood);

    if (moodData) {
      const randomQuote = moodData.quotes[Math.floor(Math.random() * moodData.quotes.length)];
      setSelectedQuote(randomQuote);

      // Mettre à jour la couleur de fond avec une couleur aléatoire qui n'est pas une couleur d'humeur
      setBackgroundColor(generateRandomBackgroundColor());
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: backgroundColor,
        transition: "background-color 1s ease" // Transition douce
      }}
    >
      <h1 className="title">Générateur de Citations par Humeur</h1>
      <p className="subtitle">Sélectionnez une humeur pour recevoir une citation !</p>
      <div className="button-container">
        {quotesData.map((item, index) => (
          <button
            key={index}
            className="mood-button"
            style={{
              backgroundColor: item.color,
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.7)" // Shadow blanc
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
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.7)" // Shadow blanc
          }}
        >
          <p className="quote">{selectedQuote}</p>
        </div>
      )}
    </div>
  );
}

export default App;
