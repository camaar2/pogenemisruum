import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SecurityControlMatching.css';

const controls = [
  { id: 1, name: "SIEM", description: "Aggregates and analyzes security events" },
  { id: 2, name: "DLP", description: "Prevents data loss by monitoring sensitive data" },
  { id: 3, name: "MFA", description: "Provides multi-factor authentication for access control" },
  { id: 4, name: "Vulnerability Scanner", description: "Identifies vulnerabilities in systems" }
];

const createCards = () => {
  let cards = [];
  controls.forEach(control => {
    cards.push({
      id: `${control.id}-name`,
      pairId: control.id,
      type: "name",
      content: control.name,
      flipped: false,
      matched: false
    });
    cards.push({
      id: `${control.id}-desc`,
      pairId: control.id,
      type: "description",
      content: control.description,
      flipped: false,
      matched: false
    });
  });
  return shuffleArray(cards);
};

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

function SecurityControlMatching() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(createCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchesFound, setMatchesFound] = useState(0);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

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
      const [first, second] = newFlipped;
      const card1 = newCards[first];
      const card2 = newCards[second];
      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setMatchesFound(matchesFound + 1);
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
          if (matchesFound + 1 === controls.length) {
            setMessage("All security controls matched correctly!");
            setIsLocked(true);
          }
        }, 800);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
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
    setIsLocked(false);
  };

  const handleEnd = () => {
    navigate("/");
  };

  return (
    <div className="security-control-matching">
      <h1>Security Control Matching</h1>
      <p>Drag and flip the cards to match security controls with their descriptions:</p>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className={`card ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => handleCardClick(index)}>
            <div className="card-inner">
              <div className="card-front">
                {/* Disain: võid jätta tühjaks või kuvada logo */}
              </div>
              <div className="card-back">
                {card.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        {!isLocked ? (
          <button onClick={handleReset}>Reset</button>
        ) : (
          <button onClick={handleEnd}>Finish Game</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default SecurityControlMatching;
