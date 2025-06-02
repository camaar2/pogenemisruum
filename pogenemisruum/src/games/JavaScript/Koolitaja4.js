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
  const [isCorrect, setIsCorrect] = useState(false);

  const handleChange = (id, value) => {
    if (isLocked) return;
    setSelected(prev => ({ ...prev, [id]: value }));
    setFeedback("");
    setIsCorrect(false);
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
      setIsCorrect(true);
    } else {
      setFeedback("Mõned elemendid on valesti märgitud või jäi märkimata. Proovi uuesti!");
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setIndicators(generateIndicators());
    setSelected({});
    setFeedback("");
    setIsLocked(false);
    setIsCorrect(false);
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className={`stage stage4 ${isLocked ? "correct-bg" : feedback.includes("valesti") ? "incorrect-bg" : ""}`}>
      <h2>Phishing-indikaatorite tuvastamine</h2>
      <p>Märgi iga üksus kui <strong>„Phish”</strong> või <strong>„Safe”</strong>. Kui oled valmis, vajuta „Esita valikud“.</p>

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

      {isCorrect && (
        <div className="explanation">
          <h3>Selgitus phishing-indikaatorite kohta:</h3>
          <ul>
            <li><strong>„Kinnita oma kontod andes andmed”</strong> – tüüpiline phishi-päis, püüab kasutajat kiirelt hirmutada ja sundida tegutsema.</li>
            <li><strong>@officialbank.com</strong> – turvaline saatja, domään vastab tegelikule ettevõttele.</li>
            <li><strong>Kahtlane link: https://verify-you.zz/…</strong> – phishi domeen ja petlik aadress, suunab vääritud veebilehele.</li>
            <li><strong>Manus „pdf” arve pärineb teadaolevalt kliendilt</strong> – turvaline, pärineb usaldusväärselt allikalt.</li>
            <li><strong>Laiend piltideks maskeeritud .exe failid</strong> – phish, pahatahtlik käivitatav fail peidetud pildina.</li>
            <li><strong>Tavaline tervitus „Tere, John!”</strong> – turvaline, isikupärane ja usaldusväärne algus.</li>
            <li><strong>Saatja profiil: mittekattuv nimi vs. e-posti aadress</strong> – phish, profiil ei vasta saatja aadressile, vihjab petuskeemile.</li>
          </ul>
        </div>
      )}

      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset-button" onClick={handleReset}>
              Alusta uuesti
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Esita valikud
            </button>
          </>
        ) : (
          <button className="finish-button" onClick={handleFinish}>
            Lõpeta mäng
          </button>
        )}
      </div>

      {feedback && <div className={`feedback ${isCorrect ? "message-correct" : "message-incorrect"}`}>{feedback}</div>}
    </div>
  );
}

export default Koolitaja4;
