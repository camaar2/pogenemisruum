import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija1.css';

export default function Digi_toendite_uurija1() {
  const navigate = useNavigate();

  const correctOrder = [
    { text: "Tõendite konfiskeerimine", explanation: "Seadmed tuleb esmalt konfiskeerida, et vältida andmete sabotaaži." },
    { text: "Järelduse ahela vorm täidetud", explanation: "Dokumentatsioon tagab, et kõik sammud on kirjas ja järelevalve võimalik." },
    { text: "Digitaalse salvestusseadme arestimine", explanation: "Füüsiliste salvestusseadmete arestimine takistab andmete kadumist või muutmist." },
    { text: "Forenseeriline kujutis tehtud", explanation: "Bititasandiline kloon tagab, et analüüsitakse koopiat, mitte originaalset seadet." },
    { text: "Analüüs laboris", explanation: "Laboris analüüsitakse koopiat, et tuvastada pahatahtlik tegevus." }
  ];

  const [items, setItems] = useState(
    () => [...correctOrder].map(i => i.text).sort(() => Math.random() - 0.5)
  );
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');

  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData('text/plain', idx);
  };
  const handleDragOver = e => e.preventDefault();
  const handleDrop = (e, dropIdx) => {
    e.preventDefault();
    if (checked) return;
    const dragIdx = Number(e.dataTransfer.getData('text/plain'));
    if (dragIdx === dropIdx) return;
    const arr = [...items];
    const [moved] = arr.splice(dragIdx, 1);
    arr.splice(dropIdx, 0, moved);
    setItems(arr);
  };

  const handleSubmit = () => {
    setChecked(true);
    if (items.every((it, i) => it === correctOrder[i].text)) {
      setMessage('🎉 Ahela sammud on korrektset järjekorda asetatud. Jätka järgmise etapi juurde.');
    } else {
      setMessage(
        '❌ Mõned sammud ei vasta nõutud loogikale. Vaata üle ja proovi uuesti.'
      );
    }
  };

  const handleReset = () => {
    setItems([...correctOrder].map(i => i.text).sort(() => Math.random() - 0.5));
    setChecked(false);
    setMessage('');
  };

  const handleNext = () => navigate('/digi_toendite_uurija2_leht');

  const containerClass =
    checked && message.startsWith('🎉')
      ? 'correct-bg'
      : checked
      ? 'incorrect-bg'
      : '';
  const messageClass = checked
    ? message.startsWith('🎉')
      ? 'message-correct'
      : 'message-incorrect'
    : '';

  return (
    <div className={`evidence-chain ${containerClass}`}>
      <h1>Tõendite ahela sammude järjestamine</h1>
      <p className="scenario">
        Digitaalse forensika protsess eeldab rangeid, dokumenteeritud samme, mis tagavad
        andmete puutumatus­tõe ja kohtus kasutatavuse. Ahela sammud tuleb asetada
        õigesse järjekorda:
      </p>
      <ol className="logic-list">
        <li>
          <strong>Tõendite konfiskeerimine:</strong> eemalda seadmed, et peatada andmete muutmine.
        </li>
        <li>
          <strong>Järelduse ahela vorm täidetud:</strong> dokumenteeri konfiskeerimine vastavalt standarditele.
        </li>
        <li>
          <strong>Digitaalse salvestusseadme arestimine:</strong> aresti kettad ja mälupulgad, et vältida sekkumist.
        </li>
        <li>
          <strong>Forenseeriline kujutis tehtud:</strong> loo bititasandiline kloon, et analüüsida koopiat.
        </li>
        <li>
          <strong>Analüüs laboris:</strong> vii läbi detailne uurimine koopial, et tuvastada pahatahtlik tegevus.
        </li>
      </ol>
      <ul className="chain-list">
        {items.map((item, idx) => (
          <li
            key={idx}
            draggable={!checked}
            onDragStart={e => handleDragStart(e, idx)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, idx)}
            className={!checked ? '' : item === correctOrder[idx].text ? 'correct' : 'incorrect'}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={handleReset}>Alusta uuesti</button>
        {!checked ? (
          <button className="primary" onClick={handleSubmit}>
            Esita valikud
          </button>
        ) : message.startsWith('🎉') ? (
          <button className="primary" onClick={handleNext}>
            Edasi
          </button>
        ) : (
          <button onClick={handleReset}>Proovi uuesti</button>
        )}
      </div>
      {message && <div className={`message ${messageClass}`}>{message}</div>}
      {checked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {correctOrder.map((item, idx) => (
              <li key={idx}>
                <strong>{item.text}:</strong> {item.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}