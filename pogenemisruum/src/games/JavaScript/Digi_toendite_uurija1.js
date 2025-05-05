import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija1.css';

export default function Digi_toendite_uurija1() {
  const navigate = useNavigate();
  const correctOrder = [
    "Tõendite konfiskeerimine",
    "Järelduse ahela vorm täidetud",
    "Digitaalse salvestusseadme arestimine",
    "Forenseeriline kujutis tehtud",
    "Analüüs laboris"
  ];

  const [items, setItems] = useState(
    () => [...correctOrder].sort(() => Math.random() - 0.5)
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
    if (items.every((it, i) => it === correctOrder[i])) {
      setMessage('🎉 Ahela sammud on korrektset järjekorda asetatud. Jätka järgmise etapi juurde.');
    } else {
      setMessage(
        '❌ Mõned sammud ei vasta nõutud loogikale. Vaata üle, miks iga samm peab toimuma antud järjekorras, ja proovi uuesti.'
      );
    }
  };

  const handleReset = () => {
    setItems([...correctOrder].sort(() => Math.random() - 0.5));
    setChecked(false);
    setMessage('');
  };

  const handleNext = () => navigate('/digi_toendite_uurija2');

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
          <strong>Tõendite konfiskeerimine:</strong> eemalda esmalt kasutuselt seadmed,
          et peatada igasugune täiendav andmete muutmine.
        </li>
        <li>
          <strong>Järelduse ahela vorm täidetud:</strong> dokumenteeri kõik konfiskeerimistoimingud
          (aeg, koht, isikud), et luua auditi jälg.
        </li>
        <li>
          <strong>Digitaalse salvestusseadme arestimine:</strong> aresti konkreetsed kettad,
          mälupulgad jms, et vältida sekkumist.
        </li>
        <li>
          <strong>Forenseeriline kujutis tehtud:</strong> loo bititasandiline kloon,
          et analüüsida koopiat, mitte originaali.
        </li>
        <li>
          <strong>Analüüs laboris:</strong> vii läbi detailne uurimine (failisüsteemid, logid,
          registrid), tuvastamaks pahatahtlik tegevus.
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
            className={!checked ? '' : item === correctOrder[idx] ? 'correct' : 'incorrect'}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="buttons">
        {!checked ? (
          <button className="primary" onClick={handleSubmit}>
            Kontrolli järjekord
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
    </div>
  );
}
