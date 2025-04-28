import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_riskijuht4.css';

function Kuberturbe_riskijuht4() {
  const options = [
    { id: 'A', text: "Blokeeri IP tulemüüri reeglites ja teavita turvameeskonda.", correct: true },
    { id: 'B', text: "Taaskäivita server, loodetavasti läheb paremaks.", correct: false },
    { id: 'C', text: "Ignoreeri, ehk ründaja tüdineb varsti.", correct: false },
    { id: 'D', text: "Sulge kõik ühendused, isegi legaalsed, ja lammuta süsteem.", correct: false }
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (id) => {
    if (isLocked) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    const chosen = options.find(option => option.id === selectedOption);
    if (chosen && chosen.correct) {
      setFeedback("Oled edukalt tõrjunud ründe! Süsteem töötab turvaliselt. Tubli töö, süsteemi admin!");
      setIsLocked(true);
    } else {
      setFeedback("Vale vastus! Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSelectedOption("");
    setFeedback("");
  };

  const finishGame = () => {
    navigate("/");
  };

  return (
    <div className="devops-stage4">
      <h1>Operatiivne reageerimine – ründe tõrjumine</h1>
      <p>IP 123.45.67.89 üritab pidevalt siseneda serverisse. Mida teed?</p>
      <div className="options">
        {options.map(option => (
          <div key={option.id} className="option">
            <label>
              <input 
                type="radio"
                name="response"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionSelect(option.id)}
                disabled={isLocked}
              />
              {option.text}
            </label>
          </div>
        ))}
      </div>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Esita vastus</button>
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

export default Kuberturbe_riskijuht4;
