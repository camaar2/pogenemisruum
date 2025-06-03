import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sundmuste_reageerija2.css';

const options = [
  {
    id: 'A',
    text: 'Operatsiooniline info',
    correct: false,
    explanation: 'Igapäevane teave rutiinsete operatsioonide haldamiseks, mitte strateegilise otsustuse jaoks.'
  },
  {
    id: 'B',
    text: 'Strateegiline info',
    correct: true,
    explanation: 'Pikaajaline teave organisatsiooni suundade ja prioriteetide kohta, mida jagatakse partneritele intsidendi järel.'
  },
  {
    id: 'C',
    text: 'Taktikaline info',
    correct: false,
    explanation: 'Lühiajaline info intsidendi opereerimiseks, kuid partneritele edastamiseks sobib strateegiline ülevaade.'
  },
  {
    id: 'D',
    text: 'Juhtimisinfo',
    correct: false,
    explanation: 'Ülevaade juhtimisprotsessidest, mis ei keskendu otse intsidendi kommunikatsioonile partneritele.'
  }
];

export default function Sundmuste_reageerija2() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(false);

  const handleSelect = (opt) => {
    if (locked) return;
    setSelected(opt.id);
    setFeedback('');
  };

  const handleSubmit = () => {
    if (!selected) {
      setFeedback('Palun vali üks variant.');
      return;
    }
    const chosen = options.find(o => o.id === selected);
    if (chosen.correct) {
      setFeedback(`Õige! ${chosen.text} – ${chosen.explanation}`);
      setLocked(true);
    } else {
      const correct = options.find(o => o.correct);
      setFeedback(`Vale! Õige vastus on "${correct.text}".`);
      setLocked(true);
    }
  };

  const handleReset = () => {
    setSelected('');
    setFeedback('');
    setLocked(false);
  };

  return (
    <div className={`risk-prioritization ${locked
        ? feedback.startsWith('Õige')
          ? 'correct-bg'
          : 'incorrect-bg'
        : ''}`}>
      <h1>Intsidendi kommunikatsiooni harjutus</h1>

      <div className="instructions">
        <p>Vali kommunikatsioonistrateegia, mida jagada partneritele intsidendi teavitamiseks. Kui oled valmis, vajuta „Esita valikud“.</p>
      </div>

      <ul className="option-list">
        {options.map(o => (
          <li
            key={o.id}
            className={selected === o.id ? 'selected' : ''}
            onClick={() => handleSelect(o)}
          >
            <input type="radio" checked={selected === o.id} readOnly /> {o.text}
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button onClick={handleReset}>Alusta uuesti</button>
        {!locked ? (
          <button className="primary" onClick={handleSubmit}>Esita valikud</button>
        ) : (
          <button className="primary" onClick={() => navigate('/sundmuste_reageerija3_leht')}>Edasi</button>
        )}
      </div>

      {feedback && (
        <div className={`message ${feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'}`}>
          {feedback}
        </div>
      )}

      {locked && (
        <div className="explanations">
          <h2>Selgitused valikute kohta:</h2>
          <ul>
            {options.map(o => (
              <li key={o.id}>
                <strong>{o.text}:</strong> {o.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
