import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija1.css';

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const allSources = [
  { id: 1, title: "Avalik serverite info", isRelevant: true },
  { id: 2, title: "WHOIS info", isRelevant: true },
  { id: 3, title: "Subdomeeni otsing", isRelevant: true },
  { id: 4, title: "Võltsitud reklaamid", isRelevant: false },
  { id: 5, title: "Sotsiaalmeedia jälgimine", isRelevant: false },
  { id: 6, title: "Turvaraportid", isRelevant: true },
  { id: 7, title: "Blogi ja foorumid", isRelevant: false },
  { id: 8, title: "Avalikud turvaanalüüsid", isRelevant: true },
  { id: 9, title: "Tehniline audit", isRelevant: true }
];

function Norkustestija1() {
  const navigate = useNavigate();
  const [sources, setSources] = useState(() => shuffleArray(allSources).slice(0, 6));
  const [selected, setSelected] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [message, setMessage] = useState("");

  const handleItemClick = (id) => {
    if (isSubmitted) return;
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctIds = sources.filter(s => s.isRelevant).map(s => s.id).sort((a, b) => a - b);
    const userIds = [...selected].sort((a, b) => a - b);
    if (JSON.stringify(correctIds) === JSON.stringify(userIds)) {
      setMessage("Kogusid kõik olulised andmed! Liigu järgmisse etappi.");
      setIsLocked(true);
    } else {
      setMessage("Mõned olulised andmed puudu või lisatud müra. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSelected([]);
    setIsSubmitted(false);
    setIsLocked(false);
    setMessage("");
    setSources(shuffleArray(allSources).slice(0, 6));
  };

  const handleNext = () => {
    navigate("/norkustestija2");
  };

  return (
    <div className="recon">
      <h1>1. ETAPP: Sihikeskkonna kaardistamine</h1>
      <p>Klõpsa allolevatel allikatel, et koguda kasulikku infot sihtsüsteemi kohta:</p>
      <div className="sources">
        {sources.map(source => {
          let itemClass = "source-item";
          if (isSubmitted) {
            if (source.isRelevant) {
              itemClass += selected.includes(source.id) ? " correct" : " missed";
            } else {
              if (selected.includes(source.id)) {
                itemClass += " incorrect";
              }
            }
          } else {
            if (selected.includes(source.id)) {
              itemClass += " selected";
            }
          }
          return (
            <div 
              key={source.id} 
              className={itemClass}
              onClick={() => handleItemClick(source.id)}
            >
              {source.title}
            </div>
          );
        })}
      </div>
      <div className="buttons">
        {!isSubmitted && (
          <>
            <button onClick={handleSubmit}>Kontrolli valikuid</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        )}
        {isSubmitted && isLocked && (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Norkustestija1;
