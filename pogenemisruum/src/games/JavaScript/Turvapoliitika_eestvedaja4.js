import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja4.css';

const allActions = [
  {
    id: 1,
    text: 'Teavitamine andmekaitseametile',
    correct: true,
    explanation: 'Andmekaitseametile teadustamine on GDPR‐i nõue, et tagada õiguslik läbipaistvus ja võimalikud sanktsioonid rikke korral.'
  },
  {
    id: 2,
    text: 'Kahju eitamine',
    correct: false,
    explanation: 'Rikkumise eitamine on ebaeetiline ega vasta õiguslikele nõuetele – see tekitab täiendavat riski ja usalduse kaotust.'
  },
  {
    id: 3,
    text: 'Mõjutatud isikute informeerimine',
    correct: true,
    explanation: 'GDPR nõuab, et isikuid, kelle andmed on lekkinud, teavitatakse viivitamatult, et nad saaksid riskide eest kaitsta enda andmed.'
  },
  {
    id: 4,
    text: 'Juhtunu varjamine',
    correct: false,
    explanation: 'Rikkumise varjamine rikub usaldust ja õiguslikke nõudeid ning võib viia tõsiste sanktsioonideni.'
  }
];

function Turvapoliitika_eestvedaja4() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggle = (id) => {
    if (locked) return;
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const chosen = allActions.filter(a => selected.includes(a.id));
    const correctCount = allActions.filter(a => a.correct).length;
    if (chosen.length !== correctCount) {
      setFeedback(`Palun vali kõik ${correctCount} õiged sammud.`);
      return;
    }
    const allCorrect = chosen.every(a => a.correct);
    setIsCorrect(allCorrect);
    if (allCorrect) {
      setFeedback('Õige! Rikkumisele reageerimise sammud on õigesti valitud.');
    } else {
      setFeedback('Mõni valik on vale. Õiged sammud on nüüd esile tõstetud.');
    }
    setLocked(true);
  };

  const handleReset = () => {
    setSelected([]);
    setFeedback('');
    setLocked(false);
    setIsCorrect(false);
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className={`risk-prioritization ${locked ? (isCorrect ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Reageerimine rikkumistele</h1>
      <div className="instructions">
        <p>
          Vali õiged tegevused andmerikkumise korral. Kokku on&nbsp;
          <strong>{allActions.filter(a => a.correct).length}</strong>. Kui oled valmis, vajuta „Esita valikud“.
        </p>
      </div>
      <ul className="action-list">
        {allActions.map(action => (
          <li
            key={action.id}
            onClick={() => toggle(action.id)}
            className={
              locked
                ? action.correct
                  ? 'selected correct'
                  : selected.includes(action.id)
                    ? 'selected incorrect'
                    : ''
                : selected.includes(action.id)
                  ? 'selected'
                  : ''
            }
          >
            <input
              type="checkbox"
              checked={selected.includes(action.id)}
              readOnly
            />
            {action.text}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={handleReset}>Alusta uuesti</button>
        {!locked ? (
          <button className="primary" onClick={handleSubmit}>Esita valikud</button>
        ) : (
          <button className="primary" onClick={handleFinish}>Lõpeta mäng</button>
        )}
      </div>
      {feedback && (
        <div className={`message ${isCorrect ? 'message-correct' : 'message-incorrect'}`}>
          {feedback}
        </div>
      )}
      {locked && (
        <div className="explanations">
          <h2>Selgitused valikute kohta:</h2>
          <ul>
            {allActions.map(action => (
              <li key={action.id}>
                <strong>{action.text}:</strong> {action.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Turvapoliitika_eestvedaja4;

