import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik2.css';

const fullWordPool = [
  { id: 1, text: "Kogutud", isIndicator: false },
  { id: 2, text: "ohuteave", isIndicator: false },
  { id: 3, text: "malware.exe", isIndicator: true },
  { id: 4, text: "ja", isIndicator: false },
  { id: 5, text: "tavaline", isIndicator: false },
  { id: 6, text: "phishing_file", isIndicator: true },
  { id: 7, text: "192.168.1.5", isIndicator: true },
  { id: 8, text: "muuhulgas", isIndicator: false },
  { id: 9, text: "trojanDetector", isIndicator: true },
  { id: 10, text: "10.0.0.23", isIndicator: true },
  { id: 11, text: "randomtekst", isIndicator: false },
  { id: 12, text: "C2server", isIndicator: true },
  { id: 13, text: "port445", isIndicator: true },
  { id: 14, text: "somefile.pdf", isIndicator: false },
  { id: 15, text: "suspect_credentials", isIndicator: true },
  { id: 16, text: "tavakasutaja", isIndicator: false },
  { id: 17, text: "backup.zip", isIndicator: false },
  { id: 18, text: "10.15.30.111", isIndicator: true },
  { id: 19, text: "evilscript.js", isIndicator: true },
  { id: 20, text: "keegi mainis", isIndicator: false }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateWords() {
  const shuffled = shuffleArray(fullWordPool);
  return shuffled.slice(0, 12); 
}

function Kuberturbe_ohuanaluutik2() {
  const navigate = useNavigate();

  const [words, setWords] = useState(generateWords());
  const [selectedIndicators, setSelectedIndicators] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleWordClick = (word) => {
    if (isLocked) return;
    setSelectedIndicators(prev => {
      if (prev[word.id]) {
        const updated = { ...prev };
        delete updated[word.id];
        return updated;
      } else {
        return { ...prev, [word.id]: true };
      }
    });
  };

  const handleSubmit = () => {
    const correctIds = words.filter(w => w.isIndicator).map(w => w.id).sort((a, b) => a - b);
    const userSelected = Object.keys(selectedIndicators).map(id => parseInt(id, 10)).sort((a, b) => a - b);
    
    if (JSON.stringify(correctIds) === JSON.stringify(userSelected)) {
      setMessage("Kõik ohumärgid tuvastatud! Saad edasi liikuda.");
      setIsLocked(true);
    } else {
      setMessage("Mõned ohumärgid on puudu või valesti märgitud. Proovi uuesti!");
    }
  };

  const handleReset = () => {
    setWords(generateWords());
    setSelectedIndicators({});
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate("/kuberturbe_ohuanaluutik3");
  };

  const getWordClass = (word) => {
    if (!isLocked) {
      return selectedIndicators[word.id] ? "word selected" : "word";
    } else {
      const isSelected = !!selectedIndicators[word.id];
      if (word.isIndicator && isSelected) {
        return "word correct";
      } else if (word.isIndicator && !isSelected) {
        return "word missed";
      } else if (!word.isIndicator && isSelected) {
        return "word incorrect";
      } else {
        return "word neutral";
      }
    }
  };

  return (
    <div className={`analyst-game ${isLocked ? (message.includes("Kõik") ? "correct-bg" : "incorrect-bg") : (message.includes("valesti") ? "incorrect-bg" : "")}`}>
      <h1>Andmete analüüs</h1>
      <p>Klõpsa tekstis sõnadel, mida pead ohumärkideks (failinimed, IP-aadressid, jms). Seejärel vajuta "Kontrolli valikuid".</p>
      <p className="analysis-text">
        {words.map(word => (
          <span 
            key={word.id} 
            className={getWordClass(word)}
            onClick={() => handleWordClick(word)}
          >
            {word.text}{" "}
          </span>
        ))}
      </p>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Kontrolli valikuid</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik2;
