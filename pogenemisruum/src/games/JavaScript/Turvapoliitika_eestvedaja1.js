import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja1.css';

function Turvapoliitika_eestvedaja1() {
  const navigate = useNavigate();

  const correctLaws = ['GDPR', 'NIS2 direktiiv'];

  const laws = shuffleArray([
    'GDPR',
    'ISO 27001 standard',
    'NIS2 direktiiv',
    'Põllumajanduse toetuste seadus'
  ]);

  const [selectedLaws, setSelectedLaws] = useState([]);
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

  const toggleLaw = (law) => {
    if (isChecked) return;
    if (selectedLaws.includes(law)) {
      setSelectedLaws(selectedLaws.filter(t => t !== law));
    } else {
      setSelectedLaws([...selectedLaws, law]);
    }
  };

  const checkAnswers = () => {
    const isCorrect =
      selectedLaws.length === correctLaws.length &&
      selectedLaws.every(law => correctLaws.includes(law));
    if (isCorrect) {
      setFeedback("Õige! Ülesanne täidetud.");
    } else {
      setFeedback("Vale! Õiged vastused on nüüd näidatud.");
      setSelectedLaws(correctLaws);
    }
    setIsChecked(true);
  };

  const goToNextStage = () => {
    navigate('/turvapoliitika_eestvedaja2');
  };

  return (
    <div className="stage stage1">
      <h2>Õiguslike nõuete tuvastamine</h2>
      <p>Vali õiged seadused ja määrused, mis kehtivad küberturbe valdkonnas:</p>
      <ul className="law-list">
        {laws.map(law => (
          <li 
            key={law}
            onClick={() => toggleLaw(law)}
            className={selectedLaws.includes(law) ? "selected" : ""}
          >
            <input type="checkbox" checked={selectedLaws.includes(law)} readOnly />
            {law}
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

export default Turvapoliitika_eestvedaja1;
