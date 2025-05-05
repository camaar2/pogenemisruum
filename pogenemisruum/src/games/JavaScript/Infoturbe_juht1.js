import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht1.css';

const allPossibleRules = [
  { id: 1, name: 'Veebiliiklus (HTTP/HTTPS)', correct: 'allow' },
  { id: 2, name: 'E-posti liiklus (SMTP)', correct: 'allow' },
  { id: 3, name: 'Kahtlane port 666 (IRC)', correct: 'block' },
  { id: 4, name: 'Turvaline SSH (port 22)', correct: 'allow' },
  { id: 5, name: 'Ebaturvaline Telnet (port 23)', correct: 'block' },
  { id: 6, name: 'DNS päringud (port 53)', correct: 'allow' },
  { id: 7, name: 'FTP failiedastus (port 21)', correct: 'allow' }
];

const hints = {
  1: 'Veebilehitsemine toimub peamiselt sadamate 80 ja 443 kaudu.',
  2: 'Sisse- ja väljaminev e-post liigub tavaliselt sadama 25 kaudu.',
  3: 'Port 666 ei ole tavaline teenuseport ning võib peita pahatahtlikku tegevust.',
  4: 'SSH krüpteerib kogu liikluse ning töötab sadamal 22.',
  5: 'Telnet edastab andmed lahtiselt ja töötab sadamal 23.',
  6: 'DNS „tõlgib“ nimesid IP-aadressideks sadama 53 kaudu.',
  7: 'FTP ei ole krüpteeritud ning liigub sadamal 21.'
};

function shuffleArray(arr) {
  return arr
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function Infoturbe_juht1() {
  const navigate = useNavigate();
  const [rules, setRules] = useState([]);
  const [selections, setSelections] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showHints, setShowHints] = useState({});

  useEffect(() => {
    setRules(shuffleArray(allPossibleRules).slice(0, 3));
  }, []);

  const handleSelect = (id, action) => {
    if (locked) return;
    setSelections(prev => ({ ...prev, [id]: action }));
  };

  const handleToggleHint = id => {
    setShowHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheck = () => {
    setChecked(true);
    const allCorrect = rules.every(r => selections[r.id] === r.correct);
    if (allCorrect && Object.keys(selections).length === rules.length) {
      setLocked(true);
      setMessage({ text: '🎉 Tubli! Tulemüüri reeglid on õigesti seadistatud.', type: 'success' });
    } else {
      setMessage({ text: '❌ Mõni valik on vale või puudub. Kasuta vihjet või proovi uuesti.', type: 'error' });
    }
  };

  const handleRetry = () => {
    setSelections({});
    setChecked(false);
    setLocked(false);
    setMessage({ text: '', type: '' });
    setShowHints({});
  };

  const handleNext = () => {
    navigate('/infoturbe_juht2');
  };

  const containerClass = locked
    ? 'correct-bg'
    : checked
      ? 'incorrect-bg'
      : '';

  return (
    <div className={`software-puzzle ${containerClass}`}>
      <h1>Tulemüüri reeglite valik</h1>
      <p className="scenario">
        <em>
          Sa oled küberanalüütik, kelle ülesanne on vastutava korporatsiooni võrgu tulemüüri õigesti konfigureerida.
          Iga liiklusvoog tuleb kas lubada või blokeerida, tagades samal ajal häälestuse turvalisuse ja töökindluse.
        </em>
      </p>
      <p className="instruction">
        Määra iga rea puhul, kas see liiklus <strong>lubada</strong> või <strong>blokeerida</strong>:
      </p>

      <table className="rule-table">
        <thead>
          <tr>
            <th>Liiklus</th>
            <th>Lubada</th>
            <th>Blokeerida</th>
            <th>Vihje</th>
          </tr>
        </thead>
        <tbody>
          {rules.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>
                <input
                  type="radio"
                  name={`rule-${r.id}`}
                  disabled={locked}
                  checked={selections[r.id] === 'allow'}
                  onChange={() => handleSelect(r.id, 'allow')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`rule-${r.id}`}
                  disabled={locked}
                  checked={selections[r.id] === 'block'}
                  onChange={() => handleSelect(r.id, 'block')}
                />
              </td>
              <td>
                {showHints[r.id] ? (
                  <div className="hint-box">{hints[r.id]}</div>
                ) : (
                  <button
                    className="hint-button"
                    disabled={locked}
                    onClick={() => handleToggleHint(r.id)}
                  >
                    Vihje
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        {!checked ? (
          <button
            className="primary"
            onClick={handleCheck}
            disabled={Object.keys(selections).length !== rules.length}
          >
            Kontrolli valikuid
          </button>
        ) : locked ? (
          <button className="primary" onClick={handleNext}>
            Edasi
          </button>
        ) : (
          <button onClick={handleRetry}>Proovi uuesti</button>
        )}
      </div>

      {message.text && (
        <div className={`message ${message.type === 'success' ? 'message-correct' : 'message-incorrect'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}