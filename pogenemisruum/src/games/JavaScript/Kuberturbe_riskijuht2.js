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

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"));
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
    } else {
      setMessage("Vale järjekord! Paigalda uuendused pärast allalaadimist, mitte enne!");
    }
  };

  const handleReset = () => {
    setSteps([...correctOrder].sort(() => Math.random() - 0.5));
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate("/kuberturbe_riskijuht3");
  };

  return (
    <div className={`devops-stage2 ${isLocked ? 'correct-bg' : message && !isLocked ? 'incorrect-bg' : ''}`}>
      <h1>Turvauuenduste ja automaatika seadistamine</h1>
      <p>Järjesta käsud õiges järjekorras:</p>
      <ul className="steps-list">
        {steps.map((step, index) => (
          <li key={index}
              draggable={!isLocked}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}>
            {step}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Kontrolli järjekord</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Kuberturbe_riskijuht2;
