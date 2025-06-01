import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sundmuste_reageerija3.css';

const correctOrder = [
  {
    text: "Esimene teade intsidentist turvameeskonnale",
    explanation: "Esimene teade tagab, et turvameeskond saab kohe ajaakohase ülevaate olukorrast."
  },
  {
    text: "Intsidenti hindamine ja prioriseerimine",
    explanation: "Intsidenti hindamine võimaldab määrata kriitilisuse taseme ning ressursse vastavalt."
  },
  {
    text: "Kriisi juhtimise meeskonna kutsumine",
    explanation: "Kriisi juhtimise meeskonna kaasamine tagab operatiivse koordineerimise ja otsustusvõime."
  },
  {
    text: "Täpsemad tehnilised analüüsid ja vastumeetmed",
    explanation: "Põhjalik tehniline analüüs aitab välja selgitada ründe põhjused ja rakendada tõhusaid lahendusi."
  }
];

function Sundmuste_reageerija3() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(() =>
    correctOrder.map(item => item.text).sort(() => Math.random() - 0.5)
  );
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (isLocked) return;
    const dragIndex = Number(e.dataTransfer.getData("dragIndex"));
    if (dragIndex === dropIndex) return;
    const newSteps = [...steps];
    const [draggedItem] = newSteps.splice(dragIndex, 1);
    newSteps.splice(dropIndex, 0, draggedItem);
    setSteps(newSteps);
  };

  const handleSubmit = () => {
    const current = steps.join();
    const correct = correctOrder.map(item => item.text).join();
    if (current === correct) {
      setFeedback("Intsidenti reageerimise tegevused on õigesti järjestatud!");
      setIsCorrect(true);
    } else {
      setFeedback("Vale järjekord! Proovi uuesti.");
      setIsCorrect(false);
    }
    setIsLocked(true);
  };

  const handleReset = () => {
    setSteps(correctOrder.map(item => item.text).sort(() => Math.random() - 0.5));
    setFeedback("");
    setIsLocked(false);
    setIsCorrect(false);
  };

  return (
    <div className={`incident-response ${isLocked ? (isCorrect ? "correct-bg" : "incorrect-bg") : ""}`}>
      <h2>Intsidendi reageerimise tegevuste järjestamine</h2>
      <p>Järjesta tegevused õiges järjekorras:</p>
      <ul className="steps-list">
        {steps.map((step, index) => (
          <li
            key={index}
            draggable={!isLocked}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {step}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={handleReset}>Alusta uuesti</button>
        {!isLocked ? (
          <button className="primary" onClick={handleSubmit}>Esita valikud</button>
        ) : (
          isCorrect && (
            <button className="primary" onClick={() => navigate('/sundmuste_reageerija4_leht')}>
              Edasi
            </button>
          )
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      {isLocked && isCorrect && (
        <div className="explanations">
          <h3>Selgitused:</h3>
          <ul>
            {correctOrder.map((item, i) => (
              <li key={i}>
                <strong>{item.text}:</strong> {item.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sundmuste_reageerija3;

