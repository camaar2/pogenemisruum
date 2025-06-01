import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja2.css';

const allMeasures = [
  {
    id: 1,
    text: 'Andmete krüpteerimine',
    correct: true,
    explanation: 'Andmete krüpteerimine tagab, et isiku- ja tundlikud andmed on kaitstud isegi siis, kui neid lekib, mis on GDPR-i ning NIS2 nõue.'
  },
  {
    id: 2,
    text: 'Serveri jahutussüsteemi paigaldamine',
    correct: false,
    explanation: 'Kuigi jahutussüsteem on oluline riistvara töökindluse seisukohalt, ei ole see otseselt seotud küberturbe õiguslike nõuetega.'
  },
  {
    id: 3,
    text: 'Töötajate teadlikkuse tõstmine',
    correct: true,
    explanation: 'Töötajate koolitus ja teadlikkus on kohustuslik GDPR-i rakendamisel, et vältida inimlikke vigu, mis võivad põhjustada andmeleket.'
  },
  {
    id: 4,
    text: 'Kontorimööbli uuendamine',
    correct: false,
    explanation: 'Kontorimööbli uuendamine ei mõjuta otseselt küberturbe ja õiguslike nõuete täitmist.'
  }
];

function Turvapoliitika_eestvedaja2()  {
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
    const chosen = allMeasures.filter(m => selected.includes(m.id));
    const correctCount = allMeasures.filter(m => m.correct).length;
    if (chosen.length !== correctCount) {
      setFeedback(`Palun vali kõik ${correctCount} vastavusmeetet.`);
      return;
    }
    const allCorrect = chosen.every(m => m.correct);
    setIsCorrect(allCorrect);
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
    setIsCorrect(false);
  };

  return (
    <div className={`risk-prioritization ${locked ? (isCorrect ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Vastavusmeetmete määratlemine</h1>
      <div className="instructions">
        <p>
          Vali meetmed, mis aitavad täita küberturbe <strong>õiguslikke</strong> nõudeid. Kokku on&nbsp;
          <strong>{allMeasures.filter(m => m.correct).length}</strong>:
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
        <button onClick={handleReset}>Alusta uuesti</button>
        {!locked ? (
          <button className="primary" onClick={handleSubmit}>Esita valikud</button>
        ) : (
          <button className="primary" onClick={() => navigate('/turvapoliitika_eestvedaja3_leht')}>Edasi</button>
        )}
      </div>
      {feedback && (
        <div className={`message ${isCorrect ? 'message-correct' : 'message-incorrect'}`}>
          {feedback}
        </div>
      )}
      {locked && (
        <div className="explanations">
          <h2>Selgitused:</h2>
          <ul>
            {allMeasures.map(measure => (
              <li key={measure.id}>
                <strong>{measure.text}:</strong> {measure.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Turvapoliitika_eestvedaja2;

