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

  const [items, setItems] = useState(() =>
    [...correctOrder].sort(() => Math.random() - 0.5)
  );
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    if (dragIndex === dropIndex) return;
    const newItems = [...items];
    const [dragged] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, dragged);
    setItems(newItems);
  };

  const handleSubmit = () => {
    if (items.join() === correctOrder.join()) {
      setMessage("Järelduse ahela järjekord on õige!");
      setIsLocked(true);
    } else {
      setMessage("Järjestus on vale. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setItems([...correctOrder].sort(() => Math.random() - 0.5));
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate("/digi_toendite_uurija2");
  };

  return (
    <div className="evidence-chain">
      <h1>Tõendite ahela järjekord</h1>
      <p>Paiguta üksused õige järelduse ahela järjekorda:</p>
      <ul className="chain-list">
        {items.map((item, index) => (
          <li
            key={index}
            draggable={!isLocked}
            onDragStart={e => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Kontrolli järjestust</button>
            <button onClick={handleReset}>Lähtesta</button>
          </>
        )}
        {isLocked && <button onClick={handleNext}>Edasi</button>}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}