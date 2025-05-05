import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja3.css';

const allItems = [
  { id: 1, text: 'Turvapoliitika dokumentatsioon', correct: true },
  { id: 2, text: 'Töötajate isiklikud e-kirjad', correct: false },
  { id: 3, text: 'Juurdepääsukontrollide logid', correct: true },
  { id: 4, text: 'Kohvikumenüü', correct: false }
];

function Turvapoliitika_eestvedaja3() {
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
    const chosen = allItems.filter(i => selected.includes(i.id));
    const correctCount = allItems.filter(i => i.correct).length;
    if (chosen.length !== correctCount) {
      setFeedback(`Palun vali kõik ${correctCount} auditiks vajalikku materjali.`);
      return;
    }
    const allCorrect = chosen.every(i => i.correct);
    if (allCorrect) {
      setFeedback('Õige! Auditiks vajalikud materjalid on olemas.');
    } else {
      setFeedback('Mõni valik on vale. Õiged materjalid on nüüd valitud.');
    }
    setLocked(true);
  };

  const handleReset = () => {
    setSelected([]);
    setFeedback('');
    setLocked(false);
  };

  return (
    <div className={`risk-prioritization ${locked ? (feedback.startsWith('Õige') ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Auditiks valmistumine</h1>
      <div className="instructions">
        <p>Vali andmed ja dokumendid, mis peavad auditiks valmis olema. Kokku on <strong>{allItems.filter(i => i.correct).length}</strong>:</p>
      </div>
      <ul className="item-list">
        {allItems.map(item => (
          <li
            key={item.id}
            onClick={() => toggle(item.id)}
            className={
              locked
                ? item.correct
                  ? 'selected correct'
                  : selected.includes(item.id)
                  ? 'selected incorrect'
                  : ''
                : selected.includes(item.id)
                ? 'selected'
                : ''
            }
          >
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              readOnly
            />
            {item.text}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!locked ? (
          <>
            <button className="primary" onClick={handleSubmit}>Kontrolli</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button className="primary" onClick={() => navigate('/turvapoliitika_eestvedaja4')}>Edasi</button>
        )}
      </div>
      {feedback && <div className={`message ${feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'}`}>{feedback}</div>}
    </div>
  );
}

export default Turvapoliitika_eestvedaja3;
