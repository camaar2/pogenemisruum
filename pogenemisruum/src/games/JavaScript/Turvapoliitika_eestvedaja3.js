import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja3.css';

const allItems = [
  {
    id: 1,
    text: 'Turvapoliitika dokumentatsioon',
    correct: true,
    explanation: 'Turvapoliitika dokumentatsioon on auditis oluline, sest see tõendab, et organisatsioon järgib kehtivaid turbe- ja andmekaitseprotseduure.'
  },
  {
    id: 2,
    text: 'Töötajate isiklikud e-kirjad',
    correct: false,
    explanation: 'Töötajate isiklikud e-kirjad ei ole auditi jaoks asjakohane materjal – neid ei ole vaja turvapoliitika kontrollimisel.'
  },
  {
    id: 3,
    text: 'Juurdepääsukontrollide logid',
    correct: true,
    explanation: 'Juurdepääsukontrollide logid näitavad, kes ja millal süsteemidesse sisse logis, mis on auditi seisukohalt oluline tõend.'
  },
  {
    id: 4,
    text: 'Kohvikumenüü',
    correct: false,
    explanation: 'Kohvikumenüü ei ole seotud auditiprotsessiga ega aita turvapoliitika hindamisel.'
  }
];

function Turvapoliitika_eestvedaja3() {
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
    const chosen = allItems.filter(i => selected.includes(i.id));
    const correctCount = allItems.filter(i => i.correct).length;
    if (chosen.length !== correctCount) {
      setFeedback(`Palun vali kõik ${correctCount} auditiks vajalikku materjali.`);
      return;
    }
    const allCorrect = chosen.every(i => i.correct);
    setIsCorrect(allCorrect);
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
    setIsCorrect(false);
  };

  return (
    <div className={`risk-prioritization ${locked ? (isCorrect ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Auditiks valmistumine</h1>
      <div className="instructions">
        <p>
          Vali andmed ja dokumendid, mis peavad auditiks valmis olema. Kokku on&nbsp;
          <strong>{allItems.filter(i => i.correct).length}</strong>. Kui oled valmis, vajuta „Esita valikud“.
        </p>
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
        <button onClick={handleReset}>Alusta uuesti</button>
        {!locked ? (
          <button className="primary" onClick={handleSubmit}>Esita valikud</button>
        ) : (
          <button className="primary" onClick={() => navigate('/turvapoliitika_eestvedaja4_leht')}>Edasi</button>
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
            {allItems.map(item => (
              <li key={item.id}>
                <strong>{item.text}:</strong> {item.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Turvapoliitika_eestvedaja3;

