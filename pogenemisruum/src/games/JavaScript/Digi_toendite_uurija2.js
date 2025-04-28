import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija2.css';

export default function Digi_toendite_uurija2() {
  const navigate = useNavigate();
  const logid = [
    { id: 1, line: "2023-05-01 08:15:23 - INFO - Süsteem käivitus edukalt", anomaly: false },
    { id: 2, line: "2023-05-01 08:16:10 - WARNING - Ebatavaline sisselogimine aadressilt 192.168.1.100", anomaly: true },
    { id: 3, line: "2023-05-01 08:17:55 - INFO - Planeeritud varukoopia lõpetatud", anomaly: false },
    { id: 4, line: "2023-05-01 08:18:45 - ERROR - Mitu ebaõnnestunud sisselogimist tuvastatud", anomaly: true },
    { id: 5, line: "2023-05-01 08:20:00 - INFO - Admin-kasutaja sisse logitud", anomaly: false }
  ];

  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleCheckboxChange = id => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    let correct = true;
    logid.forEach(log => {
      if (log.anomaly !== !!selected[log.id]) correct = false;
    });
    if (correct) {
      setMessage("Kõik anomaaliad tuvastatud!");
      setIsLocked(true);
    } else {
      setMessage("Mõned anomaaliad jäid märkimata või valepositiivsed valitud. Proovi uuesti.");
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
      <h1>Logianomaaliate tuvastamine</h1>
      <p>Vali logikirjed, mis viitavad anomaaliatele:</p>
      <table className="log-table">
        <thead>
          <tr>
            <th>Vali</th>
            <th>Logikirje</th>
          </tr>
        </thead>
        <tbody>
          {logid.map(log => (
            <tr
              key={log.id}
              className={
                isLocked
                  ? log.anomaly === !!selected[log.id]
                    ? "correct"
                    : "incorrect"
                  : ""
              }
            >
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
            <button onClick={handleSubmit}>Kontrolli valikuid</button>
            <button onClick={handleReset}>Lähtesta</button>
          </>
        )}
        {isLocked && <button onClick={handleNext}>Edasi</button>}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}