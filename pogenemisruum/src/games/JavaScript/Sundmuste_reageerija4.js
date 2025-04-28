import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sundmuste_reageerija4.css';

const allActions = [
  { id: 1, name: 'Isoleeri nakatunud host', isCorrect: true },
  { id: 2, name: 'Blokeeri pahatahtlik IP-aadress', isCorrect: true },
  { id: 3, name: 'Lukusta kompromiteeritud kasutajakontod', isCorrect: true },
  { id: 4, name: 'Uuenda haavatavate süsteemide paroolid', isCorrect: true },
  { id: 5, name: 'Kustuta kõvakettal olevad logid', isCorrect: false },
  { id: 6, name: 'Taaskäivita süsteemid kohe', isCorrect: false },
  { id: 7, name: 'Luba lõplik juurdepääs kõigile töötajatele', isCorrect: false }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateOptions() {
  const correct = allActions.filter(a => a.isCorrect);
  const distractors = allActions.filter(a => !a.isCorrect);
  shuffleArray(distractors);
  const selected = [...correct];
  let i = 0;
  while (selected.length < correct.length + 2 && i < distractors.length) {
    selected.push(distractors[i]);
    i++;
  }
  return shuffleArray(selected);
}

function Sundmuste_reageerija4() {
  const navigate = useNavigate();
  const [options, setOptions] = useState(generateOptions());
  const [selectedActions, setSelectedActions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const correctNames = allActions
    .filter(a => a.isCorrect)
    .map(a => a.name)
    .sort();

  const toggleSelect = name => {
    if (isLocked) return;
    setSelectedActions(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const isSelectionCorrect = () => {
    const sel = [...selectedActions].sort();
    return sel.length === correctNames.length && sel.every((v, i) => v === correctNames[i]);
  };

  useEffect(() => {
    if (!isLocked && selectedActions.length > 0 && !isSelectionCorrect()) {
      setFeedback('Vale valik! Õiged meetmed valitakse automaatselt...');
      const timer = setTimeout(() => {
        setSelectedActions(correctNames);
        setFeedback('Õige! Kõik vajalikud containment-meetmed on valitud.');
        setIsLocked(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (isSelectionCorrect()) {
      setFeedback('Tubli! Kõik vajalikud containment-meetmed on valitud.');
      setIsLocked(true);
    }
  }, [selectedActions]);

  const handleReset = () => {
    if (isLocked) return;
    setOptions(generateOptions());
    setSelectedActions([]);
    setFeedback('');
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className="containment-selection">
      <h2>Containment & Eradication strateegia</h2>
      <p>Vali meetmed, mis sobivad intsidendi containment- ja eradikatsioonistrateegiaks:</p>
      <ul className="action-list">
        {options.map(opt => (
          <li
            key={opt.id}
            className={selectedActions.includes(opt.name) ? 'selected' : ''}
            onClick={() => toggleSelect(opt.name)}
          >
            <input
              type="checkbox"
              checked={selectedActions.includes(opt.name)}
              readOnly
            />
            {opt.name}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!isLocked ? (
          <button onClick={handleReset}>Alusta uuesti</button>
        ) : (
          <button onClick={handleFinish}>Lõpeta mäng</button>
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Sundmuste_reageerija4;