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
  const [measures, setMeasures] = useState(allMeasures);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [report, setReport] = useState("");

  const scenario = "IT-infrastruktuuris oli plaanimatu hooldusaken, kus turvasüsteemid olid ajutiselt väljalülitatud.",
        reference = "Viide: ISO/IEC 27001 Annex A.12.6 ja A.14.2";

  const toggleMeasure = m => {
    if (selected.includes(m)) setSelected(prev => prev.filter(x => x !== m));
    else setSelected(prev => [...prev, m]);
  };

  const isCorrect = () => selected.length === correctMeasures.length && correctMeasures.every(m => selected.includes(m));

  const handleSubmit = () => {
    if (isCorrect()) {
      setFeedback("Õige! Kõik vajalikud meetmed valitud.");
      setReport(`Audit kokkuvõte: ${scenario} Soovitused: ${correctMeasures.join(', ')}. ${reference}.`);
    } else {
      setFeedback("Vale valik! Kontrolli uuesti.");
    }
  };

  const handleReset = () => {
    setSelected([]);
    setFeedback("");
    setReport("");
  };

  return (
    <div className="cyadvice-stage2">
      <h2>Turvameetmete kava</h2>
      <p><em>{scenario}</em></p>
      <ul className="measure-list">
        {measures.map(m => (
          <li key={m} onClick={() => toggleMeasure(m)} className={selected.includes(m) ? "selected" : ""}>
            <input type="checkbox" checked={selected.includes(m)} readOnly /> {m}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Esita</button>
      {feedback && <div className="feedback">{feedback}</div>}
      {report && <div className="report">{report}</div>}
      {report && <button onClick={() => navigate('/audiitor3')}>Edasi</button>}
    </div>
  );
}
