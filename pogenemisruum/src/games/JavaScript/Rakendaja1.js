import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja1.css';

function Rakendaja1() {
  const navigate = useNavigate();
  const correctOrder = [
    "Configure Router ACLs",
    "Deploy Firewall",
    "Install IDS/IPS",
    "Implement VPN for Remote Access",
    "Enforce Endpoint Security"
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
      setMessage("Correct! Network defense is properly configured.");
      setIsLocked(true);
    } else {
      setMessage("The order is incorrect. Please try again.");
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
      <h1>Network Defense Setup</h1>
      <p>Arrange the network security steps in the correct order:</p>
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
            <button onClick={handleSubmit}>Check Order</button>
            <button onClick={handleReset}>Reset</button>
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
