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
  const subsetSize = Math.floor(Math.random() * 2) + 3; // 3-4 options
  const needed = subsetSize - correctRecommendations.length;
  return shuffleArray([
    ...correctRecommendations,
    ...shuffleArray(distractors).slice(0, needed)
  ]);
}

export default function Audiitor4() {
  const navigate = useNavigate();
  const [options, setOptions] = useState(generateRecommendationOptions());
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [report, setReport] = useState("");

  const scenario = "Pärast juurutust tuleb pidevalt jälgida turvasündmusi ja hinnata süsteemi töötõhusust.";

  const toggleRecommendation = rec => {
    if (checked) return;
    setSelected(prev =>
      prev.includes(rec) ? prev.filter(r => r !== rec) : [...prev, rec]
    );
  };

  const handleCheck = () => {
    const correctCount = selected.filter(r => correctRecommendations.includes(r)).length;
    const wrongCount = selected.filter(r => !correctRecommendations.includes(r)).length;
    setChecked(true);
    if (correctCount === correctRecommendations.length && wrongCount === 0) {
      setFeedback("Õige! Kõik soovitatud järelmeetmed valitud.");
      setReport(`Audit kokkuvõte: ${scenario} Valitud järelmeetmed: ${selected.join(', ')}.`);
    } else {
      setFeedback(`Õigeid valikuid: ${correctCount}, vigu: ${wrongCount}. Proovi uuesti.`);
    }
  };

  const handleReset = () => {
    setOptions(generateRecommendationOptions());
    setSelected([]);
    setChecked(false);
    setFeedback("");
    setReport("");
  };

  const containerClass = checked
    ? feedback.startsWith('Õige') ? 'correct-bg' : 'incorrect-bg'
    : '';
  const messageClass = checked
    ? feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'
    : '';

  return (
    <div className={`cyadvice-stage4 ${containerClass}`}>
      <h2>Järelevalve ja audit</h2>
      <p className="instructions"><em>{scenario}</em></p>
      <p className="description">
        Valitud järelmeetmed aitavad tuvastada ja reageerida turvaohtudele regulaarse monitooringu kaudu.
        Vali <strong>{correctRecommendations.length}</strong> peamist meetet, mis tagavad infoajastuse ja rünnakute varajase avastamise.
      </p>
      <ul className="recommendation-list">
        {options.map(rec => (
          <li
            key={rec}
            onClick={() => toggleRecommendation(rec)}
            className={
              selected.includes(rec)
                ? checked
                  ? correctRecommendations.includes(rec)
                    ? 'selected-correct'
                    : 'selected-incorrect'
                  : 'selected'
                : ''
            }
          >
            <input type="checkbox" checked={selected.includes(rec)} readOnly /> {rec}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!checked ? (
          <button className="primary" onClick={handleCheck} disabled={selected.length === 0}>
            Kontrolli vastused
          </button>
        ) : (
          <button className="primary" onClick={handleReset}>
            Alusta uuesti
          </button>
        )}
        {checked && feedback.startsWith('Õige') && (
          <button onClick={() => navigate('/')}>Lõpeta mänguseeria</button>
        )}
      </div>
      {feedback && <div className={`feedback ${messageClass}`}>{feedback}</div>}
      {report && <div className="report">{report}</div>}
    </div>
  );
}