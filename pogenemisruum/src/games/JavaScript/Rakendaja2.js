import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja2.css';

const rules = [
  {
    id: 1,
    text: 'Luba ainult HTTPS liiklus',
    correct: true,
    explanation: 'HTTPS-ühenduste lubamine tagab, et andmeedastus on krüpteeritud ja turvaline.'
  },
  {
    id: 2,
    text: 'Luba kogu liiklus ilma piiranguteta',
    correct: false,
    explanation: 'Igasuguse liikluse lubamine avab võrgu pahatahtlikele rünnakutele ja turvarikkumistele.'
  },
  {
    id: 3,
    text: 'Keela tundmatud sissetulevad ühendused',
    correct: true,
    explanation: 'Tundmatute ühenduste keelamine vähendab volitamata juurdepääsu riski.'
  },
  {
    id: 4,
    text: 'Luba FTP liiklus igast allikast',
    correct: false,
    explanation: 'FTP-liikluse lubamine ilma piiranguteta jätab võrgu krüptimata failiedastusele ja turvarikkumistele avatuks.'
  }
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
    setMessage(
      ok
        ? '🎉 Õige! Õiged tulemüüri reeglid on valitud.'
        : '❌ Mõni reegel on vale või puudu. Proovi uuesti.'
    );
  };

  const handleReset = () => {
    setLocked(false);
    setMessage('');
    setSelected([]);
  };

  const handleNext = () => navigate('/rakendaja3_leht');

  const containerClass = locked
    ? message.startsWith('🎉')
      ? 'correct-bg'
      : 'incorrect-bg'
    : '';

  return (
    <div className={`stage ${containerClass}`}>
      <h1>Tulemüüri reeglite optimeerimine</h1>
      <p className="scenario">
        <em>
          Tulemüür on võrgu esimene kaitsekiht, mis filtreerib sissetulevat ja väljaminevat liiklust.
          Õige reeglite komplekt tagab, et lubatud ning krüpteeritud ühendused toimivad,
          samal ajal kui pahatahtlik või tundmatu liiklus jääb blokeerituks.
        </em>
      </p>
      <p className="instruction">
        Vali <strong>{correctCount}</strong> reeglit, mis on vajalikud turvalise tulemüüri konfiguratsiooniks:
        blokeerivad ebaturvalist või volitamata liiklust, kuid lubavad usaldusväärseid HTTPS- ja admin-ühendusi.
      </p>

      <p className="instructions">
        Kui oled valinud õiged reeglid, klõpsa nupul “Esita valikud”.
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
      <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="reset" onClick={handleReset}>
          Alusta uuesti
        </button>
        {!locked ? (
          <button
            className="primary submit"
            onClick={handleSubmit}
            disabled={selected.length !== correctCount}
          >
            Esita valikud
          </button>
        ) : message.startsWith('🎉') ? (
          <button className="primary next" onClick={handleNext}>
            Edasi
          </button>
        ) : (
          <button className="primary submit" onClick={handleReset}>
            Proovi uuesti
          </button>
        )}
      </div>
      {message && (
        <div className={`message ${locked
          ? (message.startsWith('🎉') ? 'message-correct' : 'message-incorrect')
          : ''}`}>
          {message}
        </div>
      )}
      {locked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {rules.map(r => (
              <li key={r.id}>
                <strong>{r.text}:</strong> {r.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
