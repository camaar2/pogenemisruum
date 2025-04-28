import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija2.css';

const tools = [
  { id: 1, name: "Nmap", correctTarget: "network" },
  { id: 2, name: "Nikto", correctTarget: "web" },
  { id: 3, name: "SQL Injector", correctTarget: "database" },
  { id: 4, name: "SMTP Checker", correctTarget: "mail" }
];

const targets = [
  { id: "network", label: "Network" },
  { id: "web", label: "Web Server" },
  { id: "database", label: "Database Server" },
  { id: "mail", label: "Mail Server" }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function Norkustestija2() {
  const navigate = useNavigate();
  const [placements, setPlacements] = useState({});
  const [pool, setPool] = useState([...tools]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, toolId) => {
    e.dataTransfer.setData("toolId", toolId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnTarget = (e, targetId) => {
    e.preventDefault();
    const toolIdStr = e.dataTransfer.getData("toolId");
    if (!toolIdStr) return;
    const toolId = parseInt(toolIdStr);
    setPlacements(prev => ({ ...prev, [toolId]: targetId }));
    setPool(prev => prev.filter(tool => tool.id !== toolId));
  };

  const handleReset = () => {
    setPlacements({});
    setPool([...tools]);
    setIsSubmitted(false);
    setFeedback("");
    setIsLocked(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let allCorrect = true;
    tools.forEach(tool => {
      if (placements[tool.id] !== tool.correctTarget) {
        allCorrect = false;
      }
    });
    if (allCorrect && Object.keys(placements).length === tools.length) {
      setFeedback("Kõik tööriistad asetatud õigesti! Kriitilised leiud tuvastatud.");
      setIsLocked(true);
    } else {
      setFeedback("Mõni tööriist on asetatud valesti. Proovi uuesti.");
    }
  };

  const handleNext = () => {
    navigate("/norkustestija3");
  };

  return (
    <div className="scanning-game">
      <h1>Tööriistade paigutamine</h1>
      <p>Lohista õigeid skanneri tööriistu vastavatele sihtsüsteemidele.</p>
      <div className="game-container">
        <div className="pool">
          <h2>Tööriistad</h2>
          <div className="tool-cards">
            {pool.map(tool => (
              <div 
                key={tool.id} 
                className="tool-card" 
                draggable={!isLocked}
                onDragStart={(e) => handleDragStart(e, tool.id)}
              >
                {tool.name}
              </div>
            ))}
          </div>
        </div>
        <div className="targets">
          <h2>Sihtsüsteemid</h2>
          <div className="target-zones">
            {targets.map(target => {
              const placedTool = tools.find(tool => placements[tool.id] === target.id);
              let zoneClass = "target-zone";
              if (isSubmitted) {
                if (placedTool) {
                  zoneClass += placedTool.correctTarget === target.id ? " correct" : " incorrect";
                } else {
                  zoneClass += " empty";
                }
              }
              return (
                <div 
                  key={target.id} 
                  className={zoneClass}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropOnTarget(e, target.id)}
                >
                  <h3>{target.label}</h3>
                  {placedTool ? (
                    <div className="placed-tool">{placedTool.name}</div>
                  ) : (
                    <div className="placeholder">Lohista siia</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="buttons">
        {!isSubmitted && (
          <>
            <button onClick={handleSubmit}>Kontrolli paigutust</button>
            <button onClick={handleReset}>Alusta uuesti</button>
          </>
        )}
        {isSubmitted && isLocked && (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Norkustestija2;
