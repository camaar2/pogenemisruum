import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik4.css';

const correctChain = [
  "Järeleluurimine",
  "Relvastamine",
  "Levitamine",
  "Eksploitatsioon",
  "Paigaldamine",
  "Käsklus ja Juhtimine",
  "Eesmärkide täitmine"
];
const distractors = [
  "Puhastamine",
  "Tulu realiseerimine",
  "Sotsiaalmeedia püsitus"
];

function generatePuzzleItems() {
  const allItems = [...correctChain, ...distractors];
  for (let i = allItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
  }
  return allItems;
}

function Kuberturbe_ohuanaluutik4() {
  const navigate = useNavigate();
  const [pool, setPool] = useState(generatePuzzleItems());
  const [slots, setSlots] = useState(Array(7).fill(null));
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };
  const handleDragOver = e => e.preventDefault();

  const handleDropInSlot = (e, index) => {
    e.preventDefault(); if (isLocked) return;
    const item = e.dataTransfer.getData("text/plain");
    let newPool = [...pool];
    let newSlots = [...slots];

    if (newPool.includes(item)) {
      newPool = newPool.filter(i => i !== item);
    } else {
      const prev = newSlots.indexOf(item);
      if (prev >= 0) newSlots[prev] = null;
    }
    if (newSlots[index]) newPool.push(newSlots[index]);

    newSlots[index] = item;
    setPool(newPool);
    setSlots(newSlots);
  };

  const handleDropInPool = e => {
    e.preventDefault(); if (isLocked) return;
    const item = e.dataTransfer.getData("text/plain");
    let newSlots = [...slots];
    const idx = newSlots.indexOf(item);
    if (idx >= 0) {
      newSlots[idx] = null;
      setSlots(newSlots);
      setPool(prev => [...prev, item]);
    }
  };

  const handleCheckOrder = () => {
    if (slots.some(s => !s)) {
      setMessage("Mõni koht on tühi. Aseta kõik 7 etappi järjekasti.");
      return;
    }
    const allCorrect = slots.every((s, i) => s === correctChain[i]);
    if (allCorrect) {
      setMessage("Tubli! Kõik ründe ahela etapid on õiges järjekorras.");
      setIsLocked(true);
    } else {
      setMessage("Vale järjekord! Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setPool(generatePuzzleItems());
    setSlots(Array(7).fill(null));
    setMessage("");
    setIsLocked(false);
  };

  const containerClass = isLocked
    ? message.startsWith('Tubli') ? 'correct-bg' : 'incorrect-bg'
    : message ? 'incorrect-bg' : '';

  const messageClass = message.startsWith('Tubli') ? 'message-correct' : 'message-incorrect';

  return (
    <div className={`killchain-game ${containerClass}`}>
      <h1>Ründe ahela etappide kokkupanek</h1>
      <p className="instructions">
        Sul on 7 põhisammu ründe ahelas ja mõned segajad. Lohista sammud allpool asuvast saadaolevate valikute kastist oma õigetesse kohtadesse vasakusse paneeli. Üleliigsed etapid jäta saadaolevate hulka.
      </p>
      <div className="game-container">
        <div className="slots-panel" onDragOver={handleDragOver} onDrop={e => e.preventDefault()}>
          <h3>Etappide järjekord</h3>
          <div className="slots">
            {slots.map((item, idx) => (
              <div key={idx} className="slot" onDrop={e => handleDropInSlot(e, idx)} onDragOver={handleDragOver}>
                {item ? (
                  <div
                    className="chain-item"
                    draggable={!isLocked}
                    onDragStart={e => handleDragStart(e, item)}
                  >{item}</div>
                ) : (
                  <div className="placeholder">Etapp {idx + 1}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="pool" onDragOver={handleDragOver} onDrop={handleDropInPool}>
          <h3>Saadaolevad etapid</h3>
          <div className="pool-items">
            {pool.map(item => (
              <div
                key={item}
                className="chain-item"
                draggable={!isLocked}
                onDragStart={e => handleDragStart(e, item)}
              >{item}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="primary" onClick={handleCheckOrder}>Kontrolli järjekorda</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button className="primary" onClick={() => navigate('/')}>Lõpeta mänguseeria</button>
        )}
      </div>
      {message && <div className={`message ${messageClass}`}>{message}</div>}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik4;