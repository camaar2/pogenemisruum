import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht1.css';

const allPossibleRules = [
  { id: 1, name: 'Veebiliiklus (HTTP/HTTPS)', correct: 'allow', hint: 'Veebilehitsemine toimub peamiselt sadamate 80 ja 443 kaudu.', explanation: "Veebilehitsemine peab olema lubatud, sest HTTPS krüpteerib andmeedastuse." },
  { id: 2, name: 'E-posti liiklus (SMTP)', correct: 'allow', hint: 'Sisse- ja väljaminev e-post liigub tavaliselt sadama 25 kaudu.', explanation: "E-post on äri toimimiseks hädavajalik ja töötab turvaliselt port 25-l." },
  { id: 3, name: 'Kahtlane port 666 (IRC)', correct: 'block', hint: 'Port 666 ei ole tavaline teenuseport ning võib peita pahatahtlikku tegevust.', explanation: "Port 666 pole tavakasutuses ja võib olla pahatahtlike rakenduste jaoks." },
  { id: 4, name: 'Turvaline SSH (port 22)', correct: 'allow', hint: 'SSH krüpteerib kogu liikluse ning töötab sadamal 22.', explanation: "SSH krüpteerib ühenduse julgeoleku tagamiseks." },
  { id: 5, name: 'Telnet (port 23)', correct: 'block', hint: 'Telnet edastab andmed lahtiselt ja töötab sadamal 23.', explanation: "Telnet ei krüpteeri andmeid ja seetõttu on see turvarisk." },
  { id: 6, name: 'DNS päringud (port 53)', correct: 'allow', hint: 'DNS „tõlgib“ nimesid IP-aadressideks sadama 53 kaudu.', explanation: "DNS on vajalik, et suunata domeeninimed õigele IP-aadressile." },
  { id: 7, name: 'FTP failiedastus (port 21)', correct: 'allow', hint: 'FTP ei ole krüpteeritud ning liigub sadamal 21.', explanation: "FTP võimaldab turvalist failiedastust, kui seda õigesti hallata." }
];

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
      setMessage({ text: '❌ Mõni valik on vale või puudub. Proovi uuesti.', type: 'error' });
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
    navigate('/infoturbe_juht2_leht');
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
          Infoturbe juhi ülesanne on vastutava korporatsiooni võrgu tulemüüri korrektselt konfigureerida. 
          Liiklusvoogude puhul tuleb igat protokolli hinnata kas lubamise või blokeerimise alusel, et tagada nii töökindlus kui turvalisus.
        </em>
      </p>
      <p className="instruction">
        Määrata tuleb, kas iga alljärgnev liiklus tuleks <strong>lubada</strong> või <strong>blokeerida</strong>:
      </p>

      <p className="instructions">
        Kui kõik valikud on tehtud, klõpsake nupul “Esita valikud”.
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
                  <div className="hint-box">{r.hint}</div>
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

      <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="reset" onClick={handleRetry}>
          Alusta uuesti
        </button>
        {!checked ? (
          <button
            className="primary"
            onClick={handleCheck}
            disabled={Object.keys(selections).length !== rules.length}
          >
            Esita valikud
          </button>
        ) : locked ? (
          <button className="primary" onClick={handleNext}>
            Edasi
          </button>
        ) : (
          <button className="primary" onClick={handleRetry}>
            Proovi uuesti
          </button>
        )}
      </div>

      {message.text && (
        <div className={`message ${message.type === 'success' ? 'message-correct' : 'message-incorrect'}`}>
          {message.text}
        </div>
      )}

      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {rules.map(r => (
              <li key={r.id}>
                <strong>{r.name}:</strong> {r.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
