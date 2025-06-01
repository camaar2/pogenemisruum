import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja1.css';

const allLaws = [
  { 
    id: 1, 
    label: 'GDPR', 
    correct: true, 
    explanation: 'GDPR on andmekaitse määrus, mis mõjutab ka küberturbe nõudeid, kuna nõuab isikuandmete turvalist töötlemist.' 
  },
  { 
    id: 2, 
    label: 'ISO 27001 standard', 
    correct: false, 
    explanation: 'ISO 27001 on ülemaailmne info­turbe haldussüsteemi standard, kuid see ei ole seadus ega direktiiv.' 
  },
  { 
    id: 3, 
    label: 'NIS2 direktiiv', 
    correct: true, 
    explanation: 'NIS2 direktiiv on EL tasemel küberturbe raamistik, mis on otseselt seotud kriitilise infrastruktuuri turvalisusega.' 
  },
  { 
    id: 4, 
    label: 'Põllumajanduse toetuste seadus', 
    correct: false, 
    explanation: 'See seadus reguleerib põllumajanduse toetusi ega puuduta küberturbe valdkonda.' 
  }
];

function Turvapoliitika_eestvedaja1() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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
    setIsCorrect(allCorrect);
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
    setIsCorrect(false);
  };

  return (
    <div className={`risk-prioritization ${locked ? (isCorrect ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Õiguslike nõuete tuvastamine</h1>
      <div className="instructions">
        <p>
          Vali seadused ja direktiivid, mis kehtivad küberturbe valdkonnas. Kokku on <strong>{allLaws.filter(l => l.correct).length}</strong> nõuet:
        </p>
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
        <button onClick={handleReset}>Alusta uuesti</button>
        {!locked ? (
          <button className="primary" onClick={handleSubmit}>Esita valikud</button>
        ) : (
          <button className="primary" onClick={() => navigate('/turvapoliitika_eestvedaja2_leht')}>Edasi</button>
        )}
      </div>
      {feedback && (
        <div className={`message ${isCorrect ? 'message-correct' : 'message-incorrect'}`}>
          {feedback}
        </div>
      )}
      {locked && (
        <div className="explanations">
          <h2>Selgitused:</h2>
          <ul>
            {allLaws.map(law => (
              <li key={law.id}>
                <strong>{law.label}:</strong> {law.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Turvapoliitika_eestvedaja1;

