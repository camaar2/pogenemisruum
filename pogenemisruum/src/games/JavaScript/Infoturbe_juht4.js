import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht4.css';

const initialFiles = [
  {
    id: 1,
    fileName: "trojan_payment.exe",
    location: "C:\Users\Public\Downloads",
    description: "Failinimi ja asukoht võivad viidata pahatahtlikule programmile, mis võib süsteemiga ootamatuid ühendusi luua.",
    hint: "Fail asub allalaadimiste kaustas ja selle käivitamisel kontrolli alati allkirja ja tootjat.",
    isMalware: true,
  },
  {
    id: 2,
    fileName: "svchost.exe",
    location: "C:\Windows\System32",
    description: "Programm töötab süsteemikaustas ja nimetuse järgi sarnaneb see tavalisele Windowsi teenusele.",
    hint: "Windowsi süsteemiprotsessid paiknevad System32 kaustas ja neid ei tasu kergekäeliselt eemaldada.",
    isMalware: false,
  },
  {
    id: 3,
    fileName: "miner-tool.sh",
    location: "/usr/local/bin",
    description: "Shell-skript nimega 'miner' võib viidata ressursikasutusele, eriti kui see käivitub taustal.",
    hint: "Kontrolli skripti sisu – kas seal on viiteid krüptovaluuta kaevandamisele või muule ebaharilikule.",
    isMalware: true,
  },
  {
    id: 4,
    fileName: "texteditor.exe",
    location: "C:/Program Files/TextEditor/",
    description: "Tavaline rakendus Program Files kaustas, mille nimi viitab tekstiredaktorile.",
    hint: "Rakendused paigaldatakse tavapäraselt Program Files kausta autoritatatiivsete allikate poolt.",
    isMalware: false,
  },
];

const Infoturbe_juht4 = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selections, setSelections] = useState({});
  const [fileStatus, setFileStatus] = useState({});
  const [showHints, setShowHints] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setFiles([...initialFiles].sort(() => Math.random() - 0.5));
  }, []);

  const handleChange = (id, value) => {
    if (!isLocked) {
      setSelections(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = () => {
    const status = {};
    let allCorrect = true;

    files.forEach(file => {
      const correct = file.isMalware ? 'pahavara' : 'ohutu';
      if (selections[file.id] === correct) {
        status[file.id] = 'correct';
      } else {
        status[file.id] = 'incorrect';
        allCorrect = false;
      }
    });

    setFileStatus(status);

    if (allCorrect) {
      setMessage({ text: 'Tubli! Kõik ohtlikud failid on täpselt eristatud.', type: 'success' });
      setIsLocked(true);
    } else {
      setMessage({ text: 'Mõni valik jäi ebatäpseks. Kasuta vihjet ja katseta uuesti!', type: 'error' });
    }
  };

  const handleReset = () => {
    setFiles([...initialFiles].sort(() => Math.random() - 0.5));
    setSelections({});
    setFileStatus({});
    setShowHints({});
    setMessage({ text: '', type: '' });
    setIsLocked(false);
  };

  return (
    <div className="malware-game">
      <h1>Pahavara tuvastamine</h1>
      <p className="storyline">
        Oma analüütiku rollis pead otsustama, milliseid programme on teie süsteemis ohutu käivitada ja millised võivad sisaldavad pahaloomulist koodi.
      </p>

      <div className="file-list">
        {files.map(file => {
          const cardClass = `file-card ${fileStatus[file.id] || ''}`;
          return (
            <div key={file.id} className={cardClass}>
              <h3>{file.fileName}</h3>
              <p className="location">Asukoht: {file.location}</p>
              <p className="description">{file.description}</p>

              <div className="options">
                <label>
                  <input
                    type="radio"
                    name={`file-${file.id}`}
                    value="pahavara"
                    checked={selections[file.id] === 'pahavara'}
                    onChange={() => handleChange(file.id, 'pahavara')}
                    disabled={isLocked}
                  /> Pahavara
                </label>
                <label>
                  <input
                    type="radio"
                    name={`file-${file.id}`}
                    value="ohutu"
                    checked={selections[file.id] === 'ohutu'}
                    onChange={() => handleChange(file.id, 'ohutu')}
                    disabled={isLocked}
                  /> Ohutu
                </label>
              </div>

              <button
                className="hint-button"
                onClick={() => setShowHints(prev => ({ ...prev, [file.id]: true }))}
              >
                Vihje
              </button>
              {showHints[file.id] && (
                <div className="hint-box">{file.hint}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Esita hinnangud</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button className="next-button" onClick={() => navigate('/')}>Lõpeta mäng</button>
        )}
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
};

export default Infoturbe_juht4;