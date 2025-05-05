import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor1.css';

const allRisks = [
  { id: 1, name: "Andmeleke", isRelevant: true },
  { id: 2, name: "IT-süsteemi seisak", isRelevant: true },
  { id: 3, name: "Reputatsioonikahju", isRelevant: true },
  { id: 4, name: "Füüsiline rünnak", isRelevant: false },
  { id: 5, name: "Võrgu ülekoormus", isRelevant: false },
  { id: 6, name: "Kasutajate segadus", isRelevant: false }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateRiskOptions() {
  const correctRisks = allRisks.filter(r => r.isRelevant);
  const distractors = allRisks.filter(r => !r.isRelevant);
  const subsetSize = Math.floor(Math.random() * 2) + 4;
  const selected = [...correctRisks];
  shuffleArray(distractors);
  for (let i = 0; selected.length < subsetSize && i < distractors.length; i++) {
    selected.push(distractors[i]);
  }
  return shuffleArray(selected);
}

export default function Audiitor1() {
  const navigate = useNavigate();
  const [riskOptions] = useState(generateRiskOptions());
  const [selectedRisks, setSelectedRisks] = useState([]);
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [report, setReport] = useState("");
  const correctIds = allRisks.filter(r => r.isRelevant).map(r => r.id);
  const scenario = "Firma X kasutas viimati vana TLS-versiooni (TLS 1.0), mis suurendab andmeleketega seotud riski.";

  const toggleRisk = id => {
    if (checked) return;
    setSelectedRisks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleCheck = () => {
    const correctCount = selectedRisks.filter(id => correctIds.includes(id)).length;
    const wrongCount = selectedRisks.filter(id => !correctIds.includes(id)).length;
    if (correctCount === correctIds.length && wrongCount === 0) {
      setMessage("Tubli! Kõik riskid valitud õigesti.");
      setReport(`Audit kokkuvõte: ${scenario} Tuvastatud riskid: ${riskOptions.filter(r => correctIds.includes(r.id)).map(r => r.name).join(', ')}.`);
    } else {
      setMessage(`Õigeid valikuid: ${correctCount}, vigu: ${wrongCount}. Proovi uuesti.`);
    }
    setChecked(true);
  };

  const handleReset = () => {
    setSelectedRisks([]);
    setChecked(false);
    setMessage("");
    setReport("");
  };

  const containerClass = checked
    ? message.startsWith('Tubli') ? 'correct-bg' : 'incorrect-bg'
    : '';
  const messageClass = checked
    ? message.startsWith('Tubli') ? 'message-correct' : 'message-incorrect'
    : '';

  return (
    <div className={`cyadvice-stage1 ${containerClass}`}>
      <h2>Riskianalüüs</h2>
      <p className="scenario"><em>{scenario}</em></p>
      <p>Vali riskid, mida organisatsioonis võib esineda (valida tuleb {correctIds.length} riski):</p>
      <ul className="risk-list">
        {riskOptions.map(r => (
          <li key={r.id} className={selectedRisks.includes(r.id) ? 'selected' : ''} onClick={() => toggleRisk(r.id)}>
            <input type="checkbox" checked={selectedRisks.includes(r.id)} readOnly /> {r.name}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!checked ? (
          <button className="primary" onClick={handleCheck} disabled={selectedRisks.length === 0}>Kontrolli vastused</button>
        ) : (
          <button className="primary" onClick={handleReset}>Alusta uuesti</button>
        )}
        {checked && message.startsWith('Tubli') && (
          <button onClick={() => navigate('/audiitor2')}>Edasi</button>
        )}
      </div>
      {message && <div className={`message ${messageClass}`}>{message}</div>}
      {report && <div className="report">{report}</div>}
    </div>
  );
}