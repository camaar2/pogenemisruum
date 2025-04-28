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

  const correctMeasures = ['Andmete krüpteerimine', 'Töötajate teadlikkuse tõstmine'];

  const measures = shuffleArray([
    'Andmete krüpteerimine',
    'Serveri jahutussüsteemi paigaldamine',
    'Töötajate teadlikkuse tõstmine',
    'Kontorimööbli uuendamine'
  ]);

  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  const toggleMeasure = (measure) => {
    if (isChecked) return;
    if (selectedMeasures.includes(measure)) {
      setSelectedMeasures(selectedMeasures.filter(m => m !== measure));
    } else {
      setSelectedMeasures([...selectedMeasures, measure]);
    }
  };

  const checkAnswers = () => {
    const isCorrect =
      selectedMeasures.length === correctMeasures.length &&
      selectedMeasures.every(m => correctMeasures.includes(m));
    if (isCorrect) {
      setFeedback("Õige! Vastavusmeetmed määratud õigesti.");
    } else {
      setFeedback("Vale! Õiged meetmed on nüüd näidatud.");
      setSelectedMeasures(correctMeasures);
    }
    setIsChecked(true);
  };

  const goToNextStage = () => {
    navigate('/turvapoliitika_eestvedaja3');
  };

  return (
    <div className="stage stage2">
      <h2>Vastavusmeetmete määratlemine</h2>
      <p>Vali meetmed, mis aitavad täita küberturbe õiguslikke nõudeid:</p>
      <ul className="measure-list">
        {measures.map(measure => (
          <li 
            key={measure}
            onClick={() => toggleMeasure(measure)}
            className={selectedMeasures.includes(measure) ? "selected" : ""}
          >
            <input type="checkbox" checked={selectedMeasures.includes(measure)} readOnly />
            {measure}
          </li>
        ))}
      </ul>
      {!isChecked && (
        <button onClick={checkAnswers} className="check-button">Kontrolli</button>
      )}
      {feedback && <p className="feedback">{feedback}</p>}
      {isChecked && (
        <button onClick={goToNextStage} className="next-button">Edasi</button>
      )}
    </div>
  );
}

export default Turvapoliitika_eestvedaja2;
