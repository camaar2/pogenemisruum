import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija4.css';

const evidencePairs = [
  { id: 1, content: "Encrypted USB" },
  { id: 2, content: "Malware Sample" },
  { id: 3, content: "System Log" },
  { id: 4, content: "Network Packet Capture" },
  { id: 5, content: "Forensic Image" }
];

function Digi_toendite_uurija4() {
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const createCards = () => {
    let cards = [];
    evidencePairs.forEach(pair => {
      cards.push({
        id: `${pair.id}-a`,
        pairId: pair.id,
        content: pair.content,
        flipped: false,
        matched: false
      });
      cards.push({
        id: `${pair.id}-b`,
        pairId: pair.id,
        content: pair.content,
        flipped: false,
        matched: false
      });
    });
    return shuffleArray(cards);
  };

  const [cards, setCards] = useState(createCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchesFound, setMatchesFound] = useState(0);
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    if (isProcessing) return;
    const card = cards[index];
    if (card.flipped || card.matched) return;
    
    const newCards = [...cards];
    newCards[index].flipped = true;
    const newFlipped = [...flippedIndices, index];
    setCards(newCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [firstIndex, secondIndex] = newFlipped;
      const card1 = newCards[firstIndex];
      const card2 = newCards[secondIndex];
      
      if (card1.pairId === card2.pairId) {
        newCards[firstIndex].matched = true;
        newCards[secondIndex].matched = true;
        setCards(newCards);
        setMatchesFound(matchesFound + 1);
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
          if (matchesFound + 1 === evidencePairs.length) {
            setMessage("All matching pairs found!");
          }
        }, 800);
      } else {
        setTimeout(() => {
          newCards[firstIndex].flipped = false;
          newCards[secondIndex].flipped = false;
          setCards(newCards);
          setFlippedIndices([]);
          setIsProcessing(false);
          setMessage("Incorrect match! Try again.");
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    setCards(createCards());
    setFlippedIndices([]);
    setMatchesFound(0);
    setMessage("");
    setIsProcessing(false);
  };

  const handleEnd = () => {
    navigate("/");
  };

  return (
    <div className="digital-memory">
      <h1>Digital Evidence Memory Game</h1>
      <p>Match the pairs of digital evidence:</p>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className={`card ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                {/* Kaardi tagumine disain */}
              </div>
              <div className="card-back">
                {card.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        {matchesFound === evidencePairs.length ? (
          <button onClick={handleEnd}>Finish Game</button>
        ) : (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Digi_toendite_uurija4;
