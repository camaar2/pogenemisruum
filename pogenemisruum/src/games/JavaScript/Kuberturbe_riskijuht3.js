import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_riskijuht3.css';

const logs = [
  { id: 1, text: "INFO: Server started successfully", risk: false },
  { id: 2, text: "WARNING: Unusual login attempt from IP 203.0.113.45", risk: true },
  { id: 3, text: "INFO: Scheduled backup completed", risk: false },
  { id: 4, text: "ERROR: 30 failed SSH login attempts detected", risk: true },
  { id: 5, text: "INFO: Routine system check passed", risk: false },
  { id: 6, text: "WARNING: Unexpected file change in /etc/passwd", risk: true }
];

function Kuberturbe_riskijuht3() {
  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    if (isLocked) return;
    setMessage("");
    setShowExplanation(false);
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    const correctRiskIds = logs.filter(log => log.risk).map(log => log.id).sort();
    const selectedIds = Object.keys(selected)
      .filter(id => selected[id])
      .map(Number)
      .sort((a, b) => a - b);

    if (JSON.stringify(correctRiskIds) === JSON.stringify(selectedIds)) {
      setMessage("Hea töö, kõik riskid on õigesti märgitud.");
      setIsLocked(true);
      setShowExplanation(true);
    } else {
      setMessage("Mõned riskid on vale; kontrolli oma valikuid.");
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setSelected({});
    setMessage("");
    setShowExplanation(false);
  };

  const handleNext = () => {
    navigate("/kuberturbe_riskijuht4_leht");
  };

  return (
    <div className={`devops-stage3 ${isLocked ? 'correct-bg' : (message && !isLocked ? 'incorrect-bg' : '')}`}>
      <h1>Süsteemide monitooring ja logide analüüs</h1>
      <p>Vormi tabelis märgi logirida, mis viitavad turvariskile:</p>

      <table className="logs-table">
        <thead>
          <tr>
            <th>Valik</th>
            <th>Logirida</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} className={
              isLocked
                ? log.risk
                  ? "correct" 
                  : (selected[log.id] ? "incorrect" : "")
                : (selected[log.id] ? "selected" : "")
            }>
              <td>
                <input 
                  type="checkbox" 
                  checked={!!selected[log.id]} 
                  onChange={() => handleCheckboxChange(log.id)}
                  disabled={isLocked}
                />
              </td>
              <td>{log.text}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showExplanation && (
        <div className="explanation">
          <h3>Selgitus logiridade turvariskidest:</h3>
          <ul>
            <li>
              <strong>“WARNING: Unusual login attempt from IP 203.0.113.45”</strong> – kahtlane sisselogimise katse võib viidata ründajale, kes testib paroole või püüab jõuga sisselogida.
            </li>
            <li>
              <strong>“ERROR: 30 failed SSH login attempts detected”</strong> – suur hulk ebaõnnestunud SSH-login’uid näitab ilmselt bruteforce-rünnakut.
            </li>
            <li>
              <strong>“WARNING: Unexpected file change in /etc/passwd”</strong> – faili /etc/passwd muutmine võib tähendada, et ründaja on pääsenud juurdepääsu või üritab luua varjatud süsteemirolle.
            </li>
            <li>
              <em>“INFO: Server started successfully”, “INFO: Scheduled backup completed” ja “INFO: Routine system check passed”</em> on tavalised teavitused ega näita turvariske.
            </li>
          </ul>
        </div>
      )}

      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset-button" onClick={handleReset}>
              Alusta uuesti
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Esita valikud
            </button>
          </>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Edasi
          </button>
        )}
      </div>

      {message && (
        <div className={`message ${isLocked ? "message-correct" : "message-incorrect"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Kuberturbe_riskijuht3;

