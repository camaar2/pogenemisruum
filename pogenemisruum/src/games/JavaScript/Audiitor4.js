import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor4.css';

const allRecommendations = [
  "Kvartaalne sissetungitest",
  "Pidev logimonitooring",
  "Üldine auditi läbiviimine",
  "Andmete varundamine",
  "Turvahäirete logi analüüs"
];

const correctRecommendations = [
  "Kvartaalne sissetungitest",
  "Pidev logimonitooring"
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateRecommendationOptions() {
  const distractors = allRecommendations.filter(rec => !correctRecommendations.includes(rec));
  const subsetSize = Math.min(allRecommendations.length, Math.floor(Math.random() * 2) + 3);
  const shuffledDistractors = shuffleArray(distractors);
  return shuffleArray([
    ...correctRecommendations,
    ...shuffledDistractors.slice(0, subsetSize - correctRecommendations.length)
  ]);
}

export default function Audiitor4() {
  const navigate = useNavigate();
  const [recommendationOptions, setRecommendationOptions] = useState(generateRecommendationOptions());
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  const toggleRecommendation = rec => {
    if (checked) return;
    setSelectedRecommendations(prev =>
      prev.includes(rec) ? prev.filter(r => r !== rec) : [...prev, rec]
    );
  };

  const handleCheck = () => {
    const correctCount = selectedRecommendations.filter(r => correctRecommendations.includes(r)).length;
    const wrongCount = selectedRecommendations.filter(r => !correctRecommendations.includes(r)).length;
    setResult({ correct: correctCount, wrong: wrongCount });
    setChecked(true);
  };

  const handleReset = () => {
    setRecommendationOptions(generateRecommendationOptions());
    setSelectedRecommendations([]);
    setResult({ correct: 0, wrong: 0 });
    setChecked(false);
  };

  return (
    <div className="cyadvice-stage4">
      <h2>Lõplik audit ja järelevalve</h2>
      <p>Vali järelmeetmed:</p>
      <ul className="recommendation-list">
        {recommendationOptions.map(rec => (
          <li
            key={rec}
            onClick={() => toggleRecommendation(rec)}
            className={selectedRecommendations.includes(rec) ? "selected" : ""}
          >
            <input
              type="checkbox"
              checked={selectedRecommendations.includes(rec)}
              readOnly
            /> {rec}
          </li>
        ))}
      </ul>
      {!checked ? (
        <button onClick={handleCheck} disabled={selectedRecommendations.length === 0}>
          Kontrolli vastused
        </button>
      ) : (
        <div className="result">
          <p>Õigeid valikuid: {result.correct}</p>
          <p>Väärasid valikuid: {result.wrong}</p>
        </div>
      )}
      <div className="buttons">
        <button onClick={handleReset}>Alusta uuesti</button>
        {checked && result.correct === correctRecommendations.length && result.wrong === 0 && (
          <button onClick={() => navigate('/')}>Lõpeta mäng</button>
        )}
      </div>
    </div>
  );
}