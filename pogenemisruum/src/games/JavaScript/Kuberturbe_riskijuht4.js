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
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (id) => {
    if (isLocked) return;
    setSelectedOption(id);
    setFeedback("");
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    const chosen = options.find(option => option.id === selectedOption);
    if (chosen && chosen.correct) {
      setFeedback("Oled edukalt tõrjunud ründe! Süsteem töötab turvaliselt. Tubli töö!");
      setIsLocked(true);
      setShowExplanation(true);
    } else {
      setFeedback("Vale valik! Proovi uuesti.");
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setSelectedOption("");
    setFeedback("");
    setShowExplanation(false);
    setIsLocked(false);
  };

  const finishGame = () => {
    navigate("/");
  };

  return (
    <div className={`devops-stage4 ${isLocked ? 'correct-bg' : (feedback && !isLocked ? 'incorrect-bg' : '')}`}>
      <h1>Operatiivne reageerimine – ründe tõrjumine</h1>
      <p>IP 123.45.67.89 üritab pidevalt siseneda serverisse. Mida teed? Kui oled valmis, vajuta „Esita valikud“.</p>

      <div className="options">
        {options.map(option => (
          <div key={option.id} className={`option ${selectedOption === option.id ? 'selected' : ''}`}>
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

      {showExplanation && (
        <div className="explanation">
          <h3>Selgitus:</h3>
          <p>
            <strong>Blokeeri IP tulemüüri reeglites ja teavita turvameeskonda.</strong> on õige valik, sest ründeallika IP blokeerimine peatab kohe ebaseadusliku juurdepääsu katse. Samuti annab turvameeskonna teavitamine võimaluse jälgida ründe allikat ja võtta vastu täiendavad meetmed.
          </p>
          <p>
            <em>Miks teised valikud ei sobi:</em>
          </p>
          <ul>
            <li><em>Taaskäivita server, loodetavasti läheb paremaks.</em> – see ei lahenda ründe allikat, ründaja võib jätkata samast IP-st.</li>
            <li><em>Ignoreeri, ehk ründaja tüdineb varsti.</em> – passiivne lähenemine jätab süsteemi avatud turvaprobleemile ja rünnak võib muutuda ulatuslikumaks.</li>
            <li><em>Sulge kõik ühendused, isegi legaalsed, ja lammuta süsteem.</em> – liigtõhus ja katkestab ka legaalse liikluse, põhjustades segadust ja tööseisakuid.</li>
          </ul>
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
          <button className="finish-button" onClick={finishGame}>
            Lõpeta mäng
          </button>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${isLocked ? "message-correct" : "message-incorrect"}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default Kuberturbe_riskijuht4;

