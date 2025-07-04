import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sundmuste_reageerija1.css';

const correctEvents = [
  "Massiline andmeleke",
  "Ründegrupi tegevus rahvusvahelisel tasandil",
  "Tsentraliseeritud serveri rünnak",
  "Siseministeeriumi infosüsteemi rünnak"
];

const distractors = [
  "Eksitav turvahoiatus",
  "Väike sisemine rike"
];

const explanations = {
  "Massiline andmeleke": "Massiline andmeleke mõjutab suurt hulka kasutajaid ja tekitab tõsised õiguslikud tagajärjed.",
  "Ründegrupi tegevus rahvusvahelisel tasandil": "Rahvusvaheline ründegrupp võib koordineeritult rünnata mitut organisatsiooni, suurendades kriitilisust.",
  "Tsentraliseeritud serveri rünnak": "Tsentraliseeritud serveri rünnak võib ohustada kogu infrastruktuuri, kuna paljud teenused sõltuvad ühest serverist.",
  "Siseministeeriumi infosüsteemi rünnak": "Siseministeeriumi infosüsteemi rünnak mõjutab riigi julgeolekut ja seega on kõrgeim kriitilisus.",
  "Eksitav turvahoiatus": "Turvahoiatus, mis osutub valehäireks, ei vaja kõrget priiseerimist.",
  "Väike sisemine rike": "Väike sisemine rike, mis ei mõjuta kriitilisi teenuseid, on madala tähtsusega sündmus."
};

function generateInitialChoices() {
  return [...correctEvents, ...distractors].sort(() => Math.random() - 0.5);
}

function Sundmuste_reageerija1() {
  const navigate = useNavigate();
  const [choices, setChoices] = useState(generateInitialChoices());
  const [slots, setSlots] = useState(Array(correctEvents.length).fill(null));
  const [status, setStatus] = useState(Array(correctEvents.length).fill('neutral'));
  const [message, setMessage] = useState('');
  const [locked, setLocked] = useState(false);

  const handleDragStart = (e, index, source) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ index, source }));
    e.dataTransfer.clearData('text/plain');
  };

  const handleDragOver = e => e.preventDefault();

  const extractDragData = e => {
    const payload = e.dataTransfer.getData('application/json');
    if (!payload) return null;
    try {
      return JSON.parse(payload);
    } catch {
      return null;
    }
  };

  const handleDropSlot = (e, idx) => {
    e.preventDefault();
    if (locked) return;

    const data = extractDragData(e);
    if (!data) return;

    const { index, source } = data;
    let item;
    const newSlots = [...slots];
    if (source === 'choices') {
      item = choices[index];
      setChoices(c => c.filter((_, i) => i !== index));
    } else {
      item = slots[index];
      newSlots[index] = null;
    }
    if (newSlots[idx]) {
      setChoices(c => [...c, newSlots[idx]]);
    }
    newSlots[idx] = item;
    setSlots(newSlots);
  };

  const handleDropChoices = e => {
    e.preventDefault();
    if (locked) return;

    const data = extractDragData(e);
    if (!data) return;

    const { index, source } = data;
    if (source === 'slots') {
      const item = slots[index];
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setChoices(c => [...c, item]);
    }
  };

  const checkOrder = () => {
    const newStatus = slots.map((it, i) => it === correctEvents[i] ? 'correct' : 'wrong');
    setStatus(newStatus);
    if (newStatus.every(s => s === 'correct')) {
      setMessage('Tubli! Kõik intsidendid prioritiseeritud õigesti.');
      setLocked(true);
    } else {
      setMessage('Mõni koht on vale. Roheline = õige, punane = vale.');
    }
  };

  const reset = () => {
    setChoices(generateInitialChoices());
    setSlots(Array(correctEvents.length).fill(null));
    setStatus(Array(correctEvents.length).fill('neutral'));
    setMessage('');
    setLocked(false);
  };

  return (
    <div className={`risk-prioritization ${locked
        ? (message.startsWith('Tubli') ? 'correct-bg' : 'incorrect-bg')
        : ''}`}>
      <h1>Intsidendi prioritiseerimise pusle</h1>
      <div className="instructions">
        <p>
          Lohista sündmused õigesse järjekorda (1 = kõrgeim kriitilisus). 
          Kokku on <strong>{correctEvents.length}</strong> intsidendi kategooriat. Kui oled valmis, vajuta „Esita valikud“.
        </p>
      </div>
      <div className="puzzle-container">
        <div className="slots">
          {slots.map((it, i) => (
            <div
              key={i}
              className={`slot ${status[i]}`}
              onDragOver={handleDragOver}
              onDrop={e => handleDropSlot(e, i)}
            >
              {it ? (
                <div
                  draggable={!locked}
                  onDragStart={e => handleDragStart(e, i, 'slots')}
                >
                  {it}
                </div>
              ) : (
                <span className="placeholder">koht #{i + 1}</span>
              )}
            </div>
          ))}
        </div>
        <div
          className="choices"
          onDragOver={handleDragOver}
          onDrop={handleDropChoices}
        >
          <p>Valikud</p>
          <div className="choices-container">
            {choices.map((it, i) => (
              <div
                key={i}
                className="choice"
                draggable={!locked}
                onDragStart={e => handleDragStart(e, i, 'choices')}
              >
                {it}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={reset}>Alusta uuesti</button>
        {!locked ? (
          <button className="primary" onClick={checkOrder}>Esita valikud</button>
        ) : (
          <button className="primary" onClick={() => navigate('/sundmuste_reageerija2_leht')}>
            Edasi
          </button>
        )}
      </div>
      {message && (
        <div className={`message ${message.startsWith('Tubli') ? 'message-correct' : 'message-incorrect'}`}>
          {message}
        </div>
      )}
      {locked && (
        <div className="explanations">
          <h2>Selgitused valikute kohta:</h2>
          <ul>
            {slots.map((it, i) => (
              <li key={i}>
                <strong>{it}:</strong> {explanations[it]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sundmuste_reageerija1;
