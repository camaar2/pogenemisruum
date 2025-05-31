import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sundmuste_reageerija3.css';

function Sundmuste_reageerija3() {
  const navigate = useNavigate();
  const correctOrder = [
    "Esimene teade intsidentist turvameeskonnale",
    "Intsidenti hindamine ja prioriseerimine",
    "Kriisi juhtimise meeskonna kutsumine",
    "Täpsemad tehnilised analüüsid ja vastumeetmed"
  ];

  const [steps, setSteps] = useState(() => [...correctOrder].sort(() => Math.random() - 0.5));
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("dragIndex"));
    if (dragIndex === dropIndex) return;
    const newSteps = [...steps];
    const [draggedItem] = newSteps.splice(dragIndex, 1);
    newSteps.splice(dropIndex, 0, draggedItem);
    setSteps(newSteps);
  };

  const handleSubmit = () => {
    if (steps.join() === correctOrder.join()) {
      setFeedback("Intsidenti reageerimise tegevused on õigesti järjestatud!");
      setIsLocked(true);
      setTimeout(() => {
        navigate('/incident-response-finale');
      }, 1000);
    } else {
      setFeedback("Vale järjekord! Õige järjekord täidetakse automaatselt...");
      setSteps(correctOrder);
      setIsLocked(true);
      setTimeout(() => {
        navigate('/sundmuste_reageerija4_leht');
      }, 1000);
    }
  };

  const handleReset = () => {
    setSteps([...correctOrder].sort(() => Math.random() - 0.5));
    setFeedback("");
    setIsLocked(false);
  };

  return (
    <div className={`incident-response ${isLocked ? "correct-bg" : feedback ? "incorrect-bg" : ""}`}>
      <h2>Intsidendi reageerimise tegevuste järjestamine</h2>
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
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Kontrolli järjekorda</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={() => navigate('/sundmuste_reageerija4')}>Edasi</button>
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Sundmuste_reageerija3;
