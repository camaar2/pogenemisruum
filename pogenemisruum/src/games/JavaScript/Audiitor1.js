import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor1.css';

const allRisks = [
  { id: 1, name: "Andmeleke", isRelevant: true },
  { id: 2, name: "IT-süsteemi seisak", isRelevant: true },
  { id: 3, name: "Reputatsioonikahju", isRelevant: true },
  { id: 4, name: "Füüsiline rünnak", isRelevant: false },
  { id: 5, name: "Võrgu ülekoormus", isRelevant: false },
  { id: 6, name: "Kasutajate segadus", isRelevant: false }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateRiskOptions() {
  const correctRisks = allRisks.filter(r => r.isRelevant);
  const distractors = allRisks.filter(r => !r.isRelevant);

  const subsetSize = Math.floor(Math.random() * 2) + 4;
  const selected = [...correctRisks];
  shuffleArray(distractors);

  let i = 0;
  while (selected.length < subsetSize && i < distractors.length) {
    selected.push(distractors[i]);
    i++;
  }
  return shuffleArray(selected);
}

function Audiitor1() {
  const navigate = useNavigate();
  const [riskOptions, setRiskOptions] = useState(generateRiskOptions());
  const [selectedRisks, setSelectedRisks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const correctRiskIds = allRisks.filter(r => r.isRelevant).map(r => r.id);

  const toggleRisk = (id) => {
    if (isLocked) return;
    if (selectedRisks.includes(id)) {
      setSelectedRisks(selectedRisks.filter(r => r !== id));
    } else {
      setSelectedRisks([...selectedRisks, id]);
    }
  };

  const isSelectionCorrect = () => {
    const sortedSelected = [...selectedRisks].sort();
    const sortedCorrect = [...correctRiskIds].sort();
    return (
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((val, idx) => val === sortedCorrect[idx])
    );
  };

  useEffect(() => {
    if (selectedRisks.length > 0 && !isSelectionCorrect()) {
      setFeedback("Vale valik! Õiged riskid valitakse automaatselt...");
      const timer = setTimeout(() => {
        setSelectedRisks(correctRiskIds);
        setFeedback("");
        setIsLocked(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setFeedback("");
    }
  }, [selectedRisks]);

  const handleReset = () => {
    setRiskOptions(generateRiskOptions());
    setSelectedRisks([]);
    setFeedback("");
    setIsLocked(false);
  };

  const handleNext = () => {
    if (isSelectionCorrect()) {
      navigate("/audiitor2");
    }
  };

  return (
    <div className={`cyadvice-stage1 ${isLocked ? "correct-bg" : feedback ? "incorrect-bg" : ""}`}>
      <h2>Riskianalüüs</h2>
      <p>Vali riskid, mida organisatsioonil võib esineda:</p>
      <ul className="risk-list">
        {riskOptions.map(risk => (
          <li 
            key={risk.id} 
            onClick={() => toggleRisk(risk.id)}
            className={selectedRisks.includes(risk.id) ? "selected" : ""}
          >
            <input 
              type="checkbox"
              checked={selectedRisks.includes(risk.id)}
              readOnly
            />
            {risk.name}
          </li>
        ))}
      </ul>
      {feedback && <div className="feedback">{feedback}</div>}
      <div className="buttons">
        {!isLocked ? (
          <button onClick={handleReset}>Alusta uuesti</button>
        ) : (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
    </div>
  );
}

export default Audiitor1;
