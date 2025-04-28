import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija2.css';

function Digi_toendite_uurija2() {
  const logs = [
    { id: 1, line: "2023-05-01 08:15:23 - INFO - System boot successful", anomaly: false },
    { id: 2, line: "2023-05-01 08:16:10 - WARNING - Unusual login attempt from 192.168.1.100", anomaly: true },
    { id: 3, line: "2023-05-01 08:17:55 - INFO - Scheduled backup completed", anomaly: false },
    { id: 4, line: "2023-05-01 08:18:45 - ERROR - Multiple failed login attempts detected", anomaly: true },
    { id: 5, line: "2023-05-01 08:20:00 - INFO - User admin logged in", anomaly: false }
  ];

  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    let correct = true;
    logs.forEach(log => {
      if (log.anomaly !== !!selected[log.id]) {
        correct = false;
      }
    });
    if (correct) {
      setMessage("All anomalies correctly identified!");
      setIsLocked(true);
    } else {
      setMessage("Some anomalies were missed or false positives selected. Try again.");
    }
  };

  const handleReset = () => {
    setSelected({});
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate("/digi_toendite_uurija3"); 
  };

  return (
    <div className="log-anomaly">
      <h1>Log Anomaly Detection</h1>
      <p>Select the log entries that indicate anomalies:</p>
      <table className="log-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Log Entry</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} className={isLocked ? (log.anomaly === !!selected[log.id] ? "correct" : "incorrect") : ""}>
              <td>
                <input 
                  type="checkbox" 
                  checked={!!selected[log.id]} 
                  onChange={() => handleCheckboxChange(log.id)}
                  disabled={isLocked}
                />
              </td>
              <td>{log.line}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Check Selections</button>
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

export default Digi_toendite_uurija2;
