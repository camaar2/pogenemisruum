import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Arhitekt1.css';

const systems = [
  {
    id: 1,
    name: "Veebiserver",
    risks: shuffleArray([
      { id: 'r1', label: "Veebirünnakute võimalus" },
      { id: 'r2', label: "Andmeleke" }
    ]),
    correctRiskId: 'r1'
  },
  {
    id: 2,
    name: "Andmebaas",
    risks: shuffleArray([
      { id: 'r3', label: "Andmeleke" },
      { id: 'r4', label: "Pahavara levik" }
    ]),
    correctRiskId: 'r3'
  },
  {
    id: 3,
    name: "E-posti server",
    risks: shuffleArray([
      { id: 'r5', label: "Phishing rünnakute võimalus" },
      { id: 'r6', label: "Pahavara levik" }
    ]),
    correctRiskId: 'r5'
  }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function Arhitekt1() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleChange = (systemId, riskId) => {
    setSelections(prev => ({ ...prev, [systemId]: riskId }));
  };

  const handleSubmit = () => {
    let allCorrect = true;
    systems.forEach(system => {
      if (selections[system.id] !== system.correctRiskId) {
        allCorrect = false;
      }
    });
    if (allCorrect) {
      setFeedback("Kõik süsteemide riskid on õigesti määratud!");
      setIsLocked(true);
    } else {
      setFeedback("Mõni valik on vale. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSelections({});
    setFeedback("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate('/arhitekt2_leht'); 
  };

  return (
    <div className={`security-mapping-game ${isLocked ? "correct-bg" : feedback && !isLocked ? "incorrect-bg" : ""}`}>
      <h1>Riskide tuvastamine süsteemides</h1>
      <p>Vali igale süsteemile kõige olulisem turvarisk, mis vajab esmast kaitset.</p>

      {systems.map(system => (
        <div key={system.id} className="system-block">
          <h3>{system.name}</h3>
          <div className="risks">
            {system.risks.map(risk => (
              <label key={risk.id} className="risk-option">
                <input
                  type="radio"
                  name={`system-${system.id}`}
                  value={risk.id}
                  checked={selections[system.id] === risk.id}
                  onChange={() => handleChange(system.id, risk.id)}
                  disabled={isLocked}
                />
                {risk.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset-button" onClick={handleReset}>Alusta uuesti</button>
            <button className="submit-button" onClick={handleSubmit}>Esita valikud</button>
          </>
        ) : (
          <button className="next-button" onClick={handleNext}>Jätka</button>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${isLocked ? "success" : "error"}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default Arhitekt1;

