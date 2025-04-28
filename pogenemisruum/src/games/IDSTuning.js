import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IDSTuning.css';

function IDSTuning() {
  const alerts = [
    { id: 1, text: "Multiple failed logins detected from 10.0.0.5", threat: true },
    { id: 2, text: "Scheduled backup completed successfully", threat: false },
    { id: 3, text: "Suspicious outbound traffic to unknown IP", threat: true },
    { id: 4, text: "System maintenance window started", threat: false },
    { id: 5, text: "Unusual increase in network traffic on port 3389", threat: true }
  ];

  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    let correct = true;
    alerts.forEach(alert => {
      if (alert.threat !== !!selected[alert.id]) {
        correct = false;
      }
    });
    if (correct) {
      setMessage("All genuine threats identified!");
      setIsLocked(true);
    } else {
      setMessage("Some alerts are misclassified. Try again.");
    }
  };

  const handleReset = () => {
    setSelected({});
    setMessage("");
    setIsLocked(false);
  };

  const handleEnd = () => {
    navigate("/");
  };

  return (
    <div className="ids-tuning">
      <h1>IDS Alert Tuning</h1>
      <p>Select the alerts that indicate real threats:</p>
      <table className="alerts-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Alert Message</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id} className={isLocked ? (alert.threat === !!selected[alert.id] ? "correct" : "incorrect") : ""}>
              <td>
                <input 
                  type="checkbox"
                  checked={!!selected[alert.id]}
                  onChange={() => handleSelect(alert.id)}
                  disabled={isLocked}
                />
              </td>
              <td>{alert.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Check Alerts</button>
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

export default IDSTuning;
