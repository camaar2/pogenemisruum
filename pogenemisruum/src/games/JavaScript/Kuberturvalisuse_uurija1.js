import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija1.css';

function Kuberturvalisuse_uurija1() {
  const tools = [
    { id: 'nmap', text: "Nmap", tooltip: "Portide avastamise ja võrgu kaardistamise tööriist" },
    { id: 'openvas', text: "OpenVAS", tooltip: "Avatud lähtekoodiga turvaskänner" },
    { id: 'nessus', text: "Nessus-lite", tooltip: "Populaarne turvaskänner" },
    { id: 'manual', text: "Käsitsi testimine", tooltip: "Manuaalne haavatavuste kontroll" },
    { id: 'zap', text: "OWASP ZAP", tooltip: "Automatiseeritud veebirakenduste turvatestija" },
    { id: 'burp', text: "Burp Suite", tooltip: "Veebirakenduste turvalisuse testimise platvorm" },
  ];

  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isCorrectChoice, setIsCorrectChoice] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = () => {
    // Õige lahendus: peab sisaldama "nmap" (portide avastamine)
    // ja vähemalt ühte neist: "openvas" või "nessus"
    // ja ei tohi sisaldada "manual"
    const hasNmap = selected.includes("nmap");
    const hasWebScanner = selected.includes("openvas") || selected.includes("nessus");
    const hasManual = selected.includes("manual");

    if (hasNmap && hasWebScanner && !hasManual) {
      setMessage("Skaneerimine käivitatud! Liigu järgmisse etappi.");
      setIsLocked(true);
      setIsCorrectChoice(true);
    } else {
      setMessage("Vale valik! Vihje: kasutame Nmapi portide avastamiseks ja kas OpenVASi või Nessust veebirakenduse testimiseks. 'Käsitsi testimine' praegu ei sobi.");
      setIsCorrectChoice(false);
    }
  };

  const handleReset = () => {
    setSelected([]);
    setMessage("");
    setIsLocked(false);
    setIsCorrectChoice(null);
  };

  const handleNext = () => {
    navigate("/kuberturvalisuse_uurija2");
  };

  const containerClass = isCorrectChoice === true 
    ? "vuln-scan-start correct-choice"
    : isCorrectChoice === false
      ? "vuln-scan-start incorrect-choice"
      : "vuln-scan-start";

  return (
    <div className={containerClass}>
      <h1>1. ETAPP: Skaneerimise algus</h1>
      <p>Vali tööriistad, mis sobivad turvaaugude skaneerimiseks (portide ja veebirakenduse test).</p>

      <div className="tools">
        {tools.map(tool => (
          <div key={tool.id} className="tool-option">
            <label title={tool.tooltip}>
              <input
                type="checkbox"
                checked={selected.includes(tool.id)}
                onChange={() => handleCheckboxChange(tool.id)}
                disabled={isLocked}
              />
              {tool.text}
            </label>
          </div>
        ))}
      </div>

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

export default Kuberturvalisuse_uurija1;