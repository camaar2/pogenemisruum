import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija3.css';

export default function Norkustestija3() {
  const navigate = useNavigate();

  const scenario =
    "Vali õige näide rünnakust, mis sihtsüsteemis tõenäoliselt töötab, arvestades sisendi valideerimata mittekasutamist. " +
    "Süsteem lubab sisendi HTMLi, mistõttu script-alarm on võimalik XSS-i demonstreerimiseks.";

  const options = [
    { id: 'A', payload: "'; DROP TABLE users;--", description: "SQL Injection" },
    { id: 'B', payload: "<script>alert('XSS')</script>", description: "XSS (Cross-Site Scripting)" },
    { id: 'C', payload: "../../etc/passwd", description: "Path Traversal" },
    { id: 'D', payload: "", description: "Tühine sisend" }
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
      setMessage("🎉 Õige! XSS payload demonstreerib haavatavust edukalt.");
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
              if (opt.id === correctId) rowClass += isSelected ? ' selected-correct' : 'missed';
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
    </div>
  );
}