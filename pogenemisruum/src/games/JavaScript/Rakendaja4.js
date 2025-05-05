import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja4.css';

export default function Rakendaja4() {
  const navigate = useNavigate();
  const questions = [
    {
      id: 1,
      text: "Milline turvameede aitab takistada pahavara levikut võrgu sees?",
      options: ["Tulemüür", "VPN", "Antiviirus", "Võrgu segmentimine"],
      correct: "Võrgu segmentimine"
    },
    {
      id: 2,
      text: "Milline on tugeva autentimise peamine omadus?",
      options: ["Lihtne salasõna", "Kahefaktoriline autentimine", "Ainult PIN-kood", "Sõrmejäljelugeja keelamine"],
      correct: "Kahefaktoriline autentimine"
    }
  ];
  const total = questions.length;

  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSelect = (qid, option) => {
    if (locked) return;
    setAnswers(prev => ({ ...prev, [qid]: option }));
  };

  const handleCheck = () => {
    setChecked(true);
    const allCorrect = questions.every(q => answers[q.id] === q.correct);
    if (allCorrect && Object.keys(answers).length === total) {
      setLocked(true);
      setFeedback("🎉 Kõik vastused on õiged!");
    } else {
      setFeedback("❌ Mõned vastused on valed või puuduvad. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setLocked(false);
    setFeedback('');
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className={`rakendaja4-stage ${
        locked ? 'correct-bg'
        : (checked && !locked) ? 'incorrect-bg'
        : ''
      }`}>
      <h1>Turvameetmete teadmiste kontroll</h1>
      <p className="scenario">
        <em>
          Selles etapis testime sinu arusaamist võrgu turvameetmetest ja autentimisest.
          Loe iga küsimus hoolikalt ja vali kõige täpsem vastus.
        </em>
      </p>
      <p className="instruction">
        Vasta <strong>{total}</strong> küsimusele:
      </p>

      <div className="questions-container">
        {questions.map(q => {
          const sel = answers[q.id];
          return (
            <div key={q.id} className="question-block">
              <h3>{q.text}</h3>
              {q.options.map(opt => {
                let cls = '';
                if (checked) {
                  if (opt === q.correct) cls = 'correct';
                  else if (sel === opt) cls = 'incorrect';
                }
                return (
                  <label
                    key={opt}
                    className={`option-item ${sel === opt ? 'selected' : ''} ${cls}`}
                  >
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={opt}
                      checked={sel === opt}
                      onChange={() => handleSelect(q.id, opt)}
                      disabled={locked}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="buttons">
        {!checked ? (
          <button
            className="primary"
            onClick={handleCheck}
            disabled={Object.keys(answers).length !== total}
          >
            Kontrolli vastuseid
          </button>
        ) : locked ? (
          <button className="primary" onClick={handleFinish}>
            Lõpeta mäng
          </button>
        ) : (
          <button onClick={handleReset}>Proovi uuesti</button>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${
          locked ? 'message-correct' : 'message-incorrect'
        }`}>
          {feedback}
        </div>
      )}
    </div>
  );
}