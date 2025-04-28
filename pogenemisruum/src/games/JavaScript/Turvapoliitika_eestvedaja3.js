import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja3.css';

const allTasks = [
  { name: "Tehniline paigaldus", isCorrect: true, explanation: "Seadmete paigaldus ja konfiguratsioon." },
  { name: "Töötajate koolitus", isCorrect: true, explanation: "Personal on teadlik ja oskab reageerida ohule." },
  { name: "Sissetungitesti läbiviimine", isCorrect: true, explanation: "Testib süsteemi vastupidavust reaalse rünnaku tingimustes." },
  { name: "Koormustest serveril", isCorrect: false, explanation: "Ebavajalik, kui eesmärk on turvapoliitika hindamine." },
  { name: "Lihtne hooldusleping", isCorrect: false, explanation: "Hoolduslepingud ei taga turvalisust." },
  { name: "Rakenduse funktsionaaltest", isCorrect: false, explanation: "Testib ainult funktsionaalsust, mitte turvalisust." }
];

const correctTaskNames = allTasks.filter(t => t.isCorrect).map(t => t.name).sort();

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
  const subsetSize = Math.floor(Math.random() * 3) + 4;
  const selected = [...correct];
  let i = 0;
  while (selected.length < subsetSize && i < distractors.length) {
    selected.push(distractors[i]);
    i++;
  }
  return shuffleArray(selected);
}

function Turvapoliitika_eestvedaja3() {
  const navigate = useNavigate();
  const [taskOptions, setTaskOptions] = useState(generateTaskOptions());
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const isSelectionCorrect = () => {
    const sortedSelected = [...selectedTasks].sort();
    return (
      sortedSelected.length === correctTaskNames.length &&
      sortedSelected.every((val, idx) => val === correctTaskNames[idx])
    );
  };

  useEffect(() => {
    if (selectedTasks.length === 0) return;
    const timer = setTimeout(() => {
      if (!isSelectionCorrect()) {
        setFeedback("Vale valik! Õiged meetodid täidetakse automaatselt...");
        setSelectedTasks(correctTaskNames);
      } else {
        setFeedback("Õige! Kõik meetodid on korrektselt määratud.");
      }
      setIsLocked(true);
      setTimeout(() => {
        navigate('/turvapoliitika_eestvedaja4');
      }, 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedTasks, navigate]);

  const toggleTask = (taskName) => {
    if (isLocked) return;
    if (selectedTasks.includes(taskName)) {
      setSelectedTasks(selectedTasks.filter(t => t !== taskName));
    } else {
      setSelectedTasks([...selectedTasks, taskName]);
    }
  };

  return (
    <div className={`stage stage3 ${isLocked ? 'correct-bg' : feedback ? 'incorrect-bg' : ''}`}>
      <h2>3. Etapp: Rakendamise juhendamine</h2>
      <p>Milline meede rakendatakse? (Hover üle iga meetodi selgituse jaoks)</p>
      <ul className="task-list">
        {taskOptions.map(task => (
          <li
            key={task.name}
            onClick={() => toggleTask(task.name)}
            title={task.explanation}
            className={selectedTasks.includes(task.name) ? "selected" : ""}
          >
            <input type="checkbox" checked={selectedTasks.includes(task.name)} readOnly />
            {task.name}
          </li>
        ))}
      </ul>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Turvapoliitika_eestvedaja3;
