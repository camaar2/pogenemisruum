import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja4.css';

function Rakendaja4() {
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      text: "Milline turvameede aitab takistada pahavara levikut võrgu sees?",
      options: ["Firewall", "VPN", "Antiviirus", "Võrgu segmentimine"],
      correct: "Võrgu segmentimine"
    },
    {
      id: 2,
      text: "Milline on tugeva autentimise peamine omadus?",
      options: ["Lihtne salasõna", "Kahefaktoriline autentimine", "Ainult PIN-kood", "Sõrmejäljelugeja keelamine"],
      correct: "Kahefaktoriline autentimine"
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const handleSelect = (qId, option) => {
    if (isLocked) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleCheck = () => {
    let allCorrect = true;
    questions.forEach(q => {
      if (selectedAnswers[q.id] !== q.correct) {
        allCorrect = false;
      }
    });
    if (allCorrect && Object.keys(selectedAnswers).length === questions.length) {
      setFeedback('Kõik vastused on õiged!');
      setIsLocked(true);
    } else {
      setFeedback('Mõned vastused on valed või puuduvad. Proovi uuesti.');
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setFeedback('');
    setIsLocked(false);
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className="rakendaja4-stage">
      <h1>Turvameetmete teadmiste kontroll</h1>
      <p>Vali igale küsimusele kõige õigem vastus:</p>

      <div className="questions-container">
        {questions.map(q => (
          <div key={q.id} className="question-block">
            <h3>{q.text}</h3>
            {q.options.map(option => (
              <label key={option} className="option-item">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={selectedAnswers[q.id] === option}
                  onChange={() => handleSelect(q.id, option)}
                  disabled={isLocked}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleCheck}>Kontrolli vastuseid</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={handleFinish}>Lõpeta mäng</button>
        )}
      </div>

      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Rakendaja4;
