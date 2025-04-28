import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija2.css';

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const reportLinesData = [
  { id: 1, text: "Port 22 avatud (SSH) – konfiguratsioon kontrollitud", isVulnerable: false },
  { id: 2, text: "Port 80 avatud (HTTP)", isVulnerable: true },
  { id: 3, text: "Veebirakenduse input-valideerimise viga", isVulnerable: true },
  { id: 4, text: "Port 443 avatud (HTTPS)", isVulnerable: false },
  { id: 5, text: "Valehäire: 'potentsiaalne haavatavus X'", isVulnerable: false },
  { id: 6, text: "SQL Injection avastatud andmebaasis", isVulnerable: true },
  { id: 7, text: "MFA on paigaldatud – turvameetmed rakendatud", isVulnerable: false },
  { id: 8, text: "SSL sertifikaat aegunud", isVulnerable: true },
  { id: 9, text: "Võrguliikluse krüpteerimine puudub", isVulnerable: true },
  { id: 10, text: "Turvaline autentimine – paroolipoliitika kehtestatud", isVulnerable: false },
];

const Kuberturvalisuse_uurija2 = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState(() => shuffleArray(reportLinesData));
  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleLineClick = (line) => {
    if (isLocked) return;
    setSelected(prev => ({ ...prev, [line.id]: !prev[line.id] }));
  };

  const handleSubmit = () => {
    let allCorrect = true;
    reports.forEach(line => {
      if (line.isVulnerable) {
        if (!selected[line.id]) {
          allCorrect = false;
        }
      } else {
        if (selected[line.id]) {
          allCorrect = false;
        }
      }
    });
    if (allCorrect) {
      setMessage("Tuvastasid kriitilised haavatavused! Järgmine etapp: haavatavuste tõsiduse hindamine.");
      setIsLocked(true);
    } else {
      setMessage("Mõned tulemused on valepositiivsed või jäävad märkamata. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSelected({});
    setMessage("");
    setIsLocked(false);
    setReports(shuffleArray(reportLinesData));
  };

  const handleNext = () => {
    navigate("/kuberturvalisuse_uurija3");
  };

  return (
    <div className="vuln-result-analysis">
      <h1>2. ETAPP: Tulemuste analüüs</h1>
      <p>Klõpsa ridadel, mis viitavad haavatavustele:</p>
      <div className="report">
        {reports.map(line => {
          let lineClass = "report-line";
          if (isLocked) {
            if (line.isVulnerable) {
              if (selected[line.id]) {
                lineClass += " correct";
              } else {
                lineClass += " incorrect";
              }
            } else {
              if (selected[line.id]) {
                lineClass += " incorrect";
              } else {
                lineClass += " neutral";
              }
            }
          } else {
            if (selected[line.id]) {
              lineClass += " selected";
            }
          }
          return (
            <div
              key={line.id}
              className={lineClass}
              onClick={() => handleLineClick(line)}
            >
              {line.text}
            </div>
          );
        })}
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
};

export default Kuberturvalisuse_uurija2;
