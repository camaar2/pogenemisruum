import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht4.css';

const initialFiles = [
  {
    id: 1,
    fileName: "trojan_payment.exe",
    location: "C:\\Users\\Public\\Downloads",
    description:
      "Failinimi ja asukoht võivad viidata pahatahtlikule programmile, " +
      "mis võib süsteemiga ootamatuid ühendusi luua.",
    hint:
      "Fail asub allalaadimiste kaustas – kontrolli alati allkirja ja tootjat enne käivitamist.",
    isMalware: true,
  },
  {
    id: 2,
    fileName: "svchost.exe",
    location: "C:\\Windows\\System32",
    description:
      "Programm töötab süsteemikaustas ja nime järgi sarnaneb Windowsi teenusega.",
    hint:
      "Windowsi protsessid paiknevad System32 kaustas – neid ei tasu kergekäeliselt eemaldada.",
    isMalware: false,
  },
  {
    id: 3,
    fileName: "miner-tool.sh",
    location: "/usr/local/bin",
    description:
      "Shell-skript nimega “miner” võib taustal käivitudes krüptovaluuta kaevandada.",
    hint:
      "Vaata skripti sisu – kas seal on viiteid kaevandamisele või muule ebatavalisele?",
    isMalware: true,
  },
  {
    id: 4,
    fileName: "texteditor.exe",
    location: "C:/Program Files/TextEditor/",
    description:
      "Tavaline tekstiredaktor Program Files kaustas.",
    hint:
      "Legitiimsed rakendused installitakse autoritatiseeritud tootjate poolt.",
    isMalware: false,
  },
];

export default function Infoturbe_juht4() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selections, setSelections] = useState({});
  const [status, setStatus] = useState({});
  const [showHints, setShowHints] = useState({});
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    setFiles([...initialFiles].sort(() => Math.random() - 0.5));
  }, []);

  const malwareCount = initialFiles.filter(f => f.isMalware).length;
  const safeCount = initialFiles.length - malwareCount;

  const handleSelect = (id, val) => {
    if (locked) return;
    setSelections(prev => ({ ...prev, [id]: val }));
  };

  const handleHint = id => {
    setShowHints(prev => ({ ...prev, [id]: true }));
  };

  const handleSubmit = () => {
    if (Object.keys(selections).length < files.length) {
      setMessage({ 
        text: `Vali täpselt ${malwareCount} faili “Pahavara” ja ${safeCount} faili “Ohutu”.`, 
        type: "error" 
      });
      return;
    }

    let allCorrect = true;
    const newStatus = {};

    files.forEach(f => {
      const correct = f.isMalware ? "pahavara" : "ohutu";
      if (selections[f.id] === correct) {
        newStatus[f.id] = "correct";
      } else {
        newStatus[f.id] = "incorrect";
        allCorrect = false;
      }
    });

    setStatus(newStatus);

    if (allCorrect) {
      setMessage({ 
        text: `🎉 Tubli! Leidsite ${malwareCount} pahatahtlikku ja ${safeCount} ohutut faili.`, 
        type: "success" 
      });
      setLocked(true);
    } else {
      setMessage({ 
        text: "❌ Mõned valikud olid valed. Vaadake vihjet ja proovige uuesti.", 
        type: "error" 
      });
    }
  };

  const handleReset = () => {
    setFiles([...initialFiles].sort(() => Math.random() - 0.5));
    setSelections({});
    setStatus({});
    setShowHints({});
    setLocked(false);
    setMessage({ text: "", type: "" });
  };

  return (
    <div className={`malware-game ${locked ? "correct-bg" : message.type === "error" && !locked ? "incorrect-bg" : ""}`}>
      <h1>Pahavara tuvastamine</h1>
      <p className="storyline">
        Oled digitaalse forensiku rollis: sinu ülesanne on eristada süsteemis {malwareCount} pahatahtlikku faili.
      </p>
      <p className="instruction">
        Märgi täpselt <strong>{malwareCount}</strong> faili <em>pahavaraks</em> ja ülejäänud <strong>{safeCount}</strong> faili <em>ohutuks</em>.<br/>
        Vajadusel kasuta iga faili juures nuppu “Vihje”.
      </p>

      <div className="file-list">
        {files.map(f => (
          <div key={f.id} className={`file-card ${status[f.id] || ""}`}>
            <h3>{f.fileName}</h3>
            <p className="location">Asukoht: {f.location}</p>
            <p className="description">{f.description}</p>

            <div className="options">
              <label className={selections[f.id] === "pahavara" ? "selected" : ""}>
                <input
                  type="radio"
                  name={`file-${f.id}`}
                  value="pahavara"
                  checked={selections[f.id] === "pahavara"}
                  onChange={() => handleSelect(f.id, "pahavara")}
                  disabled={locked}
                /> Pahavara
              </label>
              <label className={selections[f.id] === "ohutu" ? "selected" : ""}>
                <input
                  type="radio"
                  name={`file-${f.id}`}
                  value="ohutu"
                  checked={selections[f.id] === "ohutu"}
                  onChange={() => handleSelect(f.id, "ohutu")}
                  disabled={locked}
                /> Ohutu
              </label>
            </div>

            <button
              className="hint-button"
              onClick={() => handleHint(f.id)}
              disabled={locked || showHints[f.id]}
            >
              Vihje
            </button>
            {showHints[f.id] && <div className="hint-box">{f.hint}</div>}
          </div>
        ))}
      </div>

      <div className="buttons">
        {!locked ? (
          <>
            <button className="primary" onClick={handleSubmit}>Esita hinnangud</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button className="primary" onClick={() => navigate("/")}>Lõpeta mäng</button>
        )}
      </div>

      {message.text && (
        <div className={`message ${message.type === "success" ? "message-correct" : "message-incorrect"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}