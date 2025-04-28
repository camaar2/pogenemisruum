import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor3.css';

const allTasks = [
  { name: "Tehniline paigaldus", isCorrect: true },
  { name: "Töötajate koolitus", isCorrect: true },
  { name: "Sissetungitesti läbiviimine", isCorrect: true },
  { name: "Koormustest serveril", isCorrect: false },
  { name: "Lihtne hooldusleping", isCorrect: false },
  { name: "Rakenduse funktsionaaltest", isCorrect: false }
];
const correctTaskNames = allTasks.filter(t => t.isCorrect).map(t => t.name);

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateTaskOptions() {
  const correct = allTasks.filter(t => t.isCorrect);
  const distractors = allTasks.filter(t => !t.isCorrect);

  shuffleArray(distractors);

  const subsetSize = Math.floor(Math.random() * 3) + 4;
  const selected = [...correct];
  let i = 0;
  while (selected.length < subsetSize && i < distractors.length) {
    selected.push(distractors[i]);
    i++;
  }
  return shuffleArray(selected);
}

function Audiitor3() {
  const navigate = useNavigate();
  const [taskOptions, setTaskOptions] = useState(generateTaskOptions());
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const isSelectionCorrect = () => {
    const sortedSelected = [...selectedTasks].sort();
    const sortedCorrect = [...correctTaskNames].sort();
    return (
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((val, idx) => val === sortedCorrect[idx])
    );
  };

  const toggleTask = (taskName) => {
    if (isLocked) return;
    if (selectedTasks.includes(taskName)) {
      setSelectedTasks(selectedTasks.filter(t => t !== taskName));
    } else {
      setSelectedTasks([...selectedTasks, taskName]);
    }
  };

  useEffect(() => {
    if (selectedTasks.length > 0 && !isSelectionCorrect()) {
      setFeedback("Vale valik! Õige meetodid täidetakse automaatselt...");
      const timer = setTimeout(() => {
        setSelectedTasks(correctTaskNames);
        setFeedback("");
        setIsLocked(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setFeedback("");
    }
  }, [selectedTasks]);

  const handleReset = () => {
    setTaskOptions(generateTaskOptions());
    setSelectedTasks([]);
    setFeedback("");
    setIsLocked(false);
  };

  const handleNext = () => {
    if (isSelectionCorrect()) {
      navigate('/audiitor4');
    }
  };

  return (
    <div className={`cyadvice-stage3 ${isLocked ? "correct-bg" : feedback ? "incorrect-bg" : ""}`}>
      <h2>Lahenduse rakendamise juhendamine</h2>
      <p>Vali meetodid, mis on projekti jaoks olulised:</p>
      <ul className="task-list">
        {taskOptions.map((task) => (
          <li 
            key={task.name}
            onClick={() => toggleTask(task.name)}
            className={selectedTasks.includes(task.name) ? "selected" : ""}
          >
            <input 
              type="checkbox"
              checked={selectedTasks.includes(task.name)}
              readOnly
            />
            {task.name}
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

export default Audiitor3;
