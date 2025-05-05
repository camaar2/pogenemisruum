import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor2.css';

const allMeasures = [
  "Pilve turvalahendus",
  "Regulaarne sissetungitestimine",
  "Töötajate koolitus",
  "Andmete krüpteerimine",
  "Juurdepääsu kontroll"
];
const correctMeasures = ["Pilve turvalahendus", "Regulaarne sissetungitestimine"];

export default function Audiitor2() {
  const navigate = useNavigate();
  const [measures] = useState(allMeasures);
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [report, setReport] = useState("");

  const scenario = "IT-infrastruktuuris oli plaanimatu hooldusaken, kus turvasüsteemid olid ajutiselt väljalülitatud.";
  const reference = "Viide: ISO/IEC 27001 Annex A.12.6 ja A.14.2";

  const toggleMeasure = m => {
    if (checked) return;
    setSelected(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  const isCorrect = () =>
    selected.length === correctMeasures.length &&
    correctMeasures.every(m => selected.includes(m));

  const handleSubmit = () => {
    setChecked(true);
    if (isCorrect()) {
      setFeedback("Õige! Kõik vajalikud meetmed valitud.");
      setReport(`Audit kokkuvõte: ${scenario} Soovitatud meetmed turvanõrkuste vähendamiseks: ${correctMeasures.join(', ')}. ${reference}.`);
    } else {
      setFeedback("Vale valik! Kontrolli, et valitud meetmed katavad hooldusaja riskid.");
    }
  };

  const handleReset = () => {
    setSelected([]);
    setChecked(false);
    setFeedback("");
    setReport("");
  };

  const containerClass = checked
    ? feedback.startsWith('Õige') ? 'correct-bg' : 'incorrect-bg'
    : '';
  const feedbackClass = checked
    ? feedback.startsWith('Õige') ? 'message-correct' : 'message-incorrect'
    : '';

  return (
    <div className={`cyadvice-stage2 ${containerClass}`}>
      <h2>Turvameetmete kava</h2>
      <p className="scenario"><em>{scenario}</em></p>
      <p className="description">
        Et viia IT-infrastruktuur kiiresti turvalisse olekusse ja vähendada hooldusaja tekitatud avatusi,
        vali need meetmed, mis taastavad kaitse ja annavad turvalisuskontrollile katvuse hooldusakna vältel.
        Ülesanne on valida <strong>{correctMeasures.length}</strong> peamist meetet.
      </p>
      <ul className="measure-list">
        {measures.map(m => (
          <li
            key={m}
            onClick={() => toggleMeasure(m)}
            className={
              selected.includes(m)
                ? checked
                  ? correctMeasures.includes(m)
                    ? 'selected-correct'
                    : 'selected-incorrect'
                  : 'selected'
                : ''
            }
          >
            <input type="checkbox" checked={selected.includes(m)} readOnly /> {m}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!checked ? (
          <button className="primary" onClick={handleSubmit} disabled={selected.length === 0}>
            Esita
          </button>
        ) : (
          <button className="primary" onClick={handleReset}>
            Alusta uuesti
          </button>
        )}
        {checked && feedback.startsWith('Õige') && (
          <button onClick={() => navigate('/audiitor3')}>
            Edasi
          </button>
        )}
      </div>
      {feedback && <div className={`feedback ${feedbackClass}`}>{feedback}</div>}
      {report && <div className="report">{report}</div>}
    </div>
  );
}