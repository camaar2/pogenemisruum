import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor2.css';

const allMeasures = [
  { text: "Pilve turvalahendus", explanation: "Pilve turvalahendus tagab, et kriitilised andmed on kaitstud ka hooldusaja jooksul." },
  { text: "Regulaarne sissetungitestimine", explanation: "Sissetungitestimine aitab avastada haavatavusi ja ennetada rünnakuid hooldusajal." },
  { text: "Töötajate koolitus", explanation: "Koolitus ei too kohe tehnilist kaitset hooldusaja jooksul ja seega pole prioriteet." },
  { text: "Andmete krüpteerimine", explanation: "Andmete krüpteerimine kaitseb andmeid, kuid teenuste taastamine rohkem prioriteet." },
  { text: "Juurdepääsu kontroll", explanation: "Juurdepääsu kontroll on oluline, kuid hooldusajal on kriitilisem rakendada pilve turvalahendust ja testimist." }
];
const correctMeasures = ["Pilve turvalahendus", "Regulaarne sissetungitestimine"];

export default function Audiitor2() {
  const navigate = useNavigate();
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
      setFeedback("Vale valik! Kontrolli, et valitud meetmed taastavad teenuste turvalisuse hooldusaja jooksul.");
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
        Hooldusaken jättis süsteemid ajutiselt ilma kaitseta. Sinu ülesanne on valida need kaks peamist turvameedet, mis:
      </p>
      <ul className="criteria-list">
        <li><strong>Katab otsese teenuste taastamise:</strong> vali lahendus, mis tagab kiire ja usaldusväärse kaitse hooldusaja jooksul.</li>
        <li><strong>Testib ja ennetab rünnakuid:</strong> vali meetod, mis aitab leida ja sulgeda haavatavused kohe pärast hooldusakna lõppu.</li>
      </ul>
      <p>Vali täpselt <strong>{correctMeasures.length}</strong> meedet. Kui oled valmis, klõpsa “Esita valikud”.</p>
      <ul className="measure-list">
        {allMeasures.map(m => (
          <li
            key={m.text}
            onClick={() => toggleMeasure(m.text)}
            className={
              selected.includes(m.text)
                ? checked
                  ? correctMeasures.includes(m.text)
                    ? 'selected-correct'
                    : 'selected-incorrect'
                  : 'selected'
                : ''
            }
          >
            <input type="checkbox" checked={selected.includes(m.text)} readOnly /> {m.text}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button className="reset" onClick={handleReset}>
          Alusta uuesti
        </button>
        {!checked ? (
          <button className="primary submit" onClick={handleSubmit} disabled={selected.length === 0}>
            Esita valikud
          </button>
        ) : (
          feedback.startsWith("Õige") && (
            <button className="primary next" onClick={() => navigate('/audiitor3_leht')}>
              Edasi
            </button>
          )
        )}
      </div>
      {feedback && <div className={`feedback ${feedbackClass}`}>{feedback}</div>}
      {report && <div className="report">{report}</div>}
      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {allMeasures.map(m => (
              <li key={m.text}>
                <strong>{m.text}:</strong> {m.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
