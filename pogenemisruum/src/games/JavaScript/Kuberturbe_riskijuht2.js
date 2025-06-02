import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_riskijuht2.css';

function Kuberturbe_riskijuht2() {
  const navigate = useNavigate();
  
  const correctOrder = [
    "Lae uuendused alla",
    "Paigalda uuendused",
    "Taaskäivita teenused",
    "Kontrolli turvahoiatusi"
  ];

  const [steps, setSteps] = useState(() => [...correctOrder].sort(() => Math.random() - 0.5));
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"), 10);
    if (dragIndex === dropIndex) return;
    const newSteps = [...steps];
    const [draggedItem] = newSteps.splice(dragIndex, 1);
    newSteps.splice(dropIndex, 0, draggedItem);
    setSteps(newSteps);
  };

  const handleSubmit = () => {
    if (steps.join() === correctOrder.join()) {
      setMessage("Turvauuendused ja automaatika on õigesti seadistatud!");
      setIsLocked(true);
      setShowExplanation(true);
    } else {
      setMessage("Vale järjekord! Paigalda uuendused pärast allalaadimist, mitte enne!");
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setSteps([...correctOrder].sort(() => Math.random() - 0.5));
    setMessage("");
    setIsLocked(false);
    setShowExplanation(false);
  };

  const handleNext = () => {
    navigate("/kuberturbe_riskijuht3_leht");
  };

  return (
    <div className={`devops-stage2 ${isLocked ? 'correct-bg' : (message && !isLocked ? 'incorrect-bg' : '')}`}>
      <h1>Turvauuenduste ja automaatika seadistamine</h1>
      <p>Järjesta käsud õiges järjekorras. Kui oled valmis, vajuta „Esita valikud“.</p>
      <ul className="steps-list">
        {steps.map((step, index) => (
          <li
            key={index}
            draggable={!isLocked}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={isLocked ? (step === correctOrder[index] ? "correct-step" : "incorrect-step") : ""}
          >
            {step}
          </li>
        ))}
      </ul>

      {showExplanation && (
        <div className="explanation">
          <h3>Selgitus õigest järjekorrast:</h3>
          <ol>
            <li>
              <strong>Lae uuendused alla</strong> – kõigepealt tuleb uuenduste failid serverisse toimetada.
            </li>
            <li>
              <strong>Paigalda uuendused</strong> – seejärel installeeritakse allalaaditud paketid.
            </li>
            <li>
              <strong>Taaskäivita teenused</strong> – pärast paigaldamist tuleb teenused või server taaskäivitada, et uuendused jõustuksid.
            </li>
            <li>
              <strong>Kontrolli turvahoiatusi</strong> – lõpuks kontrolli, et kõik uuendused oleks paigal ja süsteem ei annaks vigu.
            </li>
          </ol>
          <p>
            Kui vahetad samme ümber (nt paigaldad enne allalaadimist või kontrollid enne teenuste taaskäivitamist), 
            ei jõustu uuendused õigesti ja süsteem võib töötada vanade versioonidega. 
          </p>
        </div>
      )}

      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset-button" onClick={handleReset}>
              Alusta uuesti
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Esita valikud
            </button>
          </>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Edasi
          </button>
        )}
      </div>

      {message && (
        <div className={`message ${isLocked ? "message-correct" : "message-incorrect"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Kuberturbe_riskijuht2;

