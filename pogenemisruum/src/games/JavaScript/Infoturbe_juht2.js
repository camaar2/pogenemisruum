import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht2.css';

const correctOrder = [
  "Install viirusetõrje",
  "Luba reaalajas skaneerimine",
  "Värskenda turvabaas",
  "Keela tundmatud manusfailid"
];
const distractors = [
  "Luba automaatne uuendus",
  "Reklaami blokeerimine"
];

function shuffle(arr) {
  return arr
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const Infoturbe_juht2 = () => {
  const navigate = useNavigate();
  const [choices, setChoices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [slotStatus, setSlotStatus] = useState([]);
  // message: { text, type }
  const [message, setMessage] = useState({ text: '', type: '' });
  const [hint, setHint] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const all = shuffle([...correctOrder, ...distractors]);
    setChoices(all);
    setSlots(Array(correctOrder.length).fill(null));
    setSlotStatus(Array(correctOrder.length).fill('neutral'));
  }, []);

  const onDragStart = (e, index, source) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ index, source }));
  };
  const onDragOver = e => e.preventDefault();

  const onDropSlot = (e, slotIndex) => {
    e.preventDefault();
    const { index, source } = JSON.parse(e.dataTransfer.getData('application/json'));
    setSlots(prevSlots => {
      const newSlots = [...prevSlots];
      let draggedItem;
      if (source === 'choices') {
        draggedItem = choices[index];
      } else {
        draggedItem = prevSlots[index];
        newSlots[index] = null;
      }
      if (newSlots[slotIndex]) setChoices(prev => [...prev, newSlots[slotIndex]]);
      newSlots[slotIndex] = draggedItem;
      return newSlots;
    });
    if (source === 'choices') setChoices(prev => prev.filter((_, i) => i !== index));
    setSlotStatus(Array(correctOrder.length).fill('neutral'));
    setMessage({ text: '', type: '' });
    setHint('');
  };

  const onDropChoices = e => {
    e.preventDefault();
    const { index, source } = JSON.parse(e.dataTransfer.getData('application/json'));
    if (source === 'slots') {
      setSlots(prev => {
        const newSlots = [...prev];
        const item = newSlots[index];
        newSlots[index] = null;
        setChoices(prevC => [...prevC, item]);
        return newSlots;
      });
      setSlotStatus(Array(correctOrder.length).fill('neutral'));
      setMessage({ text: '', type: '' });
      setHint('');
    }
  };

  const checkOrder = () => {
    const status = slots.map((item, i) => (item === correctOrder[i] ? 'correct' : 'wrong'));
    setSlotStatus(status);
    if (slots.includes(null)) {
      setMessage({ text: 'Täida kõik kastid enne kontrolli.', type: 'error' });
      return;
    }
    if (status.every(s => s === 'correct')) {
      setMessage({ text: 'Tubli! Turvatarkvara on õigesti paigaldatud.', type: 'success' });
      setIsLocked(true);
    } else {
      setMessage({ text: 'On mõned valed sammud.', type: 'error' });
      if (slots[0] !== 'Install viirusetõrje') {
        setHint('Kas antivirus installitakse ikka esimesena? Kontrolli algust.');
      } else if (choices.length > 0) {
        setHint('Mõni lisavalik on endiselt alles: need kaks ei kuulu mängu.');
      } else {
        setHint('Kui sammud tunduvad õiged, kontrolli kindlasti võrgu turvaseadeid.');
      }
    }
  };

  const resetPuzzle = () => {
    const all = shuffle([...correctOrder, ...distractors]);
    setChoices(all);
    setSlots(Array(correctOrder.length).fill(null));
    setSlotStatus(Array(correctOrder.length).fill('neutral'));
    setMessage({ text: '', type: '' });
    setHint('');
    setIsLocked(false);
  };

  return (
    <div className="software-puzzle">
      <h1>Turvatarkvara paigaldamine</h1>
      <p className="storyline">
        Sa oled küberanalüütik aastal 2030, vastutades korporatsiooni kriitilise tarkvaratarnete eest. Korrigeeri sammude järjekorda, et kaitse oleks maksimaalne – ära unusta, et kahest üleliigsest sammust peab loobuma.
      </p>

      <div className="puzzle-container">
        <div className="slots" onDragOver={onDragOver} onDrop={onDropChoices}>
          {slots.map((item, i) => (
            <div key={i} className={`slot ${slotStatus[i]}`} draggable={!isLocked && !!item}
                 onDragStart={e => onDragStart(e, i, 'slots')} onDragOver={onDragOver}
                 onDrop={e => onDropSlot(e, i)}>
              {item || <span className="placeholder">Lohista siia</span>}
            </div>
          ))}
        </div>
        <div className="choices" onDragOver={onDragOver} onDrop={onDropChoices}>
          <p>Valikud</p>
          <div className="choices-container">
            {choices.map((item, i) => (
              <div key={i} className="choice" draggable={!isLocked}
                   onDragStart={e => onDragStart(e, i, 'choices')}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={checkOrder}>Kontrolli järjekord</button>
            <button onClick={resetPuzzle}>Alusta uuesti</button>
          </>
        ) : (
          <button className="next-button" onClick={() => navigate('/infoturbe_juht3')}>
            Edasi
          </button>
        )}
      </div>

      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
      {hint && <div className="hint-box" style={{ marginTop: '10px' }}>{hint}</div>}
    </div>
  );
};

export default Infoturbe_juht2;