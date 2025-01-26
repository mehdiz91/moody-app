import React, { useState } from 'react';
import quotesData from './Data/quotes.json';
import './App.css';

function App() {
  const [selectedQuote, setSelectedQuote] = useState("");

  const handleMoodClick = (mood) => {
    const moodData = quotesData.find((item) => item.mood === mood);

    if (moodData) {
      const randomQuote = moodData.quotes[Math.floor(Math.random() * moodData.quotes.length)];
      setSelectedQuote(randomQuote);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Générateur de Citations par Humeur</h1>
      <p className="subtitle">Sélectionnez une humeur pour recevoir une citation !</p>
      <div className="button-container">
        {quotesData.map((item, index) => (
          <button
            key={index}
            className="mood-button"
            style={{ backgroundColor: item.color }}
            onClick={() => handleMoodClick(item.mood)}
          >
            {item.emoji} {item.mood}
          </button>
        ))}
      </div>
      {selectedQuote && (
        <div className="quote-container">
          <p className="quote">{selectedQuote}</p>
        </div>
      )}
    </div>
  );
}

export default App;
