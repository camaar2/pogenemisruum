import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Arhitekt1.css';

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const systems = [
  {
    id: 1,
    name: "Veebiserver",
    risks: shuffleArray([
      {
        id: 'r1',
        label: "Veebirünnakute võimalus",
        explanation:
          "Veebiserver puutub pidevalt internetiliiklusesse ja on seetõttu haavatav SQL-i, XSS-i ja DDoS-rünnakutele."
      },
      {
        id: 'r2',
        label: "Andmeleke",
        explanation:
          "Kuigi andmeleke on tõsine, põhjustavad veebiründed enne seda tavaliselt tõsisemaid katkestusi ja teenuse kättesaadavuse probleeme."
      }
    ]),
    correctRiskId: 'r1'
  },
  {
    id: 2,
    name: "Andmebaas",
    risks: shuffleArray([
      {
        id: 'r3',
        label: "Andmeleke",
        explanation:
          "Andmebaas sisaldab tundlikku teavet ja selle leke võib avalikustada salasõnu, isikuandmeid ja ärisaladusi."
      },
      {
        id: 'r4',
        label: "Pahavara levik",
        explanation:
          "Pahavara levik tähendab, et ründaja võib kasutada muid vektoriteenuseid, kuid andmeleke on otsene ja prioriteetsem risk."
      }
    ]),
    correctRiskId: 'r3'
  },
  {
    id: 3,
    name: "E-posti server",
    risks: shuffleArray([
      {
        id: 'r5',
        label: "Phishing rünnakute võimalus",
        explanation:
          "E-posti serveri kaudu levivad phishing-kirjad võivad nakatada kasutajad ja varastada paroole."
      },
      {
        id: 'r6',
        label: "Pahavara levik",
        explanation:
          "Kuigi pahavara on probleem, saab enamik pahavara just phishing’u kaudu ükskõik millise serveri kaudu levitada."
      }
    ]),
    correctRiskId: 'r5'
  }
];

export default function Arhitekt1() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  const handleChange = (systemId, riskId) => {
    if (isLocked) return;
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
      setShowExplanations(true);
    } else {
      setFeedback("Mõni valik on vale. Proovi uuesti.");
      setIsLocked(false);
      setShowExplanations(false);
    }
  };

  const handleReset = () => {
    setSelections({});
    setFeedback("");
    setIsLocked(false);
    setShowExplanations(false);
  };

  const handleNext = () => {
    navigate('/arhitekt2_leht');
  };

  return (
    <div
      className={`security-mapping-game ${
        isLocked
          ? "correct-bg"
          : feedback && !isLocked
          ? "incorrect-bg"
          : ""
      }`}
    >
      <h1>Riskide tuvastamine süsteemides</h1>
      <p>
        Vali igale süsteemile kõige olulisem turvarisk, mis vajab esmast kaitset.
      </p>

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
        <button onClick={handleReset}>Alusta uuesti</button>
        {!isLocked ? (
          <button onClick={handleSubmit}>Esita valikud</button>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Jätka
          </button>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${isLocked ? "success" : "error"}`}>
          {feedback}
        </div>
      )}

      {showExplanations && (
        <div className="explanations">
          <h2>Selgitused valikute kohta:</h2>
          <ul>
            {systems.map(system => {
              const chosenId = selections[system.id];
              const chosenRisk = system.risks.find(r => r.id === chosenId);
              return (
                <li key={system.id}>
                  <strong>{system.name}:</strong>{" "}
                  {chosenRisk
                    ? chosenRisk.explanation
                    : "Puudub valik."}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}


