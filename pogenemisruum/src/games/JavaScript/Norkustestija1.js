import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija1.css';

const allSources = [
  { id: 1, title: "Avalik serverite info", isRelevant: true },
  { id: 2, title: "WHOIS info", isRelevant: true },
  { id: 3, title: "Subdomeeni otsing", isRelevant: true },
  { id: 4, title: "Võltsitud reklaamid", isRelevant: false },
  { id: 5, title: "Sotsiaalmeedia jälgimine", isRelevant: false },
  { id: 6, title: "Turvaraportid", isRelevant: true },
  { id: 7, title: "Blogi ja foorumid", isRelevant: false },
  { id: 8, title: "Avalikud turvaanalüüsid", isRelevant: true },
  { id: 9, title: "Tehniline audit", isRelevant: true }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function Norkustestija1() {
  const navigate = useNavigate();
  const [sources, setSources] = useState(() => shuffleArray(allSources).slice(0, 6));
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("");

  const scenario = "Sihtsüsteemi kaardistamine eeltööks, et hankida avalikke andmeid turvanõrkuste analüüsiks.";
  const correctCount = sources.filter(s => s.isRelevant).length;

  const toggleItem = id => {
    if (checked) return;
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleCheck = () => {
    setChecked(true);
    const correctIds = sources.filter(s => s.isRelevant).map(s => s.id).sort();
    const userIds = [...selected].sort();
    if (JSON.stringify(correctIds) === JSON.stringify(userIds)) {
      setMessage("Kogusid kõik olulised allikad! Liigu järgmisse etappi.");
      setLocked(true);
    } else {
      setMessage(
        `Õigeid allikaid: ${selected.filter(id => correctIds.includes(id)).length}, ` +
        `valesid valikuid: ${selected.filter(id => !correctIds.includes(id)).length}. Proovi uuesti.`
      );
    }
  };

  const handleReset = () => {
    setSources(shuffleArray(allSources).slice(0,6));
    setSelected([]);
    setChecked(false);
    setLocked(false);
    setMessage("");
  };

  const handleNext = () => navigate('/norkustestija2_leht');

  const containerClass = checked
    ? message.startsWith('Kogusid') ? 'correct-bg' : 'incorrect-bg'
    : '';
  const messageClass = checked
    ? message.startsWith('Kogusid') ? 'message-correct' : 'message-incorrect'
    : '';

  return (
    <div className={`cyadvice-stage1 ${containerClass}`}>
      <h1>Sihikeskkonna kaardistamine</h1>
      <p className="scenario"><em>{scenario}</em></p>
      <p className="description">
        Siin on {sources.length} avalikku allikat, millest {correctCount} aitavad 
        täpsete turvaandmete kogumisel (nt WHOIS, subdomeenid, avalikud auditid). 
        Vali need {correctCount} allikat, mis annavad usaldusväärse aluse haavatavuste analüüsiks.
      </p>
      <div className="sources">
        {sources.map(source => {
          let cls = 'source-item';
          if (checked) {
            if (source.isRelevant) {
              cls += selected.includes(source.id) ? ' selected-correct' : ' missed';
            } else if (selected.includes(source.id)) {
              cls += ' selected-incorrect';
            }
          } else if (selected.includes(source.id)) {
            cls += ' selected';
          }
          return (
            <div key={source.id} className={cls} onClick={() => toggleItem(source.id)}>
              {source.title}
            </div>
          );
        })}
      </div>
      <div className="buttons">
        {!checked ? (
          <button className="primary" onClick={handleCheck} disabled={selected.length===0}>
            Kontrolli valikuid
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
      {message && <div className={`message ${messageClass}`}>{message}</div>}
    </div>
  );
}
