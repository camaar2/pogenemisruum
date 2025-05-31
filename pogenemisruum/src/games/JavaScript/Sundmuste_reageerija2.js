import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sundmuste_reageerija2.css';

const options = [
  { id: 'A', text: 'Operatsiooniline info', correct: false, explanation: 'Igapäevane teave rutiinsete operatsioonide haldamiseks.' },
  { id: 'B', text: 'Strateegiline info', correct: true, explanation: 'Pikaajaline teave organisatsiooni suundade ja prioriteetide kohta.' },
  { id: 'C', text: 'Taktikaline info', correct: false, explanation: 'Lühiajaline info intsidendi reageerimiseks.' },
  { id: 'D', text: 'Juhtimisinfo', correct: false, explanation: 'Ülevaade juhtimisprotsessidest, mis ei keskendu intsidendile.' }
];

export default function Sundmuste_reageerija2() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(false);

  const handleSelect = (opt) => {
    if (locked) return;
    setSelected(opt.id);
  };

  const handleSubmit = () => {
    const chosen = options.find(o => o.id === selected);
    if (chosen && chosen.correct) {
      setFeedback(`Õige! ${chosen.text} – ${chosen.explanation}`);
      setLocked(true);
    } else {
      const correct = options.find(o => o.correct);
      setFeedback(`Vale! Õige vastus on "${correct.text}".`);
    }
  };

  const handleReset = () => {
    if (locked) return;
    setSelected('');
    setFeedback('');
  };

  return (
    <div className={`risk-prioritization ${locked
        ? feedback.startsWith('Õige')
          ? 'correct-bg'
          : 'incorrect-bg'
        : ''}`}>
      <h1>Intsidendi kommunikatsiooni harjutus</h1>

      <div className="instructions">
        <p>Vali kommunikatsioonistrateegia, mida jagada partneritele intsidendi teavitamiseks:</p>
      </div>

      <ul className="option-list">
        {options.map(o => (
          <li
            key={o.id}
            className={selected === o.id ? 'selected' : ''}
            onClick={() => handleSelect(o)}
            title={o.explanation}
          >
            <input type="radio" checked={selected === o.id} readOnly /> {o.text}
          </li>
        ))}
      </ul>

      <div className="buttons">
        {!locked ? (
          <>
            <button className="primary" onClick={handleSubmit}>Kontrolli valikut</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button className="primary" onClick={() => navigate('/sundmuste_reageerija3_leht')}>
            Edasi
          </button>
        )}
      </div>

      {feedback && (
        <div className={`message ${feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}