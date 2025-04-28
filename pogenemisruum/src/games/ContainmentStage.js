import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContainmentStage.css';

const hosts = [
  { id: 1, ip: "192.168.1.50", infected: true },
  { id: 2, ip: "192.168.1.51", infected: false },
  { id: 3, ip: "192.168.1.52", infected: true },
  { id: 4, ip: "192.168.1.53", infected: false }
];

function ContainmentStage() {
  const [actions, setActions] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleAction = (hostId, action) => {
    setActions(prev => ({ ...prev, [hostId]: action }));
  };

  const handleSubmit = () => {
    let allCorrect = true;
    hosts.forEach(host => {
      const selected = actions[host.id];
      if (host.infected) {
        if (selected !== "isolate") {
          allCorrect = false;
        }
      } else {
        if (selected === "isolate") {
          allCorrect = false;
        }
      }
    });
    if (allCorrect) {
      setMessage("Rünnaku levik peatatud!");
      setIsLocked(true);
    } else {
      setMessage("Mõne hosti puhul on vale tegevus. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setActions({});
    setMessage("");
  };

  const handleNext = () => {
    navigate("/eradicationrecovery");
  };

  return (
    <div className="containment-stage">
      <h1>2. ETAPP: Piiramine</h1>
      <p>Klõpsa nakatunud hostidel ja vali sobiv tegevus:</p>
      <div className="hosts">
        {hosts.map(host => (
          <div key={host.id} className="host">
            <div className="host-info">
              <span>{host.ip}</span>
              {host.infected && <span className="infected-label">Nakatunud</span>}
            </div>
            <div className="host-actions">
              <button 
                onClick={() => handleAction(host.id, "isolate")}
                className={actions[host.id] === "isolate" ? "selected" : ""}
                disabled={isLocked}
              >
                Eralda võrgust
              </button>
              <button 
                onClick={() => handleAction(host.id, "none")}
                className={actions[host.id] === "none" ? "selected" : ""}
                disabled={isLocked}
              >
                Jäta
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Kontrolli valikuid</button>
            <button onClick={handleReset}>Alusta uuesti</button>
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

export default ContainmentStage;
