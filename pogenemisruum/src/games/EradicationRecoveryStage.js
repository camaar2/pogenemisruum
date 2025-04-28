import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EradicationRecoveryStage.css';

const correctOrder = [
  "Puhasta nakatunud süsteem",
  "Paigalda turvapaigad",
  "Taasta varukoopiast",
  "Testi süsteemi enne taasliitmist võrku"
];

function EradicationRecoveryStage() {
  const [steps, setSteps] = useState(() => [...correctOrder].sort(() => Math.random() - 0.5));
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

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
      setMessage("Kõik tegevused on õiges järjekorras! Süsteemi taastamine õnnestus.");
      setIsLocked(true);
    } else {
      setMessage("Tegevused on valesti järjestatud. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSteps([...correctOrder].sort(() => Math.random() - 0.5));
    setMessage("");
  };

  const handleNext = () => {
    navigate("/finalreport");
  };

  return (
    <div className="eradication-recovery">
      <h1>3. ETAPP: Lahendamine ja Taastamine</h1>
      <p>Järjesta tegevused õiges järjekorras:</p>
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
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Kontrolli järjekorda</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        )}
        {isLocked && (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default EradicationRecoveryStage;
