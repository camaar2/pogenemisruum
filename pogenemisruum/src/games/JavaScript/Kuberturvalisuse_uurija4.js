import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija4.css';

const pairs = [
  { pairId: 1, vulnerability: "SQL Injection", remediation: "Use Parameterized Queries" },
  { pairId: 2, vulnerability: "Cross-Site Scripting", remediation: "Implement Output Encoding" },
  { pairId: 3, vulnerability: "Weak Password Policy", remediation: "Enforce Strong Passwords" },
  { pairId: 4, vulnerability: "Outdated Software", remediation: "Apply Patches Regularly" },
  { pairId: 5, vulnerability: "Misconfigured Firewall", remediation: "Review and Update Rules" }
];

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const createCards = () => {
  const cards = [];
  pairs.forEach(pair => {
    cards.push({
      id: `${pair.pairId}-vuln`,
      pairId: pair.pairId,
      type: "vulnerability",
      content: pair.vulnerability,
      flipped: false,
      matched: false
    });
    cards.push({
      id: `${pair.pairId}-rem`,
      pairId: pair.pairId,
      type: "remediation",
      content: pair.remediation,
      flipped: false,
      matched: false
    });
  });
  return shuffleArray(cards);
};

const Kuberturvalisuse_uurija4 = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState(createCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchesFound, setMatchesFound] = useState(0);
  const [message, setMessage] = useState("");

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
      
      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        newCards[firstIndex].matched = true;
        newCards[secondIndex].matched = true;
        setCards(newCards);
        setMatchesFound(matchesFound + 1);
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
          if (matchesFound + 1 === pairs.length) {
            setMessage("Tubli töö! Kõik paarid leitud.");
          }
        }, 800);
      } else {
        setTimeout(() => {
          newCards[firstIndex].flipped = false;
          newCards[secondIndex].flipped = false;
          setCards(newCards);
          setFlippedIndices([]);
          setIsProcessing(false);
          setMessage("Vale paar! Proovi uuesti.");
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
    <div className="vuln-memory-game">
      <h1>4. ETAPP: Haavatavuse mälu­mäng</h1>
      <p>Leia iga haavatavuse kaart ja selle õige remediatsiooni kaart.</p>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                {/* Kaardid esitatakse disainitud kujunduse kujul */}
              </div>
              <div className="card-back">
                {card.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        {matchesFound === pairs.length ? (
          <button onClick={handleEnd}>Lõpeta mäng</button>
        ) : (
          <button onClick={handleReset}>Alusta uuesti</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Kuberturvalisuse_uurija4;
