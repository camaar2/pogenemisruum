import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik1.css';

const allSources = [
  { id: 1, title: "Ametlik teavitus pahavara levikust", description: "Allikas: CERT või turvafirma blogi", isValuable: true },
  { id: 2, title: "Sotsiaalmeedia kuulujutt", description: "Allikas: tundmatu postitus, vähe fakte", isValuable: false },
  { id: 3, title: "Anonüümne postitus turvafoorumis", description: "Mainib potentsiaalseid 0-day ründeid", isValuable: true },
  { id: 4, title: "Üldised turvatrendid", description: "Foorumi postitus, mis jagab arvamusi", isValuable: false },
  { id: 5, title: "Konverentsil vihjatud info uute rünnakute kohta", description: "Ettekande märkmed, kus mainiti uusi eksploitide mustreid", isValuable: true },
  { id: 6, title: "Sisemine intsident", description: "Juhuslik test, mille kohta vähe andmeid", isValuable: false },
  { id: 7, title: "Tweet, mis viitab uutele ründevahenditele", description: "Kasutaja X säuts uudisena, allikas ebaselge", isValuable: true },
  { id: 8, title: "Klikkiva pealkirjaga artikkel", description: "Sensatsiooniline pealkiri, vähe konkreetseid fakte", isValuable: false }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateSources() {
  return shuffleArray(allSources).slice(0, 5);
}

function Kuberturbe_ohuanaluutik1() {
  const navigate = useNavigate();
  const [sources, setSources] = useState(generateSources());
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const valuableIds = sources.filter(s => s.isValuable).map(s => s.id);

  const handleCheckboxChange = (id) => {
    if (isLocked) return;
    const isAdding = !selected.includes(id);
    if (isAdding) {
      const newCount = sources.filter(s => selected.includes(s.id) || s.id === id).filter(s => s.isValuable).length;
      if (newCount > valuableIds.length) {
        setMessage("Sul on juba piisavalt potentsiaalselt väärtuslikke allikaid valitud!");
        return;
      }
      setSelected(prev => [...prev, id]);
    } else {
      setSelected(prev => prev.filter(item => item !== id));
    }
  };

  const handleSubmit = () => {
    const correctIds = sources.filter(s => s.isValuable).map(s => s.id).sort();
    const userIds = [...selected].sort();
    const isCorrect = JSON.stringify(correctIds) === JSON.stringify(userIds);
    if (isCorrect) {
      setMessage("Hea töö! Kõik potentsiaalselt väärtuslikud allikad valitud.");
      setIsLocked(true);
    } else {
      setMessage("Mõned allikad on valesti hinnatud. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSources(generateSources());
    setSelected([]);
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => navigate("/kuberturbe_ohuanaluutik2");

  let messageType = '';
  if (message.includes('Hea töö')) {
    messageType = 'message-correct';
  } else if (message) {
    messageType = 'message-incorrect';
  }

  return (
    <div className={`threat-collection ${isLocked ? (messageType === 'message-correct' ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Ohuteabe kogumine</h1>
      <p className="instructions">Vali täpselt <strong>{valuableIds.length}</strong> potentsiaalselt väärtuslikku allikat – aitame turvaohtude jälitamisel!</p>

      <div className="sources">
        {sources.map(source => (
          <div key={source.id} className="source">
            <input
              type="checkbox"
              checked={selected.includes(source.id)}
              onChange={() => handleCheckboxChange(source.id)}
              disabled={isLocked}
            />
            <div className="source-text">
              <strong>{source.title}</strong>
              <span className="desc"> – {source.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleSubmit}>Kontrolli valikuid</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        ) : (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>

      {message && <div className={`message ${messageType}`}>{message}</div>}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik1;