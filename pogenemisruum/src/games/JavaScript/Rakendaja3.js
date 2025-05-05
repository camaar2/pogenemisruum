import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja3.css';

const tools = [
  { id: 1, name: "Virusetõrje tarkvara", correct: true },
  { id: 2, name: "Tulemüür", correct: true },
  { id: 3, name: "USB autorun lubatud", correct: false },
  { id: 4, name: "Andmete varundussüsteem", correct: true },
  { id: 5, name: "Avalik Wi-Fi ilma VPN-ita", correct: false },
  { id: 6, name: "Sissetungituvastussüsteem (IDS)", correct: true }
];

export default function Rakendaja3() {
  const navigate = useNavigate();
  const [selectedTools, setSelectedTools] = useState([]);
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState('');

  const correctCount = tools.filter(t => t.correct).length;

  const toggleTool = id => {
    if (locked) return;
    setSelectedTools(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setChecked(true);
    const correctIds = tools.filter(t => t.correct).map(t => t.id).sort();
    const sel = [...selectedTools].sort((a, b) => a - b);
    const ok = JSON.stringify(correctIds) === JSON.stringify(sel);
    setLocked(ok);
    setMessage(ok
      ? '🎉 Tubli! Kõik põhilised kaitsetööriistad on valitud.'
      : '❌ Mõni tööriist on vale või puudu. Proovi uuesti.'
    );
  };

  const handleReset = () => {
    setSelectedTools([]);
    setChecked(false);
    setLocked(false);
    setMessage('');
  };

  const handleNext = () => navigate('/rakendaja4');

  return (
    <div className={`tool-selection-game ${
        locked
          ? 'correct-bg'
          : checked
            ? 'incorrect-bg'
            : ''
      }`}>
      <h1>Turvatööriistade valik</h1>

      <p className="scenario">
        <em>
          Eesmärk on paigaldada vaid need tööriistad, mis tõeliselt tugevdavad
          teie keskkonna turvalisust. Liiga palju või valesid tööriistu võib
          tekitada keerukust või isegi turvaauke.
        </em>
      </p>

      <p className="instruction">
        Märgi <strong>{correctCount}</strong> tööriista, mis aitavad:
        <ul>
          <li>Tuua pahavara tuvastamise tasandisse, mis peatab viirused ja troojalased.</li>
          <li>Filtreerida võrguliiklust, blokeerides pahatahtlikud ühendused.</li>
          <li>Säilitada kriitilised andmed turvaliselt ja taastada need rikke korral.</li>
          <li>Tuvastada ja reageerida sissetungikatsetele reaalajas.</li>
        </ul>
      </p>

      <div className="tools-grid">
        {tools.map(tool => {
          let cls = '';
          if (checked) {
            if (tool.correct && selectedTools.includes(tool.id)) cls = 'correct';
            else if (tool.correct && !selectedTools.includes(tool.id)) cls = 'missed';
            else if (!tool.correct && selectedTools.includes(tool.id)) cls = 'incorrect';
          } else if (selectedTools.includes(tool.id)) {
            cls = 'selected';
          }
          return (
            <div
              key={tool.id}
              className={`tool-card ${cls}`}
              onClick={() => toggleTool(tool.id)}
            >
              <input
                type="checkbox"
                checked={selectedTools.includes(tool.id)}
                readOnly
              />
              {tool.name}
            </div>
          );
        })}
      </div>

      <div className="buttons">
        {!checked ? (
          <button
            className="primary"
            onClick={handleSubmit}
            disabled={selectedTools.length !== correctCount}
          >
            Kontrolli valikuid
          </button>
        ) : locked ? (
          <button className="primary" onClick={handleNext}>Edasi</button>
        ) : (
          <button onClick={handleReset}>Alusta uuesti</button>
        )}
      </div>

      {message && (
        <div className={`message ${
          locked
            ? 'message-correct'
            : 'message-incorrect'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}