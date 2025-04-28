import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Rakendaja3.css';

const tools = [
  { id: 1, name: "Antivirus software", correct: true },
  { id: 2, name: "Firewall", correct: true },
  { id: 3, name: "USB autorun enabled", correct: false },
  { id: 4, name: "Data backup system", correct: true },
  { id: 5, name: "Public Wi-Fi without VPN", correct: false },
  { id: 6, name: "Intrusion Detection System (IDS)", correct: true }
];

function Rakendaja3() {
  const navigate = useNavigate();
  const [selectedTools, setSelectedTools] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const toggleTool = (toolId) => {
    if (isLocked) return;
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const handleSubmit = () => {
    const correctIds = tools.filter(t => t.correct).map(t => t.id).sort();
    const selectedIds = [...selectedTools].sort((a, b) => a - b);
    if (JSON.stringify(correctIds) === JSON.stringify(selectedIds)) {
      setFeedback("Kõik vajalikud kaitsetööriistad on õigesti valitud!");
      setIsLocked(true);
    } else {
      setFeedback("Mõned valikud on valed. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSelectedTools([]);
    setFeedback('');
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate('/rakendaja4');
  };

  return (
    <div className={`tool-selection-game ${isLocked ? 'correct-bg' : (feedback && !isLocked ? 'incorrect-bg' : '')}`}>
      <h1>Turvakaitse tööriistade valik</h1>
      <p>Vali kõik tööriistad, mis tugevdavad süsteemi turvalisust:</p>
      <div className="tools-grid">
        {tools.map(tool => (
          <div key={tool.id} className={`tool-card ${selectedTools.includes(tool.id) ? 'selected' : ''}`} onClick={() => toggleTool(tool.id)}>
            <input type="checkbox" checked={selectedTools.includes(tool.id)} readOnly /> {tool.name}
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
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Rakendaja3;
