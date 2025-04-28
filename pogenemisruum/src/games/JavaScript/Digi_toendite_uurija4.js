import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija4.css';

const evidencePairs = [
  { id: 1, content: "Krüpteeritud USB" },
  { id: 2, content: "Kahjuriprogrammi proov" },
  { id: 3, content: "Süsteemilogifail" },
  { id: 4, content: "Võrgu paketikaapamine" },
  { id: 5, content: "Forenseeriline kujutis" }
];

export default function Digi_toendite_uurija4() {
  const navigate = useNavigate();

  const colorMap = {
    1: "#e63946",
    2: "#457b9d",
    3: "#2a9d8f",
    4: "#f4a261",
    5: "#9d4edd"
  };

  const shuffleArray = array => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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

  const handleCardClick = idx => {
    if (isProcessing) return;
    const card = cards[idx];
    if (card.flipped || card.matched) return;

    const c = [...cards];
    c[idx].flipped = true;
    const f = [...flippedIndices, idx];
    setCards(c);
    setFlippedIndices(f);

    if (f.length === 2) {
      setIsProcessing(true);
      const [i1, i2] = f;
      const c1 = c[i1], c2 = c[i2];
      if (c1.pairId === c2.pairId) {
        c1.matched = c2.matched = true;
        setCards(c);
        setMatchesFound(m => m + 1);
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
          if (matchesFound + 1 === evidencePairs.length) {
            setMessage("Kõik paarid leitud!");
          }
        }, 800);
      } else {
        setTimeout(() => {
          c[i1].flipped = c[i2].flipped = false;
          setCards(c);
          setFlippedIndices([]);
          setIsProcessing(false);
          setMessage("Sobitus vale! Proovi uuesti.");
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
      <h1>Digitaalsete tõendite mälu mäng</h1>
      <p>Mäleta ja ühenda digitaalsete tõendite paarid:</p>
      <div className="cards-grid">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={
              "card " +
              (card.flipped || card.matched ? "flipped " : "") +
              (card.matched ? "matched" : "")
            }
            onClick={() => handleCardClick(idx)}
            style={{ border: `3px solid ${colorMap[card.pairId]}` }}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        {matchesFound === evidencePairs.length ? (
          <button onClick={handleEnd}>Lõpeta mäng</button>
        ) : (
          <button onClick={handleReset}>Lähtesta</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}