import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja2.css';

const rules = [
  { id: 1, text: 'Luba ainult HTTPS liiklus', correct: true },
  { id: 2, text: 'Luba kogu liiklus ilma piiranguteta', correct: false },
  { id: 3, text: 'Keela tundmatud sissetulevad ühendused', correct: true },
  { id: 4, text: 'Luba FTP liiklus igast allikast', correct: false }
];

export default function Rakendaja2() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState('');

  const correctCount = rules.filter(r => r.correct).length;

  const toggleSelection = id => {
    if (locked) return;
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const correctIds = rules.filter(r => r.correct).map(r => r.id).sort();
    const sel = [...selected].sort((a, b) => a - b);
    const ok = JSON.stringify(correctIds) === JSON.stringify(sel);
    setLocked(true);
    setMessage(ok
      ? '🎉 Õige! Õiged tulemüüri reeglid on valitud.'
      : '❌ Mõni reegel on vale või puudu. Proovi uuesti.'
    );
  };

  const handleNext = () => navigate('/rakendaja3_leht');

  const containerClass = locked
    ? message.startsWith('🎉') ? 'correct-bg' : 'incorrect-bg'
    : '';

  return (
    <div className={`stage ${containerClass}`}>
      <h1>Tulemüüri reeglite optimeerimine</h1>
      <p className="scenario">
        <em>
          Tulemüür on võrgu esimene kaitsekihi, mis filtreerib sissetulevat ja väljaminevat liiklust.
          Õige reeglite komplekt tagab, et lubatud ning krüpteeritud ühendused toimivad,
          samal ajal kui pahatahtlik või tundmatu liiklus jääb blokeerituks.
        </em>
      </p>
      <p className="instruction">
        Vali <strong>{correctCount}</strong> reeglit, mis on vajalikud turvalise tulemüüri konfiguratsiooniks:
        blokeerivad ebaturvalist või volitamata liiklust, kuid lubavad usaldusväärseid HTTPS- ja admin-ühendusi.
      </p>
      <ul className="rule-list">
        {rules.map(r => {
          let cls = '';
          if (locked) {
            if (r.correct && selected.includes(r.id)) cls = 'correct';
            else if (r.correct && !selected.includes(r.id)) cls = 'missed';
            else if (!r.correct && selected.includes(r.id)) cls = 'incorrect';
          } else if (selected.includes(r.id)) {
            cls = 'selected';
          }
          return (
            <li
              key={r.id}
              className={cls}
              onClick={() => toggleSelection(r.id)}
            >
              <input
                type="checkbox"
                checked={selected.includes(r.id)}
                readOnly
              /> {r.text}
            </li>
          );
        })}
      </ul>
      <div className="buttons">
        {!locked ? (
          <button
            className="primary"
            onClick={handleSubmit}
            disabled={selected.length !== correctCount}
          >
            Kontrolli valikuid
          </button>
        ) : message.startsWith('🎉') ? (
          <button className="primary" onClick={handleNext}>Edasi</button>
        ) : (
          <button onClick={() => { setLocked(false); setMessage(''); }}>Proovi uuesti</button>
        )}
      </div>
      {message && (
        <div className={`message ${locked
          ? (message.startsWith('🎉') ? 'message-correct' : 'message-incorrect')
          : ''}`}>
          {message}
        </div>
      )}
    </div>
  );
}