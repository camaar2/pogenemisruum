import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja2.css';

const allMeasures = [
  { id: 1, text: 'Andmete krüpteerimine', correct: true },
  { id: 2, text: 'Serveri jahutussüsteemi paigaldamine', correct: false },
  { id: 3, text: 'Töötajate teadlikkuse tõstmine', correct: true },
  { id: 4, text: 'Kontorimööbli uuendamine', correct: false }
];

function Turvapoliitika_eestvedaja2()  {
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
    const chosen = allMeasures.filter(m => selected.includes(m.id));
    const correctCount = allMeasures.filter(m => m.correct).length;
    if (chosen.length !== correctCount) {
      setFeedback(`Palun vali kõik ${correctCount} vastavusmeedet.`);
      return;
    }
    const allCorrect = chosen.every(m => m.correct);
    if (allCorrect) {
      setFeedback('Õige! Vastavusmeetmed on õigesti määratud.');
    } else {
      setFeedback('Mõni valik on vale. Õiged meetmed on nüüd esile tõstetud.');
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
      <h1>Vastavusmeetmete määratlemine</h1>
      <div className="instructions">
        <p>Vali meetmed, mis aitavad täita küberturbe <strong>õiguslikke</strong> nõudeid. Kokku on <strong>{allMeasures.filter(m => m.correct).length}</strong>:
        </p>
      </div>
      <ul className="measure-list">
        {allMeasures.map(measure => (
          <li
            key={measure.id}
            onClick={() => toggle(measure.id)}
            className={
              locked
                ? measure.correct
                  ? 'selected correct'
                  : selected.includes(measure.id)
                  ? 'selected incorrect'
                  : ''
                : selected.includes(measure.id)
                ? 'selected'
                : ''
            }
          >
            <input
              type="checkbox"
              checked={selected.includes(measure.id)}
              readOnly
            />
            {measure.text}
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
          <button className="primary" onClick={() => navigate('/turvapoliitika_eestvedaja3')}>Edasi</button>
        )}
      </div>
      {feedback && <div className={`message ${feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'}`}>{feedback}</div>}
    </div>
  );
}


export default Turvapoliitika_eestvedaja2;
