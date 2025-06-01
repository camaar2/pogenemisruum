import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija2.css';

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const logLines = [
  { id: 1, text: 'Fail üritas ühenduda kahtlasele veebiaadressile', isSuspicious: true },
  { id: 2, text: 'Tavaline kasutaja logis sisse sisevõrku', isSuspicious: false },
  { id: 3, text: 'PowerShell laadis internetist faili', isSuspicious: true },
  { id: 4, text: 'Antiviirus uuendas ennast edukalt', isSuspicious: false },
  { id: 5, text: 'Kaugjuhtimispääs (RDP) välisest IP‑aadressist', isSuspicious: true },
  { id: 6, text: 'DNS päring google.com‑ile', isSuspicious: false },
  { id: 7, text: 'Ajastatud ülesanne lisas uue skripti', isSuspicious: true },
  { id: 8, text: 'Explorer käivitati Program Files kaustast', isSuspicious: false },
  { id: 9, text: 'Programm käivitati Temp kaustast', isSuspicious: true },
  { id: 10, text: 'Windows Update teenus käivitati', isSuspicious: false }
];

function Kuberturvalisuse_uurija2() {
  const navigate = useNavigate();

  const [events, setEvents] = useState(() => shuffleArray(logLines));
  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState('');
  const [locked, setLocked] = useState(false);

  const toggleSelect = (evt) => {
    if (locked) return;
    setSelected((prev) => ({ ...prev, [evt.id]: !prev[evt.id] }));
  };

  const checkAnswers = () => {
    const allCorrect = events.every((evt) => evt.isSuspicious === !!selected[evt.id]);

    if (allCorrect) {
      setMessage('Tubli! Leidsid kõik kahtlased sündmused. Järgmisena koostad raporti.');
      setLocked(true);
    } else {
      setMessage('Mõni sündmus jäi märkamata või valisid vale. Proovi uuesti.');
    }
  };

  const reset = () => {
    setSelected({});
    setMessage('');
    setLocked(false);
    setEvents(shuffleArray(logLines));
  };

  const nextStage = () => navigate('/kuberturvalisuse_uurija3');

  return (
    <div className="event-triage">
      <h1>Logisündmuste triaaž</h1>
      <p>Klõpsa ridadel, mis näivad kahtlased.</p>

      <div className="log-list">
        {events.map((evt) => {
          let cls = 'log-line';
          if (locked) {
            if (evt.isSuspicious) {
              cls += selected[evt.id] ? ' correct' : ' missed';
            } else {
              cls += selected[evt.id] ? ' wrong' : ' neutral';
            }
          } else if (selected[evt.id]) {
            cls += ' chosen';
          }
          return (
            <div key={evt.id} className={cls} onClick={() => toggleSelect(evt)}>
              {evt.text}
            </div>
          );
        })}
      </div>

      <div className="buttons">
        {!locked ? (
          <>
            <button onClick={checkAnswers}>Esita valikud</button>
            <button onClick={reset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={nextStage}>Edasi</button>
        )}
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Kuberturvalisuse_uurija2;
