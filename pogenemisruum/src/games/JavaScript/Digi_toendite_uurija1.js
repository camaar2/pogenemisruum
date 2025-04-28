import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija1.css';

function Digi_toendite_uurija1() {
  const navigate = useNavigate();
  const correctOrder = [
    "Initial Seizure (Physical evidence collected from scene)",
    "Chain-of-custody Form Completed",
    "Digital Storage Device Seized",
    "Forensic Imaging Performed",
    "Analysis in Lab"
  ];

  const [items, setItems] = useState(() => {
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
    const newItems = [...items];
    const draggedItem = newItems.splice(dragIndex, 1)[0];
    newItems.splice(dropIndex, 0, draggedItem);
    setItems(newItems);
  };

  const handleSubmit = () => {
    if (items.join() === correctOrder.join()) {
      setMessage("Chain-of-custody order is correct!");
      setIsLocked(true);
    } else {
      setMessage("The order is incorrect. Please try again.");
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
      <h1>Evidence Chain Ordering</h1>
      <p>Drag and drop the evidence items into the correct chain-of-custody order:</p>
      <ul className="chain-list">
        {items.map((item, index) => (
          <li key={index}
              draggable={!isLocked}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}>
            {item}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Check Order</button>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
        {isLocked && (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Digi_toendite_uurija1;
