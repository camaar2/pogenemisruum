import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja3.css';

const tools = [
  { id: 1, name: "Virusetõrje tarkvara", correct: true, explanation: "Virusetõrje tarkvara skanneerib ja eemaldab pahavara enne süsteemi kahjustamist." },
  { id: 2, name: "Tulemüür", correct: true, explanation: "Tulemüür filtreerib võrguühendused, blokeerides pahatahtliku liikluse." },
  { id: 3, name: "USB autorun lubatud", correct: false, explanation: "USB autorun’i lubamine võib viia automaatsete pahavarainstallatsioonideni." },
  { id: 4, name: "Andmete varundussüsteem", correct: true, explanation: "Varundussüsteem tagab kriitiliste andmete taastamise rikke või ründe korral." },
  { id: 5, name: "Avalik Wi-Fi ilma VPN-ita", correct: false, explanation: "Avalik Wi-Fi ilma VPN-ita on ebaturvaline ja võib andmevahetust pealt kuulata." },
  { id: 6, name: "Sissetungituvastussüsteem (IDS)", correct: true, explanation: "IDS tuvastab kahtlased tegevused ja annab reaalajas hoiatusi potentsiaalsete rünnakute kohta." }
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

  const handleNext = () => navigate('/rakendaja4_leht');

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
          Lihtsuse ja tõhususe tagamiseks tuleb keskkonda valida vaid terviklikud ja toimivad kaitselahendused. Liiga paljude või sobimatute tööriistade kasutamine võib tekitada haldusraskusi või jätta turvavõrgustiku lüngad.
        </em>
      </p>
      <p className="instruction">
          Märgi <strong>{correctCount}</strong> tööriista, mis tagavad suures osas keskkonna kaitse:
      </p>
      <ul>
        <li>Eemalda viirused enne, kui need süsteemi kahjustavad.</li>
        <li>Filtreeri võrguliiklust, et blokeerida pahatahtlik ja volitamata liiklus.</li>
        <li>Säilita kriitilised andmed turvaliselt ja võimalda nende taastamist ründe või rikke korral.</li>
        <li>Tuvasta ja reageeri sissetungikatsetele ning anomaaliatele reaalajas.</li>
      </ul>
      <p className="instructions">
        Kui oled valinud õige tööriistade kombinatsiooni, klõpsa nupul “Esita valikud”.
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

      <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="reset" onClick={handleReset}>
          Alusta uuesti
        </button>
        {!checked ? (
          <button
            className="primary submit"
            onClick={handleSubmit}
            disabled={selectedTools.length !== correctCount}
          >
            Esita valikud
          </button>
        ) : locked ? (
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
        <div className={`message ${
          locked ? 'message-correct' : 'message-incorrect'
        }`}>
          {message}
        </div>
      )}

      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {tools.map(tool => (
              <li key={tool.id}>
                <strong>{tool.name}:</strong> {tool.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
