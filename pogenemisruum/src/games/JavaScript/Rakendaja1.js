import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja1.css';

function Rakendaja1() {
  const navigate = useNavigate();
  const correctOrder = [
    "Seadista ruuteri ACL-id",
    "Paigalda tulemüür",
    "Paigalda IDS/IPS süsteem",
    "Rakenda VPN kaugühenduse jaoks",
    "Tugevda lõppseadmete turvalisust"
  ];

  const [steps, setSteps] = useState(() => {
    return [...correctOrder].sort(() => Math.random() - 0.5);
  });
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    if (dragIndex === dropIndex) return;
    const newSteps = [...steps];
    const dragged = newSteps.splice(dragIndex, 1)[0];
    newSteps.splice(dropIndex, 0, dragged);
    setSteps(newSteps);
  };

  const handleSubmit = () => {
    if (steps.join() === correctOrder.join()) {
      setMessage("Õige! Võrgu kaitse on õigesti seadistatud.");
      setIsLocked(true);
    } else {
      setMessage("Järjekord on vale. Palun proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSteps([...correctOrder].sort(() => Math.random() - 0.5));
    setMessage("");
    setIsLocked(false);
  };

  const handleEnd = () => {
    navigate("/");
  };

  return (
    <div className="network-defense">
      <h1>Võrgu kaitse seadistamine</h1>
      <p>Paiguta võrguturbe sammud õigesse järjekorda:</p>
      <ul className="steps-list">
        {steps.map((step, index) => (
          <li key={index}
              draggable={!isLocked}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}>
            {step}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Kontrolli järjekorda</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={handleEnd}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Rakendaja1;
