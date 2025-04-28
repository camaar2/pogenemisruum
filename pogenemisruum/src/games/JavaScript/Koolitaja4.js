import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Koolitaja4.css';

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const emailIndicators = [
  { id: 1, text: "Pealkiri: „Kinnita oma kontod andes andmed“", category: "phish" },
  { id: 2, text: "Saatja domeen: @officialbank.com", category: "safe" },
  { id: 3, text: "Kahtlane link: https://verify-you.zz/?account=123", category: "phish" },
  { id: 4, text: "Manus: 'pdf' arve, pärineb teadaolevalt kliendilt", category: "safe" },
  { id: 5, text: "Laiend piltideks maskeeritud .exe failid", category: "phish" },
  { id: 6, text: "Tavaline tervitus: 'Tere, John!'", category: "safe" },
  { id: 7, text: "Saatja profiil: mittekattuv nimi vs. e-posti aadress", category: "phish" }
];

function Koolitaja4() {
  const navigate = useNavigate();

  function generateIndicators() {
    const subset = shuffleArray(emailIndicators).slice(0, 5);
    return shuffleArray(subset);
  }

  const [indicators, setIndicators] = useState(generateIndicators());
  const [selected, setSelected] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleChange = (id, value) => {
    if (isLocked) return;
    setSelected(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    let allCorrect = true;
    indicators.forEach(ind => {
      if (selected[ind.id] !== ind.category) {
        allCorrect = false;
      }
    });
    if (allCorrect && Object.keys(selected).length === indicators.length) {
      setFeedback("Õige! Kõik elemendid on õigesti märgitud.");
      setIsLocked(true);
    } else {
      setFeedback("Mõned elemendid on valesti märgitud või jäi märkimata. Proovi uuesti!");
    }
  };

  const handleReset = () => {
    setIndicators(generateIndicators());
    setSelected({});
    setFeedback("");
    setIsLocked(false);
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className={`phishnomore-stage4 ${isLocked ? "correct-bg" : feedback.includes("valesti") ? "incorrect-bg" : ""}`}>
      <h2>Viimane phishing-indikaatorite tuvastamine</h2>
      <p>Märgi iga üksus kui <strong>„Phish”</strong> või <strong>„Safe”</strong>:</p>
      <table className="indicators-table">
        <thead>
          <tr>
            <th>Indikaator</th>
            <th>Phish</th>
            <th>Safe</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map(ind => (
            <tr key={ind.id}>
              <td>{ind.text}</td>
              <td>
                <input 
                  type="radio" 
                  name={`indicator-${ind.id}`} 
                  value="phish"
                  checked={selected[ind.id] === "phish"} 
                  onChange={() => handleChange(ind.id, "phish")}
                  disabled={isLocked}
                />
              </td>
              <td>
                <input 
                  type="radio" 
                  name={`indicator-${ind.id}`}
                  value="safe"
                  checked={selected[ind.id] === "safe"}
                  onChange={() => handleChange(ind.id, "safe")}
                  disabled={isLocked}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Kontrolli valikuid</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        )}
        {isLocked && (
          <button onClick={handleFinish}>Lõpeta mäng</button>
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Koolitaja4;
