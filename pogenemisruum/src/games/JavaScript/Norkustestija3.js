import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija3.css';

export default function Norkustestija3() {
  const navigate = useNavigate();

  const scenario =
    "Sihtsüsteem lubab sisendi HTML-i valideerimata kujul, mis tähendab, et kasutaja sisend võib sisaldada pahatahtlikku koodi. " +
    "Selle etapi eesmärk on valida õige ründetüüp ja payload. ";

  const options = [
    { id: 'A', payload: "'; DROP TABLE users;--", description: "SQL Injection", explanation: "SQL-injection ei tööta, kuna sihtsüsteem lubab ainult HTML-i sisendit, mitte SQL-päringuid." },
    { id: 'B', payload: "<script>alert('XSS')</script>", description: "XSS (Cross-Site Scripting)", explanation: "Õige! XSS-payload demonstreerib, et sisend pole puhastatud ja skript käivitub." },
    { id: 'C', payload: "../../etc/passwd", description: "Path Traversal", explanation: "Path Traversal ei tööta, sest failisüsteemile juurdepääs pole lubatud – süsteem töötleb sisendi HTMLina." },
    { id: 'D', payload: "", description: "Tühine sisend", explanation: "Tühine sisend ei näita haavatavust, sest see ei anna demonstratsiooni XSS-ist." }
  ];

  const correctId = 'B';
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');

  const handleSelect = id => {
    if (checked) return;
    setSelected(id);
  };

  const handleSubmit = () => {
    setChecked(true);
    if (selected === correctId) {
      setMessage("🎉 Õige! XSS-payload demonstreerib haavatavust edukalt.");
    } else {
      setMessage("❌ Vale valik. Proovi uuesti sobiva XSS näitega.");
    }
  };

  const handleReset = () => {
    setSelected('');
    setChecked(false);
    setMessage('');
  };

  const handleNext = () => navigate('/norkustestija4_leht');

  const containerClass =
    checked && message.startsWith('🎉')
      ? 'correct-bg'
      : checked
      ? 'incorrect-bg'
      : '';
  const messageClass = checked
    ? message.startsWith('🎉')
      ? 'message-correct'
      : 'message-incorrect'
    : '';

  return (
    <div className={`cyadvice-stage3 ${containerClass}`}>
      <h1>Ründe ärakasutamise demonstratsioon</h1>
      <p className="scenario"><em>{scenario}</em></p>

      <p className="instructions">
        Vaata tabelist erinevaid rünnetüüpe ja nende payload'e. Sinu ülesanne on:
        <ul className="criteria-list">
          <li><strong>Leida rünne, mis töötab antud süsteemis,</strong> kus sisend ei puhasta HTMLi.</li>
          <li><strong>Valida sobiv payload,</strong> kus skript käivitub brauseris.</li>
          <li><strong>Vältida ründeid,</strong> mis nõuavad SQL-pääsu või failisüsteemile ligipääsu, kuna need seal ei tööta.</li>
        </ul>
        Klõpsa real, et valida ründe tüüp ja seejärel vajuta „Esita valik“.
      </p>

      <table className="options-table">
        <thead>
          <tr>
            <th>Vali</th>
            <th>Ründe tüüp</th>
            <th>Payload</th>
          </tr>
        </thead>
        <tbody>
          {options.map(opt => {
            const isSelected = selected === opt.id;
            let rowClass = 'option-row';
            if (checked) {
              if (opt.id === correctId) rowClass += isSelected ? ' selected-correct' : ' missed';
              else if (isSelected) rowClass += ' selected-incorrect';
            } else if (isSelected) {
              rowClass += ' selected';
            }
            return (
              <tr
                key={opt.id}
                className={rowClass}
                onClick={() => handleSelect(opt.id)}
              >
                <td>
                  <input
                    type="radio"
                    name="exploit"
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => handleSelect(opt.id)}
                    disabled={checked}
                  />
                </td>
                <td>{opt.description}</td>
                <td>{opt.payload || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="buttons">
        <button onClick={handleReset}>
          Alusta uuesti
        </button>
        {!checked ? (
          <button
            className="primary"
            onClick={handleSubmit}
            disabled={!selected}
          >
            Esita valik
          </button>
        ) : message.startsWith('🎉') ? (
          <button className="primary" onClick={handleNext}>
            Edasi
          </button>
        ) : (
          <button onClick={handleReset}>Proovi uuesti</button>
        )}
      </div>

      {message && <div className={`message ${messageClass}`}>{message}</div>}

      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {options.map(opt => (
              <li key={opt.id}>
                <strong>{opt.description}:</strong> {opt.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
