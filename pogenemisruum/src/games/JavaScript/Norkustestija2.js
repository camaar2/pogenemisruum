import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija2.css';

const tools = [
  { id: 1, name: "Nmap", correctTarget: "network", explanation: "Nmap on võrguskanner, mis avastab avatud pordid ja teenused võrgu tasandil." },
  { id: 2, name: "Nikto", correctTarget: "web", explanation: "Nikto on veebiserveri skanner, mis tuvastab HTTP-teenuse haavatavusi." },
  { id: 3, name: "SQL Injector", correctTarget: "database", explanation: "SQL Injector testib andmebaasiserveri haavatavust SQL-injectionite suhtes." },
  { id: 4, name: "SMTP Checker", correctTarget: "mail", explanation: "SMTP Checker kontrollib meilisüsteemi konfiguratsiooni ja turvalisust." }
];

const targets = [
  { id: "network", label: "Võrguskaneerimine" },
  { id: "web", label: "Veebiserver" },
  { id: "database", label: "Andmebaasiserver" },
  { id: "mail", label: "Meilisüsteem" }
];

export default function Norkustestija2() {
  const navigate = useNavigate();
  const [placements, setPlacements] = useState({});
  const [pool, setPool] = useState([...tools]);
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState("");

  const scenario =
    "Sihikeskkonna kaardistamiseks on vaja valida ja asetada iga testitööriist sobivasse kategooriasse. " +
    "Igal tööriistal on konkreetne põhifunktsioon. " +
    "Õige paigutus tagab, et saame avastada haavatavusi igal tasandil.";

  const handleDragStart = (e, toolId) => {
    e.dataTransfer.setData("toolId", toolId);
  };
  const handleDragOver = e => e.preventDefault();

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (locked) return;
    const id = parseInt(e.dataTransfer.getData("toolId"), 10);
    setPlacements(prev => ({ ...prev, [id]: targetId }));
    setPool(prev => prev.filter(t => t.id !== id));
  };

  const handleCheck = () => {
    setChecked(true);
    const allCorrect = tools.every(t => placements[t.id] === t.correctTarget);
    if (allCorrect && Object.keys(placements).length === tools.length) {
      setFeedback("🎉 Kõik tööriistad asetatud õigesti! Võid jätkata järgmise etapi juurde.");
      setLocked(true);
    } else {
      const correctCount = tools.filter(t => placements[t.id] === t.correctTarget).length;
      setFeedback(
        `❌ ${correctCount}/${tools.length} tööriista asetatud õigesse kohta. ` +
        `Paranda valesid asetusi ja proovi uuesti.`
      );
    }
  };

  const handleReset = () => {
    setPlacements({});
    setPool([...tools]);
    setChecked(false);
    setLocked(false);
    setFeedback("");
  };

  const handleNext = () => navigate('/norkustestija3_leht');

  const containerClass =
    checked && feedback.startsWith('🎉')
      ? 'correct-bg'
      : checked
      ? 'incorrect-bg'
      : '';
  const feedbackClass = checked
    ? feedback.startsWith('🎉')
      ? 'message-correct'
      : 'message-incorrect'
    : '';

  return (
    <div className={`cyadvice-stage2 ${containerClass}`}>
      <h1>Tööriistade sobitamine sihtsüsteemidega</h1>
      <p className="scenario"><em>{scenario}</em></p>
      <p className="instructions">
        Loenda alltoodud neli tööriista ja tõmba igaüks sellesse sihtsüsteemi kohta, kus tema põhifunktsioon vastab sihtkeskkonnale:
        <ul className="criteria-list">
          <li><strong>Nmap →</strong> uurib avatud porte ja teenuseid.</li>
          <li><strong>Nikto →</strong> skaneerib HTTP/HTTPS teenust haavatavuste suhtes.</li>
          <li><strong>SQL Injector →</strong> testib SQL-süstide abil haavatavusi.</li>
          <li><strong>SMTP Checker → </strong> kontrollib ? süsteemi turvalisust ja konfiguratsiooni.</li>
        </ul>
        Kõigi tööriistade õige paigutus tagab, et saame tuvastada haavatavusi igal tehnilisel tasandil. Kui kõik neli on õigesse kohta lohistatud, klõpsa „Esita valikud“.
      </p>
      <div className="game-container">
        <div className="pool">
          <h2>Tööriistade komplekt</h2>
          {pool.map(tool => (
            <div
              key={tool.id}
              className="tool-card"
              draggable={!locked}
              onDragStart={e => handleDragStart(e, tool.id)}
            >
              {tool.name}
            </div>
          ))}
        </div>
        <div className="targets">
          <h2>Sihtsüsteemid</h2>
          {targets.map(t => {
            const tool = tools.find(tl => placements[tl.id] === t.id);
            let cls = 'target-zone';
            if (checked) {
              if (tool) cls += tool.correctTarget === t.id ? ' correct' : ' incorrect';
              else cls += ' empty';
            }
            return (
              <div
                key={t.id}
                className={cls}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, t.id)}
              >
                <h3>{t.label}</h3>
                {tool ? (
                  <div className="placed-tool">{tool.name}</div>
                ) : (
                  <div className="placeholder">Lohista tööriist siia</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleReset}>
          Alusta uuesti
        </button>
        {!checked ? (
          <button
            className="primary"
            onClick={handleCheck}
            disabled={Object.keys(placements).length !== tools.length}
          >
            Esita valikud
          </button>
        ) : locked ? (
          <button className="primary" onClick={handleNext}>
            Edasi
          </button>
        ) : (
          <button onClick={handleReset}>
            Proovi uuesti
          </button>
        )}
      </div>
      {feedback && <div className={`feedback ${feedbackClass}`}>{feedback}</div>}
      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {tools.map(item => (
              <li key={item.id}>
                <strong>{item.name}:</strong> {item.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
