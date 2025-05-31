import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja1.css';

const correctOrder = [
  "Seadista ruuteri ACL-id",
  "Paigalda tulemüür",
  "Paigalda IDS/IPS",
  "Rakenda VPN-ühendus",
  "Tugevda lõppseadmed"
];

export default function Rakendaja1() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(() => [...correctOrder].sort(() => Math.random() - 0.5));
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("");

  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData("text/plain", idx);
  };

  const handleDragOver = e => e.preventDefault();

  const handleDrop = (e, idx) => {
    e.preventDefault();
    if (locked) return;
    const dragIdx = +e.dataTransfer.getData("text/plain");
    if (dragIdx === idx) return;
    const a = [...steps];
    const [moved] = a.splice(dragIdx, 1);
    a.splice(idx, 0, moved);
    setSteps(a);
  };

  const handleSubmit = () => {
    setLocked(true);
    const allCorrect = steps.every((s, i) => s === correctOrder[i]);
    setMessage(allCorrect
      ? "🎉 Õige järjestus! Võrgu kaitse valmis."
      : "❌ Vale järjestus. Proovi uuesti.");
  };

  const handleReset = () => {
    setSteps([...correctOrder].sort(() => Math.random() - 0.5));
    setLocked(false);
    setMessage("");
  };

  const handleNext = () => navigate("/rakendaja2_leht");

  const containerClass = locked
    ? message.startsWith("🎉") ? "correct-bg" : "incorrect-bg"
    : "";

  const messageClass = locked
    ? message.startsWith("🎉") ? "message-correct" : "message-incorrect"
    : "";

  return (
    <div className={`network-defense ${containerClass}`}>
      <h1>Võrgu kaitse seadistamine</h1>
      <p className="scenario">
        <em>
          Turvealane ründevektor nõuab korrektset konfiguratsiooni etapiti: 
          esmalt piirangud ACL-idega, seejärel tulemüür, IDS/IPS, kaugühendus VPN-iga ja lõppseadmete tugevdamine.
        </em>
      </p>
      <ol className="logic-list">
        <li><strong>Seadista ruuteri ACL-id</strong>: piiritle, kes ja mis aadressid saavad võrku pääseda.</li>
        <li><strong>Paigalda tulemüür</strong>: filtreeri sissetulev ja väljaminev liiklus keskeltläbi.</li>
        <li><strong>Paigalda IDS/IPS</strong>: tuvastab ja blokeerib kahtlast tegevust reaalajas.</li>
        <li><strong>Rakenda VPN-ühendus</strong>: võimalda turvaline kaugtöötlus krüpteeritud tunneli kaudu.</li>
        <li><strong>Tugevda lõppseadmed</strong>: uuenda paroolid, lülita sisse viirusetõrje ja luba ainult lubatud teenused.</li>
      </ol>
      <p className="instruction">
        Paiguta <strong>{correctOrder.length}</strong> sammu korrektse loogika järgi.
      </p>
      <ul className="steps-list">
        {steps.map((step, idx) => (
          <li
            key={idx}
            draggable={!locked}
            onDragStart={e => handleDragStart(e, idx)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, idx)}
            className={locked
              ? step === correctOrder[idx] ? "correct" : "incorrect"
              : ""}
          >
            {step}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!locked ? (
          <>
            <button className="primary" onClick={handleSubmit}>Kontrolli järjekorda</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : message.startsWith("🎉") ? (
          <button className="primary" onClick={handleNext}>Edasi</button>
        ) : (
          <button onClick={handleReset}>Proovi uuesti</button>
        )}
      </div>
      {message && <div className={`message ${messageClass}`}>{message}</div>}
    </div>
  );
}
