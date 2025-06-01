import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija2.css';

export default function Digi_toendite_uurija2() {
  const navigate = useNavigate();
  const logid = [
    { 
      id: 1, 
      line: '2023-05-01 08:15:23 - INFO - Süsteem käivitus edukalt', 
      anomaly: false,
      explanation: "See on tavaline käivitusteade, ei viita turvariskile."
    },
    { 
      id: 2, 
      line: '2023-05-01 08:16:10 - WARNING - Ebatavaline sisselogimine aadressilt 192.168.1.100', 
      anomaly: true,
      explanation: "Hoiatus rünnakukatsetest – ebatavaline sisselogimine võib viidata volitamata juurdepääsule."
    },
    { 
      id: 3, 
      line: '2023-05-01 08:17:55 - INFO - Planeeritud varukoopia lõpetatud', 
      anomaly: false,
      explanation: "Varukoopia õnnestus, ei ole turvarisk."
    },
    { 
      id: 4, 
      line: '2023-05-01 08:18:45 - ERROR - Mitu ebaõnnestunud sisselogimist tuvastatud', 
      anomaly: true,
      explanation: "Viga mitme vale sisselogimise kohta viitab keerulisele volitamata juurdepääsukatsele."
    },
    { 
      id: 5, 
      line: '2023-05-01 08:20:00 - INFO - Admin-kasutaja sisse logitud', 
      anomaly: false,
      explanation: "Legitiimne administraatori sisselogimine, pole anomaalia."
    }
  ];

  const [selected, setSelected] = useState({});
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');

  const handleSelect = id => {
    if (checked) return;
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    const totalAnomalies = logid.filter(l => l.anomaly).length;
    const correctCount = logid.filter(l => l.anomaly && selected[l.id]).length;
    const falsePositives = logid.filter(l => !l.anomaly && selected[l.id]).length;
    setChecked(true);
    if (correctCount === totalAnomalies && falsePositives === 0) {
      setMessage(`🎉 Tubli! Tuvastatud kõik ${totalAnomalies} anomaaliat.`);
    } else {
      setMessage(
        `❌ Tuvastatud õigesti ${correctCount}/${totalAnomalies}, ` +
        `valepositiivseid: ${falsePositives}. Kontollige ja proovi uuesti.`
      );
    }
  };

  const handleReset = () => {
    setSelected({});
    setChecked(false);
    setMessage('');
  };

  const handleNext = () => navigate('/digi_toendite_uurija3_leht');

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
    <div className={`log-anomaly ${containerClass}`}>
      <h1>Logianomaaliate tuvastamine</h1>
      <p className="scenario">
        <em>
          Logianalüüs on kriitiline samm turvaintsidentide avastamisel. Vali ainult need
          WARNING ja ERROR tasemel read, mis viitavad turvariskidele.
        </em>
      </p>
      <p className="instruction">
        Valida tuleb <strong>{logid.filter(l => l.anomaly).length}</strong> anomaalilist rida.
      </p>
      <table className="log-table">
        <thead>
          <tr>
            <th>Vali</th>
            <th>Logikirje</th>
          </tr>
        </thead>
        <tbody>
          {logid.map(log => {
            const isSel = !!selected[log.id];
            let rowClass = '';
            if (checked) {
              if (log.anomaly && isSel) rowClass = 'correct';
              else if (!log.anomaly && isSel) rowClass = 'incorrect';
              else if (log.anomaly && !isSel) rowClass = 'missed';
            } else if (isSel) {
              rowClass = 'selected';
            }
            return (
              <tr
                key={log.id}
                className={rowClass}
                onClick={() => handleSelect(log.id)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={isSel}
                    onChange={() => handleSelect(log.id)}
                    disabled={checked}
                  />
                </td>
                <td>{log.line}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttons">
        <button className="reset" onClick={handleReset}>
          Alusta uuesti
        </button>
        {!checked ? (
          <button
            className="primary submit"
            onClick={handleSubmit}
            disabled={Object.keys(selected).filter(id => selected[id]).length === 0}
          >
            Esita valikud
          </button>
        ) : message.startsWith('🎉') ? (
          <button className="primary next" onClick={handleNext}>
            Edasi
          </button>
        ) : (
          <button className="primary submit" onClick={handleSubmit}>
            Proovi uuesti
          </button>
        )}
      </div>
      {message && <div className={`message ${messageClass}`}>{message}</div>}
      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {logid.map(log => (
              <li key={log.id}>
                <strong>{log.line}:</strong> {log.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
