import React, { useState } from 'react';
import '../CSS/Kuberturbe_ohuanaluutik4.css';

const correctChain = [
  "Reconnaissance",
  "Weaponization",
  "Delivery",
  "Exploitation",
  "Installation",
  "Command & Control",
  "Actions on Objectives"
];

const distractors = [
  "Cleanup",
  "Profit Realization",
  "Persistence on Social Media"
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
  const [pool, setPool] = useState(generatePuzzleItems());
  const [slots, setSlots] = useState(Array(7).fill(null));
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropInSlot = (e, index) => {
    e.preventDefault();
    if (isLocked) return;
    const item = e.dataTransfer.getData("text/plain");

    let newPool = [...pool];
    let draggedItem = null;

    const poolIndex = newPool.indexOf(item);
    if (poolIndex >= 0) {
      draggedItem = item;
      newPool.splice(poolIndex, 1);
    } else {
      let newSlots = [...slots];
      const foundIndex = newSlots.indexOf(item);
      if (foundIndex >= 0) {
        draggedItem = item;
        newSlots[foundIndex] = null;
      }
      setSlots(newSlots);
    }
    if (!draggedItem) return;

    let newSlots = [...slots];
    if (newSlots[index]) {
      newPool.push(newSlots[index]);
    }
    newSlots[index] = draggedItem;

    setPool(newPool);
    setSlots(newSlots);
  };

  const handleDropInPool = (e) => {
    e.preventDefault();
    if (isLocked) return;

    const item = e.dataTransfer.getData("text/plain");
    let newSlots = [...slots];
    const foundIndex = newSlots.indexOf(item);
    if (foundIndex >= 0) {
      newSlots[foundIndex] = null;
      setPool(prev => [...prev, item]);
      setSlots(newSlots);
    }
  };

  const handleCheckOrder = () => {
    if (slots.some(s => !s)) {
      setMessage("Mõni slot on tühi. Paiguta kõik 7 etappi.");
      return;
    }
    for (let i = 0; i < 7; i++) {
      if (slots[i] !== correctChain[i]) {
        setMessage("Vale järjekord! Proovi uuesti.");
        return;
      }
    }
    setMessage("Kõik kill chain etapid on õigesti paigutatud!");
    setIsLocked(true);
  };

  const handleReset = () => {
    setPool(generatePuzzleItems());
    setSlots(Array(7).fill(null));
    setMessage("");
    setIsLocked(false);
  };

  return (
    <div className={`killchain-game ${
      isLocked 
        ? (message.includes("Kõik kill") ? "correct-bg" : "") 
        : (message.includes("Vale") || message.includes("tühi")) 
        ? "incorrect-bg" : ""
    }`}>
      <h2>Kill Chain Assembly Game</h2>
      <p>Aseta ründe kill chain etapid õiges järjekorras (Distraktoreid võib ignoreerida!):</p>
      <div className="game-container">
        
        {/* Vasak veerg: slotid */}
        <div className="slots-panel"
             onDragOver={handleDragOver}>
          <h3>Etappide slotid</h3>
          <div className="slots">
            {slots.map((item, index) => (
              <div key={index}
                   className="slot"
                   onDrop={(e) => handleDropInSlot(e, index)}>
                {item ? (
                  <div className="chain-item"
                       draggable={!isLocked}
                       onDragStart={(e) => handleDragStart(e, item)}>
                    {item}
                  </div>
                ) : (
                  <div className="placeholder">Slot #{index+1}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Parem veerg: pool valikuid */}
        <div className="pool"
             onDragOver={handleDragOver}
             onDrop={handleDropInPool}>
          <h3>Saadaolevad etapid</h3>
          {pool.map(item => (
            <div key={item}
                 className="chain-item"
                 draggable={!isLocked}
                 onDragStart={(e) => handleDragStart(e, item)}>
              {item}
            </div>
          ))}
        </div>
      
      </div>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleCheckOrder}>Kontrolli järjekorda</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={() => alert("Mäng lõpetatud!")}>Lõpeta mäng</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik4;
