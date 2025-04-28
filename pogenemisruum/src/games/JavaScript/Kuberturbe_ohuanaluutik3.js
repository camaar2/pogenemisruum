import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik3.css';

const allThreats = [
  { id: 1, text: "Leitud uus lunavara tüvi", correctPriority: "high" },
  { id: 2, text: "Teadaolev port-skaneerija IP", correctPriority: "medium" },
  { id: 3, text: "Potentsiaalne paroolileke", correctPriority: "high" },
  { id: 4, text: "Võimalik phishing-kampaania", correctPriority: "low" },
  { id: 5, text: "Serveri avatud port 445", correctPriority: "medium" },
  { id: 6, text: "SQL Injection avastus", correctPriority: "high" },
  { id: 7, text: "Telnet port 23 avatud", correctPriority: "low" },
  { id: 8, text: "Kahtlane DNS-kirje", correctPriority: "low" },
  { id: 9, text: "Ülekoormusrünnak HTTP-le", correctPriority: "medium" },
  { id: 10, text: "Värskelt avastatud 0-day haavatavus", correctPriority: "high" }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateThreats() {
  const shuffled = shuffleArray(allThreats);
  const size = Math.floor(Math.random() * 2) + 4;
  return shuffled.slice(0, size);
}

function Kuberturbe_ohuanaluutik3() {
  const navigate = useNavigate();

  const [threats, setThreats] = useState(generateThreats());
  const [priorities, setPriorities] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handlePriorityChange = (id, value) => {
    if (isLocked) return;
    setPriorities(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    let allCorrect = true;
    if (Object.keys(priorities).length !== threats.length) {
      setMessage("Mõned ohud pole prioriteeti saanud. Proovi uuesti.");
      return;
    }
    for (let i = 0; i < threats.length; i++) {
      const threat = threats[i];
      if (priorities[threat.id] !== threat.correctPriority) {
        allCorrect = false;
        break;
      }
    }
    if (allCorrect) {
      setMessage("Oled ohud edukalt prioriseerinud!");
      setIsLocked(true);
    } else {
      setMessage("Mõned ohud on valesti prioriseeritud. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setThreats(generateThreats());
    setPriorities({});
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate("/kuberturbe_ohuanaluutik4");
  };

  let containerClass = "";
  if (isLocked) {
    if (message.includes("edukalt")) {
      containerClass = "correct-bg";
    } else {
      containerClass = "incorrect-bg";
    }
  } else if (message.includes("valesti") || message.includes("pole prioriteeti")) {
    containerClass = "incorrect-bg";
  }

  return (
    <div className={`risk-prioritization ${containerClass}`}>
      <h1>3. ETAPP: Riskide prioriseerimine</h1>
      <p>Vali igale ohule sobiv prioriteeditase:</p>
      <table className="risk-table">
        <thead>
          <tr>
            <th>Oht</th>
            <th>Prioriteet</th>
          </tr>
        </thead>
        <tbody>
          {threats.map(threat => (
            <tr key={threat.id}>
              <td>{threat.text}</td>
              <td>
                <select
                  value={priorities[threat.id] || ""}
                  onChange={(e) => handlePriorityChange(threat.id, e.target.value)}
                  disabled={isLocked}
                >
                  <option value="">Vali prioriteet</option>
                  <option value="high">kõrge</option>
                  <option value="medium">keskmine</option>
                  <option value="low">madal</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Esita valikud</button>
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

export default Kuberturbe_ohuanaluutik3;
