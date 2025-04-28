import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sundmuste_reageerija2.css';

function Sundmuste_reageerija2() {
  const options = [
    { id: 'A', text: "Operatsiooniline info", explanation: "Igapäevane teave, mida kasutatakse rutiinsete operatsioonide haldamiseks." },
    { id: 'B', text: "Strateegiline info", explanation: "Pikaajaline teave organisatsiooni suundade ja prioriteetide kohta." },
    { id: 'C', text: "Taktikaline info", explanation: "Konkreetne, lühiajaline teave intsidendi reageerimiseks." },
    { id: 'D', text: "Juhtimisinfo", explanation: "Ülevaade juhtimisprotsessidest, mis ei keskendu intsidendile." }
  ];

  const correctOption = "Strateegiline info";

  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    if (isLocked) return;
    setSelectedOption(option.text);
  };

  const handleSubmit = () => {
    const chosen = options.find(option => option.text === selectedOption);
    if (chosen && chosen.text === correctOption) {
      setFeedback(`Õige vastus! ${chosen.text} – ${chosen.explanation}`);
      setIsLocked(true);
    } else {
      setFeedback(`Vale vastus! Õige vastus on "Strateegiline info".`);
    }
  };

  const handleReset = () => {
    if (isLocked) return;
    setSelectedOption("");
    setFeedback("");
  };

  const finishGame = () => {
    navigate('/');
  };

  return (
    <div className="incident-communication-drill">
      <h2>Intsidendi kommunikatsiooni drill</h2>
      <p>Vali kommunikatsioonistrateegia, mida jagada partneritele intsidendi teavitamiseks:</p>
      <ul className="option-list">
        {options.map(option => (
          <li
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={selectedOption === option.text ? "selected" : ""}
            title={option.explanation}
          >
            <input 
              type="radio" 
              name="comm" 
              value={option.text} 
              checked={selectedOption === option.text}
              readOnly
            />
            {option.text}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Kontrolli valikut</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={finishGame}>Lõpeta mäng</button>
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Sundmuste_reageerija2;
