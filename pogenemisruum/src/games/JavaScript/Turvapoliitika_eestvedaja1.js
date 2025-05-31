import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja1.css';

const allLaws = [
  { id: 1, label: 'GDPR', correct: true },
  { id: 2, label: 'ISO 27001 standard', correct: false },
  { id: 3, label: 'NIS2 direktiiv', correct: true },
  { id: 4, label: 'Põllumajanduse toetuste seadus', correct: false }
];

function Turvapoliitika_eestvedaja1() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(false);

  const toggle = (id) => {
    if (locked) return;
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const chosen = allLaws.filter(l => selected.includes(l.id));
    const correctCount = allLaws.filter(l => l.correct).length;
    if (chosen.length !== correctCount) {
      setFeedback(`Palun vali kõik ${correctCount} kehtivat nõuet.`);
      return;
    }
    const allCorrect = chosen.every(l => l.correct);
    if (allCorrect) {
      setFeedback('Õige! Turvapoliitika nõuded on õigesti tuvastatud.');
    } else {
      setFeedback('Mõni valik on vale. Õiged nõuded on nüüd esile tõstetud.');
    }
    setLocked(true);
  };

  const handleReset = () => {
    setSelected([]);
    setFeedback('');
    setLocked(false);
  };

  return (
    <div className={`risk-prioritization ${locked ? (feedback.startsWith('Õige') ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Õiguslike nõuete tuvastamine</h1>
      <div className="instructions">
        <p>Vali seadused ja direktiivid, mis kehtivad küberturbe valdkonnas. Kokku on <strong>{allLaws.filter(l => l.correct).length}</strong> nõuet:</p>
      </div>
      <ul className="law-list">
        {allLaws.map(law => (
          <li
            key={law.id}
            onClick={() => toggle(law.id)}
            className={
              locked
                ? law.correct
                  ? 'selected correct'
                  : selected.includes(law.id)
                  ? 'selected incorrect'
                  : ''
                : selected.includes(law.id)
                ? 'selected'
                : ''
            }
          >
            <input
              type="checkbox"
              checked={selected.includes(law.id)}
              readOnly
            />
            {law.label}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!locked ? (
          <>
            <button className="primary" onClick={handleSubmit}>Kontrolli</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button className="primary" onClick={() => navigate('/turvapoliitika_eestvedaja2_leht')}>Edasi</button>
        )}
      </div>
      {feedback && <div className={`message ${feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'}`}>{feedback}</div>}
    </div>
  );
}


export default Turvapoliitika_eestvedaja1;
