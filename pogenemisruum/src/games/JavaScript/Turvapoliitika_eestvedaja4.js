import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja4.css';

const allActions = [
  { id: 1, text: 'Teavitamine andmekaitseametile', correct: true },
  { id: 2, text: 'Kahju eitamine', correct: false },
  { id: 3, text: 'Mõjutatud isikute informeerimine', correct: true },
  { id: 4, text: 'Juhtunu varjamine', correct: false }
];

function Turvapoliitika_eestvedaja4() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(false);

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
    if (allCorrect) {
      setFeedback('Õige! Rikkumisele reageerimise sammud on õigesti valitud.');
    } else {
      setFeedback('Mõni valik on vale. Õiged sammud on nüüd esile tõstetud.');
    }
    setLocked(true);
  };

  const handleFinish = () => {
    alert('Tubli! Oled edukalt lõpetanud Küberõiguse ja Vastavuse spetsialisti koolituse!');
    navigate('/');
  };

  return (
    <div className={`risk-prioritization ${locked ? (feedback.startsWith('Õige') ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Reageerimine rikkumistele</h1>
      <div className="instructions">
        <p>Vali õiged tegevused andmerikkumise korral. Kokku on <strong>{allActions.filter(a => a.correct).length}</strong>:</p>
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
        {!locked ? (
          <>
            <button className="primary" onClick={handleSubmit}>Kontrolli</button>
            <button onClick={() => {
              setSelected([]);
              setFeedback('');
              setLocked(false);
            }}>Alusta uuesti</button>
          </>
        ) : (
          <button className="primary" onClick={handleFinish}>Lõpeta mäng</button>
        )}
      </div>
      {feedback && <div className={`message ${feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'}`}>{feedback}</div>}
    </div>
  );
}

export default Turvapoliitika_eestvedaja4;
