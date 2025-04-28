import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija3.css';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const vulnerabilitiesData = [
  { id: 1, name: "SQL Injection", correctLevel: "high" },
  { id: 2, name: "Aegunud SSH-versioon", correctLevel: "medium" },
  { id: 3, name: "Administraatori paneelil puudub parool", correctLevel: "high" },
  { id: 4, name: "XSS haavatavus", correctLevel: "medium" },
  { id: 5, name: "Vale konfiguratsioon andmebaasis", correctLevel: "low" },
  { id: 6, name: "Poliitikate puudumine", correctLevel: "medium" }
];

function Kuberturvalisuse_uurija3() {
  const [vulns, setVulns] = useState(() => shuffleArray(vulnerabilitiesData));
  const [levels, setLevels] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleLevelChange = (id, value) => {
    setLevels(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    let allCorrect = true;
    vulns.forEach(vuln => {
      if (levels[vuln.id] !== vuln.correctLevel) {
        allCorrect = false;
      }
    });
    if (allCorrect && Object.keys(levels).length === vulns.length) {
      setMessage("Tõid välja täpse kriitilisuse! Liigume lõpp-etappi.");
      setIsLocked(true);
    } else {
      setMessage("Mõni kriitilisuse tase on vale. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setLevels({});
    setMessage("");
    setIsLocked(false);
    setVulns(shuffleArray(vulnerabilitiesData));
  };

  const handleNext = () => {
    navigate("/kuberturvalisuse_uurija4");
  };

  return (
    <div className="vuln-criticality">
      <h1>3. ETAPP: Kriitilisuse määramine</h1>
      <p>Määra iga avastatud haavatavuse kriitilisuse tase:</p>
      <table>
        <thead>
          <tr>
            <th>Haavatavus</th>
            <th>Kriitilisuse tase</th>
          </tr>
        </thead>
        <tbody>
          {vulns.map(vuln => {
            let rowClass = "";
            if (isLocked) {
              if (!levels[vuln.id]) {
                rowClass = "neutral";
              } else if (levels[vuln.id] === vuln.correctLevel) {
                rowClass = "correct";
              } else {
                rowClass = "incorrect";
              }
            }
            return (
              <tr key={vuln.id} className={rowClass}>
                <td>{vuln.name}</td>
                <td>
                  <select
                    value={levels[vuln.id] || ""}
                    onChange={(e) => handleLevelChange(vuln.id, e.target.value)}
                    disabled={isLocked}
                  >
                    <option value="">Vali tase</option>
                    <option value="high">Kõrge</option>
                    <option value="medium">Keskmine</option>
                    <option value="low">Madal</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Esita valikud</button>
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

export default Kuberturvalisuse_uurija3;
