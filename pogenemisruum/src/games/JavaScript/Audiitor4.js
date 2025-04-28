import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor4.css';

const allRecommendations = [
  "Kvartaalne sissetungitest",
  "Pidev logimonitooring",
  "Üldine auditi läbiviimine",
  "Andmete varundamine",
  "Turvahäirete logi analüüs"
];

const correctRecommendations = ["Kvartaalne sissetungitest", "Pidev logimonitooring"];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateRecommendationOptions() {
  const correct = allRecommendations.filter(rec =>
    correctRecommendations.includes(rec)
  );
  const distractors = allRecommendations.filter(rec =>
    !correctRecommendations.includes(rec)
  );
  const subsetSize = Math.min(allRecommendations.length, Math.floor(Math.random() * 2) + 3);
  let selected = [...correct];
  const shuffledDistractors = shuffleArray(distractors);
  let i = 0;
  while (selected.length < subsetSize && i < shuffledDistractors.length) {
    selected.push(shuffledDistractors[i]);
    i++;
  }
  return shuffleArray(selected);
}

function Audiitor4() {
  const navigate = useNavigate();
  const [recommendationOptions, setRecommendationOptions] = useState(generateRecommendationOptions());
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const toggleRecommendation = (rec) => {
    if (isLocked) return;
    if (selectedRecommendations.includes(rec)) {
      setSelectedRecommendations(selectedRecommendations.filter(r => r !== rec));
    } else {
      setSelectedRecommendations([...selectedRecommendations, rec]);
    }
  };

  const isSelectionCorrect = () => {
    const sortedSelected = [...selectedRecommendations].sort();
    const sortedCorrect = [...correctRecommendations].sort();
    return (
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((rec, idx) => rec === sortedCorrect[idx])
    );
  };

  useEffect(() => {
    if (selectedRecommendations.length > 0 && !isSelectionCorrect()) {
      setFeedback('Vale soovitus! Õige vastused täidetakse automaatselt.');
      const timer = setTimeout(() => {
        setSelectedRecommendations(correctRecommendations);
        setFeedback('');
        setIsLocked(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setFeedback('');
    }
  }, [selectedRecommendations]);

  const finishGame = () => {
    if (isSelectionCorrect()) {
      alert('Mäng on lõppenud! Kliendi usaldus on võidetud!');
      navigate('/');
    }
  };

  const handleReset = () => {
    setRecommendationOptions(generateRecommendationOptions());
    setSelectedRecommendations([]);
    setFeedback('');
    setIsLocked(false);
  };

  return (
    <div className={`cyadvice-stage4 ${isLocked ? "correct-bg" : feedback ? "incorrect-bg" : ""}`}>
      <h2>Lõplik audit ja järelevalve</h2>
      <p>Vali järelmeetmed:</p>
      <ul className="recommendation-list">
        {recommendationOptions.map(rec => (
          <li key={rec} onClick={() => toggleRecommendation(rec)} className={selectedRecommendations.includes(rec) ? "selected" : ""}>
            <input
              type="checkbox"
              checked={selectedRecommendations.includes(rec)}
              readOnly
            />
            {rec}
          </li>
        ))}
      </ul>
      {feedback && <div className="feedback">{feedback}</div>}
      <div className="buttons">
        {!isLocked ? (
          <button onClick={handleReset}>Alusta uuesti</button>
        ) : (
          <button onClick={finishGame}>Lõpeta mäng</button>
        )}
      </div>
    </div>
  );
}

export default Audiitor4;
