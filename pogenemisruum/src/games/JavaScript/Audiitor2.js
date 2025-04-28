import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor2.css';

const allMeasures = [
  "Pilve turvalahendus",
  "Regulaarne sissetungitestimine",
  "Töötajate koolitus",
  "Andmete krüpteerimine",
  "Juurdepääsu kontroll"
];
const correctMeasures = ["Pilve turvalahendus", "Regulaarne sissetungitestimine"];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateMeasureOptions() {
  const correct = allMeasures.filter(m => correctMeasures.includes(m));
  const distractors = allMeasures.filter(m => !correctMeasures.includes(m));
  const subsetSize = Math.floor(Math.random() * 2) + 3;
  shuffleArray(distractors);

  const selected = [...correct];
  let i = 0;
  while (selected.length < subsetSize && i < distractors.length) {
    selected.push(distractors[i]);
    i++;
  }
  return shuffleArray(selected);
}

function Audiitor2() {
  const navigate = useNavigate();
  const [measures, setMeasures] = useState(generateMeasureOptions());
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const isSelectionCorrect = () => {
    const sortedSelected = [...selectedMeasures].sort();
    const sortedCorrect = [...correctMeasures].sort();
    return (
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((val, idx) => val === sortedCorrect[idx])
    );
  };

  const toggleMeasure = (measure) => {
    if (isLocked) return;
    if (selectedMeasures.includes(measure)) {
      setSelectedMeasures(selectedMeasures.filter(m => m !== measure));
    } else {
      setSelectedMeasures([...selectedMeasures, measure]);
    }
  };

  useEffect(() => {
    if (selectedMeasures.length > 0 && !isSelectionCorrect()) {
      setFeedback("Vale valik! Õige vastused täidetakse automaatselt...");
      const timer = setTimeout(() => {
        setSelectedMeasures(correctMeasures);
        setFeedback("");
        setIsLocked(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setFeedback("");
    }
  }, [selectedMeasures]);

  const handleReset = () => {
    setMeasures(generateMeasureOptions());
    setSelectedMeasures([]);
    setFeedback("");
    setIsLocked(false);
  };

  const handleNext = () => {
    if (isSelectionCorrect()) {
      navigate('audiitor3');
    }
  };

  return (
    <div className={`cyadvice-stage2 ${isLocked ? "correct-bg" : feedback ? "incorrect-bg" : ""}`}>
      <h2>2. Etapp: Turvameetmete kava</h2>
      <p>Vali meetmed, mis sobivad organisatsiooni turvalahenduseks:</p>
      <ul className="measure-list">
        {measures.map(measure => (
          <li 
            key={measure} 
            onClick={() => toggleMeasure(measure)}
            className={selectedMeasures.includes(measure) ? "selected" : ""}
          >
            <input
              type="checkbox"
              checked={selectedMeasures.includes(measure)}
              readOnly
            />
            {measure}
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

export default Audiitor2;
