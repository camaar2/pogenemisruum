import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SecurityMeasuresSelection.css';

const solutions = [
  { id: 1, text: "Haavatavuste skanner (näiteks Nessus)", effective: true },
  { id: 2, text: "Võrgu monitooring (näiteks Nagios)", effective: true },
  { id: 3, text: "Rakenduste turvaskanner (näiteks Burp Suite)", effective: true },
  { id: 4, text: "Kõrgekululine kommertstarkvara", effective: false },
  { id: 5, text: "Vananenud viirusetõrje lahendus", effective: false },
  { id: 6, text: "Automaatne süsteemi uuenduste haldus", effective: true }
];

function SecurityMeasuresSelection() {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = () => {
    const correctIds = solutions.filter(sol => sol.effective).map(sol => sol.id).sort();
    const userIds = [...selected].sort((a, b) => a - b);
    if (JSON.stringify(correctIds) === JSON.stringify(userIds)) {
      setMessage("Valikud on õige! Turvameetmed on integreeritud.");
      setIsLocked(true);
    } else {
      setMessage("Mõned lahendused on ebasobivad. Kontrolli oma valikuid.");
    }
  };

  const handleReset = () => {
    setSelected([]);
    setMessage("");
  };

  const handleNext = () => {
    navigate("/collaboration");
  };

  return (
    <div className="measures-selection">
      <h1>2. ETAPP: Turvameetmete valik ja integreerimine</h1>
      <p>Vali lahendused, mis vastavad ettevõtte nõuetele:</p>
      <div className="solutions">
        {solutions.map(sol => (
          <div key={sol.id} className="solution-item">
            <label>
              <input 
                type="checkbox"
                checked={selected.includes(sol.id)}
                onChange={() => handleCheckboxChange(sol.id)}
                disabled={isLocked}
              />
              {sol.text}
            </label>
          </div>
        ))}
      </div>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Kontrolli valikuid</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        )}
        {isLocked && (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default SecurityMeasuresSelection;
