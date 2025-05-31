import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor3.css';

const allTasks3 = [
  "Tehniline paigaldus",
  "Töötajate koolitus",
  "Sissetungitesti läbiviimine",
  "Koormustest serveril",
  "Lihtne hooldusleping",
  "Rakenduse funktsionaaltest"
];
const correctTasks = [
  "Tehniline paigaldus",
  "Töötajate koolitus",
  "Sissetungitesti läbiviimine"
];

function shuffleArray(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateTaskOptions3() {
  const distract = allTasks3.filter(n => !correctTasks.includes(n));
  const shuffled = shuffleArray(distract);
  const subsetSize = Math.floor(Math.random() * 3) + 4;
  const numDistractors = subsetSize - correctTasks.length;
  return shuffleArray([...correctTasks, ...shuffled.slice(0, numDistractors)]);
}

export default function Audiitor3() {
  const navigate = useNavigate();
  const [taskOptions] = useState(generateTaskOptions3());
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [report, setReport] = useState("");

  const scenario = "Projekti lõppfaasis tuleb rakendada valitud turvameetmed operatsioonide kaitseks.";

  const toggleTask = name => {
    if (checked) return;
    setSelectedTasks(prev =>
      prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
    );
  };

  const handleCheck = () => {
    const correctCount = selectedTasks.filter(n => correctTasks.includes(n)).length;
    const wrongCount = selectedTasks.length - correctCount;
    if (correctCount === correctTasks.length && wrongCount === 0) {
      setFeedback("Õige! Kõik vajalikud sammud valitud.");
      setReport(
        `Audit kokkuvõte: ${scenario} \nValitud sammud: ${selectedTasks.join(', ')}.`
      );
    } else {
      setFeedback(`Õigeid valikuid: ${correctCount}, vigu: ${wrongCount}. Proovi uuesti.`);
    }
    setChecked(true);
  };

  const handleReset = () => {
    setSelectedTasks([]);
    setChecked(false);
    setFeedback("");
    setReport("");
  };

  const containerClass = checked
    ? feedback.startsWith('Õige') ? 'correct-bg' : 'incorrect-bg'
    : '';
  const feedbackClass = checked
    ? feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'
    : '';

  return (
    <div className={`cyadvice-stage3 ${containerClass}`}>
      <h2>Lahenduse rakendamise juhendamine</h2>
      <p className="description"><em>{scenario}</em></p>
      <p className="instructions">
        Selle etapi eesmärk on tagada, et valitud turvameetmed viiakse praktikas ellu järjekindlalt ja tõhusalt.
        <ul>
        </ul>
        Vali need sammud, mis katavad nii tehnilised, protseduurilised kui ka testimismeetmed. Kokku tuleb valida <strong>{correctTasks.length}</strong> meetet.
      </p>
      <ul className="task-list">
        {taskOptions.map(name => (
          <li
            key={name}
            onClick={() => toggleTask(name)}
            className={
              selectedTasks.includes(name)
                ? checked
                  ? correctTasks.includes(name)
                    ? 'selected-correct'
                    : 'selected-incorrect'
                  : 'selected'
                : ''
            }
          >
            <input type="checkbox" checked={selectedTasks.includes(name)} readOnly /> {name}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!checked ? (
          <button className="primary" onClick={handleCheck} disabled={selectedTasks.length === 0}>
            Kontrolli vastused
          </button>
        ) : (
          <button className="primary" onClick={handleReset}>
            Alusta uuesti
          </button>
        )}
        {checked && feedback.startsWith('Õige') && (
          <button onClick={() => navigate('/audiitor4_leht')}>
            Edasi
          </button>
        )}
      </div>
      {feedback && <div className={`feedback ${feedbackClass}`}>{feedback}</div>}
      {report && <div className="report">{report}</div>}
    </div>
  );
}