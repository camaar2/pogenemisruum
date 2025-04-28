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
  const shuffledDistractors = shuffleArray(
    allTasks3.filter(name => !correctTasks.includes(name))
  );
  const subsetSize = Math.floor(Math.random() * 3) + 4;
  const numDistractors = subsetSize - correctTasks.length;
  const options = shuffleArray([
    ...correctTasks,
    ...shuffledDistractors.slice(0, numDistractors)
  ]);
  return options;
}

export default function Audiitor3() {
  const navigate = useNavigate();
  const [taskOptions] = useState(generateTaskOptions3());
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  const toggleTask = name => {
    if (checked) return;
    setSelectedTasks(prev =>
      prev.includes(name)
        ? prev.filter(x => x !== name)
        : [...prev, name]
    );
  };

  const handleCheck = () => {
    const correctCount = selectedTasks.filter(n =>
      correctTasks.includes(n)
    ).length;
    const wrongCount = selectedTasks.length - correctCount;
    setResult({ correct: correctCount, wrong: wrongCount });
    setChecked(true);
  };

  const handleReset = () => {
    setSelectedTasks([]);
    setChecked(false);
    setResult({ correct: 0, wrong: 0 });
  };

  return (
    <div className="cyadvice-stage3">
      <h2>Lahenduse rakendamise juhendamine</h2>
      <p>Vali meetodid, mis on projekti jaoks olulised:</p>
      <ul className="task-list">
        {taskOptions.map(name => (
          <li
            key={name}
            onClick={() => toggleTask(name)}
            className={selectedTasks.includes(name) ? "selected" : ""}
          >
            <input
              type="checkbox"
              checked={selectedTasks.includes(name)}
              readOnly
            /> {name}
          </li>
        ))}
      </ul>

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={selectedTasks.length === 0}
        >
          Kontrolli vastused
        </button>
      ) : (
        <div className="result">
          <p>Õigeid valikuid: {result.correct}</p>
          <p>Väärasid valikuid: {result.wrong}</p>
        </div>
      )}

      <div className="buttons">
        <button onClick={handleReset}>Uuesti</button>
        {checked &&
          result.correct === correctTasks.length &&
          result.wrong === 0 && (
            <button onClick={() => navigate("/audiitor4")}>Edasi</button>
          )}
      </div>
    </div>
  );
}