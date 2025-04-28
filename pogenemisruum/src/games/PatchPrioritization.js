import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatchPrioritization.css';

function PatchPrioritization() {
  const navigate = useNavigate();
  const vulnerabilities = [
    { id: 1, name: "Zero-Day in Web Server", risk: 9 },
    { id: 2, name: "Outdated OS Patch", risk: 7 },
    { id: 3, name: "Misconfigured Firewall", risk: 8 },
    { id: 4, name: "Weak Encryption Protocol", risk: 10 },
    { id: 5, name: "Third-Party Software Bug", risk: 6 }
  ];

  // Sorteeri esialgu juhuslikult
  const [items, setItems] = useState(() => vulnerabilities.sort(() => Math.random() - 0.5));
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
    // Oodatav järjekord: risk järjestatud kahanevas järjekorras
    const correctOrder = [...vulnerabilities].sort((a, b) => b.risk - a.risk);
    const isCorrect = newItemsEqual(items, correctOrder);
    if (isCorrect) {
      setMessage("Correct! The vulnerabilities are prioritized properly.");
      setIsLocked(true);
    } else {
      setMessage("The prioritization is incorrect. Please try again.");
    }
  };

  // Funktsioon, mis kontrollib kahe massiivi sisu võrdust
  const newItemsEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].id !== b[i].id) return false;
    }
    return true;
  };

  const handleReset = () => {
    setItems(vulnerabilities.sort(() => Math.random() - 0.5));
    setMessage("");
    setIsLocked(false);
  };

  const handleEnd = () => {
    navigate("/");
  };

  return (
    <div className="patch-prioritization">
      <h1>Patch Prioritization Challenge</h1>
      <p>Order the vulnerabilities from highest to lowest risk:</p>
      <ul className="vuln-list">
        {items.map((item, index) => (
          <li key={item.id}
              draggable={!isLocked}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}>
            {item.name} (Risk: {item.risk})
          </li>
        ))}
      </ul>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Check Order</button>
            <button onClick={handleReset}>Reset</button>
          </>
        ) : (
          <button onClick={handleEnd}>Finish Game</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default PatchPrioritization;
