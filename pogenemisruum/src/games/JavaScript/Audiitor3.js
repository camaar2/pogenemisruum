import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor3.css';

const allTasks3 = [
  { text: "Tehniline paigaldus", explanation: "Paigaldatakse vajalik tarkvara ja seadistatakse turvamehhanismid." },
  { text: "Töötajate koolitus", explanation: "Kaasatakse personal, et nad teaksid, kuidas turvameetmeid järgida." },
  { text: "Sissetungitesti läbiviimine", explanation: "Testitakse süsteemi haavatavusi reaalse ründemudeli abil." },
  { text: "Koormustest serveril", explanation: "Kontrollitakse, kuidas süsteem töötab suure koormuse all, kuid ei ole otseselt turvameede." },
  { text: "Lihtne hooldusleping", explanation: "Leping ei pruugi sisaldada tehnilisi või testimismeetmeid." },
  { text: "Rakenduse funktsionaaltest", explanation: "Testitakse rakenduse funktsionaalsust, kuid see ei pruugi tuvastada turvariske." }
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
  const distract = allTasks3.filter(n => !correctTasks.includes(n.text));
  const shuffled = shuffleArray(distract);
  const subsetSize = Math.floor(Math.random() * 3) + 4;
  const numDistractors = subsetSize - correctTasks.length;
  const options = [
    ...allTasks3.filter(n => correctTasks.includes(n.text)),
    ...shuffled.slice(0, numDistractors)
  ];
  return shuffleArray(options);
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
        `Audit kokkuvõte: ${scenario} Valitud sammud: ${selectedTasks.join(', ')}.`
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
        <ul className="criteria-list">
        </ul>
        Vali täpselt <strong>{correctTasks.length}</strong> sammu, mis kindlustavad turvameetmete õige ja tõhusa rakenduse. Kui oled valmis, klõpsa „Esita valikud“.
      </p>
      <ul className="task-list">
        {taskOptions.map(item => (
          <li
            key={item.text}
            onClick={() => toggleTask(item.text)}
            className={
              selectedTasks.includes(item.text)
                ? checked
                  ? correctTasks.includes(item.text)
                    ? 'selected-correct'
                    : 'selected-incorrect'
                  : 'selected'
                : ''
            }
          >
            <input type="checkbox" checked={selectedTasks.includes(item.text)} readOnly /> {item.text}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button className="primary" onClick={handleReset}>
          Alusta uuesti
        </button>
        {!checked ? (
          <button className="primary" onClick={handleCheck} disabled={selectedTasks.length === 0}>
            Esita valikud
          </button>
        ) : (
          feedback.startsWith('Õige') && (
            <button className="primary" onClick={() => navigate('/audiitor4_leht')}>
              Edasi
            </button>
          )
        )}
      </div>
      {feedback && <div className={`feedback ${feedbackClass}`}>{feedback}</div>}
      {report && <div className="report">{report}</div>}
      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {taskOptions.map(item => (
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
