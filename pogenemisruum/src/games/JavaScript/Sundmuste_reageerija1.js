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

function generateInitialChoices() {
  const items = [...correctEvents, ...distractors];
  return items.sort(() => Math.random() - 0.5);
}

function Sundmuste_reageerija1() {
  const navigate = useNavigate();

  const [choices, setChoices] = useState(generateInitialChoices());
  const [slots, setSlots] = useState(Array(correctEvents.length).fill(null));
  const [slotStatus, setSlotStatus] = useState(Array(correctEvents.length).fill('neutral'));
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, index, source) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ index, source }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropInSlot = (e, slotIndex) => {
    e.preventDefault();
    if (isLocked) return;
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    let draggedItem = null;
    let updatedSlots = [...slots];
    
    if (data.source === "choices") {
      draggedItem = choices[data.index];
      const newChoices = choices.filter((item, i) => i !== data.index);
      setChoices(newChoices);
    } else if (data.source === "slots") {
      draggedItem = slots[data.index];
      updatedSlots[data.index] = null;
    }
    
    if (updatedSlots[slotIndex]) {
      setChoices(prev => [...prev, updatedSlots[slotIndex]]);
    }
    updatedSlots[slotIndex] = draggedItem;
    setSlots(updatedSlots);
  };

  const handleDropInChoices = (e) => {
    e.preventDefault();
    if (isLocked) return;
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (data.source === "slots") {
      const draggedItem = slots[data.index];
      const newSlots = [...slots];
      newSlots[data.index] = null;
      setSlots(newSlots);
      setChoices([...choices, draggedItem]);
    }
  };

  const checkOrder = () => {
    const newStatus = slots.map((item, index) =>
      item === correctEvents[index] ? "correct" : "wrong"
    );
    setSlotStatus(newStatus);

    if (newStatus.every(status => status === "correct")) {
      setMessage("Kõik intsidendid on õigesti prioritiseeritud!");
      setIsLocked(true);
    } else {
      setMessage("Vale järjekord. Proovi uuesti (roheline = õige, punane = vale).");
    }
  };

  const resetPuzzle = () => {
    setChoices(generateInitialChoices());
    setSlots(Array(correctEvents.length).fill(null));
    setSlotStatus(Array(correctEvents.length).fill('neutral'));
    setMessage("");
    setIsLocked(false);
  };

  return (
    <div className="incident-prioritization">
      <h1>Intsidendi prioriseerimise pusle</h1>
      <p>Lohista kriitiliseint sündmused õiges järjekorras (1. = kõige kriitilisem):</p>
      
      <div className="puzzle-container">
        {/* Slotid õige järjekorra jaoks */}
        <div className="slots">
          {slots.map((item, index) => (
            <div 
              key={index}
              className={`slot ${slotStatus[index]}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropInSlot(e, index)}
            >
              {item ? (
                <div 
                  draggable={!isLocked}
                  onDragStart={(e) => handleDragStart(e, index, "slots")}
                >
                  {item}
                </div>
              ) : (
                <span className="placeholder">Lohista siia (koht #{index+1})</span>
              )}
            </div>
          ))}
        </div>

        {/* Valikute ala */}
        <div 
          className="choices"
          onDragOver={handleDragOver}
          onDrop={handleDropInChoices}
        >
          <p>Valikud</p>
          <div className="choices-container">
            {choices.map((item, index) => (
              <div 
                key={index}
                className="choice"
                draggable={!isLocked}
                onDragStart={(e) => handleDragStart(e, index, "choices")}
              >
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
          <button onClick={() => alert("Mäng lõppenud!")}>
            Edasi
          </button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Sundmuste_reageerija1;
