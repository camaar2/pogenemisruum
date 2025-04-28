import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja2.css';

const allStrategies = [
  { id: 1, text: "Integreeritud riskijuhtimine", isCorrect: false, explanation: "Ühendab mitmeid turvatavasid, kuid võib jääda fragmentaarseks." },
  { id: 2, text: "Proaktiivne turvapoliitika", isCorrect: false, explanation: "Fookus ohude ennetamisel, kuid võib puududa täielik integratsioon." },
  { id: 3, text: "Integreeritud ja proaktiivne riskijuhtimine", isCorrect: true, explanation: "Kõik turvaelemendid on ühtselt hallatud ja ennetavad võimalikke ohte." },
  { id: 4, text: "Reaktiivne kriisihaldus", isCorrect: false, explanation: "Vastab tekkinud probleemidele, mitte ennetab neid." },
  { id: 5, text: "Modulaarne turvapoliitika", isCorrect: false, explanation: "Eraldab turvalahendused mooduliteks, mis võivad olla isolatsioonis." }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateStrategyOptions() {
  const correct = allStrategies.filter(s => s.isCorrect);
  const distractors = allStrategies.filter(s => !s.isCorrect);
  const subsetSize = Math.floor(Math.random() * 2) + 3;
  const selected = [...correct];
  let i = 0;
  const shuffledDistractors = shuffleArray(distractors);
  while (selected.length < subsetSize && i < shuffledDistractors.length) {
    selected.push(shuffledDistractors[i]);
    i++;
  }
  return shuffleArray(selected);
}

function Turvapoliitika_eestvedaja2() {
  const navigate = useNavigate();
  const [strategyOptions, setStrategyOptions] = useState(generateStrategyOptions());
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const correctStrategy = "Integreeritud ja proaktiivne riskijuhtimine";

  const handleSelect = (strategy) => {
    if (isLocked) return;
    setSelectedStrategy(strategy);
  };

  useEffect(() => {
    if (!selectedStrategy) return;
    const timer = setTimeout(() => {
      if (selectedStrategy === correctStrategy) {
        setFeedback("Õige strateegia! Turvapoliitika on kindlustatud.");
        setIsLocked(true);
        setTimeout(() => {
          navigate('/turvapoliitika_eestvedaja3');
        }, 1000);
      } else {
        setFeedback("Vale strateegia! Õige strateegia täidetakse automaatselt...");
        setSelectedStrategy(correctStrategy);
        setTimeout(() => {
          navigate('/stage3');
        }, 1000);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedStrategy, navigate]);

  return (
    <div className={`stage stage2 ${isLocked ? 'correct-bg' : feedback ? 'incorrect-bg' : ''}`}>
      <h2>2. Etapp: Turvapoliitika strateegia</h2>
      <p>Vali strateegia, mis on kõige sobivam organisatsiooni turvapoliitikaks:</p>
      <ul className="strategy-list">
        {strategyOptions.map(option => (
          <li key={option.id} onClick={() => handleSelect(option.text)} className={selectedStrategy === option.text ? "selected" : ""} title={option.explanation}>
            <input type="radio" checked={selectedStrategy === option.text} readOnly />
            {option.text}
          </li>
        ))}
      </ul>
      {feedback && <div className="feedback">{feedback}</div>}
      {/* Kontrollinuppu pole – kontroll toimub automaatselt */}
    </div>
  );
}

export default Turvapoliitika_eestvedaja2;
