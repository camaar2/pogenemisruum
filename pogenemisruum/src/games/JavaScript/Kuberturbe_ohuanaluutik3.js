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
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateThreats() {
  const count = Math.floor(Math.random() * 4) + 6; // 6-9 threats
  return shuffleArray(allThreats).slice(0, count);
}

function Kuberturbe_ohuanaluutik3() {
  const navigate = useNavigate();
  const [threats, setThreats] = useState(generateThreats());
  const [priorities, setPriorities] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const total = threats.length;
  const highCount = threats.filter(t => t.correctPriority === 'high').length;
  const medCount = threats.filter(t => t.correctPriority === 'medium').length;
  const lowCount = threats.filter(t => t.correctPriority === 'low').length;

  const handlePriorityChange = (id, value) => {
    if (isLocked) return;
    setPriorities(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(priorities).length !== total) {
      setMessage(`Palun määra kõigile ${total} ohule prioriteet!`);
      return;
    }
    const allCorrect = threats.every(t => priorities[t.id] === t.correctPriority);
    if (allCorrect) {
      setMessage("Tubli! Kõik ohud on õigesti prioriseeritud.");
      setIsLocked(true);
    } else {
      setMessage("Mõni prioriteet ei vasta soovituslikule tasemele. Kontrolli üle ja proovi uuesti.");
    }
  };

  const handleReset = () => {
    setThreats(generateThreats());
    setPriorities({});
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => navigate('/kuberturbe_ohuanaluutik4_leht');

  const containerClass = isLocked
    ? message.includes('Tubli') ? 'correct-bg' : 'incorrect-bg'
    : '';

  return (
    <div className={`risk-prioritization ${containerClass}`}>
      <h1>Riskide prioriseerimine</h1>
      <div className="instructions">
        <p>Sul on tuvastatud <strong>{total}</strong> ohtu.</p>
        <p>Vali <strong className="high-label">kõrge</strong> prioriteet ohtudele, mille mõju on võrreldav 0-day lunavara levikuga; neid on {highCount}.</p>
        <p>Vali <strong className="medium-label">keskmine</strong> prioriteet tavameetmetega tõrjutavatele rünnetele; neid on {medCount}.</p>
        <p>Vali <strong className="low-label">madal</strong> prioriteet riskidele, mille korral standardsed turvareeglid on piisavad; neid on {lowCount}.</p>
      </div>

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
                  value={priorities[threat.id] || ''}
                  onChange={e => handlePriorityChange(threat.id, e.target.value)}
                  disabled={isLocked}
                >
                  <option value="">Vali prioriteet...</option>
                  <option value="high">Kõrge</option>
                  <option value="medium">Keskmine</option>
                  <option value="low">Madal</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="primary" onClick={handleSubmit}>Esita prioriteedid</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button className="primary" onClick={handleNext}>Edasi</button>
        )}
      </div>

      {message && <div className={`message ${containerClass.includes('cor') ? 'message-correct' : 'message-incorrect'}`}>{message}</div>}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik3;