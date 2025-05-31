import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija1.css';

function Kuberturvalisuse_uurija1() {
  const tools = [
    {
      id: "fileinfo",
      text: "Failiinfo",
      tooltip: "Näitab failis peituvaid tekste ja infot ilma seda käivitamata"
    },
    {
      id: "sandbox",
      text: "Liivakast",
      tooltip: "Käivita fail turvalises testkeskkonnas, mis ei ohusta su arvutit"
    },
    {
      id: "network",
      text: "Võrguliikluse jälgija",
      tooltip: "Vaata, kuhu fail üritab internetis ühenduda"
    },
    {
      id: "run",
      text: "Käivita oma arvutis",
      tooltip: "Ohtlik – ei kasuta praegu"
    },
    {
      id: "delete",
      text: "Kustuta kohe",
      tooltip: "Eemaldab faili enne, kui midagi õppida jõuaksime"
    }
  ];

  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isCorrectChoice, setIsCorrectChoice] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const hasFileInfo = selected.includes("fileinfo");
    const hasSandbox = selected.includes("sandbox");
    const hasNetwork = selected.includes("network");
    const hasDanger = selected.includes("run") || selected.includes("delete");

    if (hasFileInfo && hasSandbox && hasNetwork && !hasDanger) {
      setMessage("Hea töö! Oled valinud turvalised tööriistad. Jätka järgmises etapis.");
      setIsLocked(true);
      setIsCorrectChoice(true);
    } else {
      setMessage(
        "⚠️ Proovi uuesti. Vali vähemalt 'Failiinfo', 'Liivakast' ja 'Võrguliikluse jälgija'. Ohtlikke valikuid praegu ei kasuta."
      );
      setIsCorrectChoice(false);
    }
  };

  const handleReset = () => {
    setSelected([]);
    setMessage("");
    setIsLocked(false);
    setIsCorrectChoice(null);
  };

  const handleNext = () => navigate("/kuberturvalisuse_uurija2");

  const containerClass =
    isCorrectChoice === true
      ? "malware-analysis-start correct-choice"
      : isCorrectChoice === false
      ? "malware-analysis-start incorrect-choice"
      : "malware-analysis-start";

  return (
    <div className={containerClass}>
      <h1>Esialgne failiuuring</h1>
      <p>Vali tööriistad, millega uurida kahtlast faili turvaliselt.</p>

      <div className="tools">
        {tools.map((tool) => (
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
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Esita valikud</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Kuberturvalisuse_uurija1;