import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor4.css';

const allRecommendations = [
  { text: "Kvartaalne sissetungitest", explanation: "Regulaarne sissetungitestimine aitab leida ja parandada haavatavusi enne, kui ründaja neid kasutab." },
  { text: "Pidev logimonitooring", explanation: "Järelevalve logide üle võimaldab tuvastada kahtlast tegevust ja reageerida kiiresti." },
  { text: "Üldine auditi läbiviimine", explanation: "Üldaudit annab ülevaate protsessidest, kuid ei taga reaalajas tuvastust." },
  { text: "Andmete varundamine", explanation: "Varundamine on oluline, kuid ei too reaalajas turvahäirete avastamist." },
  { text: "Turvahäirete logi analüüs", explanation: "Logianalüüs aitab tuvastada mustreid, kuid pidev monitooring on siiski prioriteetsem." }
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
  const distractors = allRecommendations.filter(rec => !correctRecommendations.includes(rec.text));
  const subsetSize = Math.floor(Math.random() * 2) + 3;
  const needed = subsetSize - correctRecommendations.length;
  return shuffleArray([
    ...correctRecommendations.map(text => allRecommendations.find(r => r.text === text)),
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
        {options.map(item => (
          <li
            key={item.text}
            onClick={() => toggleRecommendation(item.text)}
            className={
              selected.includes(item.text)
                ? checked
                  ? correctRecommendations.includes(item.text)
                    ? 'selected-correct'
                    : 'selected-incorrect'
                  : 'selected'
                : ''
            }
          >
            <input type="checkbox" checked={selected.includes(item.text)} readOnly /> {item.text}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button className="reset" onClick={handleReset}>
          Alusta uuesti
        </button>
        {!checked ? (
          <button className="primary submit" onClick={handleCheck} disabled={selected.length === 0}>
            Esita valikud
          </button>
        ) : (
          feedback.startsWith('Õige') && (
            <button className="primary next" onClick={() => navigate('/')}>
              Lõpeta mänguseeria
            </button>
          )
        )}
      </div>
      {feedback && <div className={`feedback ${messageClass}`}>{feedback}</div>}
      {report && <div className="report">{report}</div>}
      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {options.map(item => (
              <li key={item.text}>
                <strong>{item.text}:</strong> {item.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
