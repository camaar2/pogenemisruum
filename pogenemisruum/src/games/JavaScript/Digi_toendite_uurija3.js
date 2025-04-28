import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija3.css';

const pairs = [
  { pairId: 1, artifact: "JPEG File", description: "Contains EXIF metadata; compresses image data" },
  { pairId: 2, artifact: "PDF Document", description: "May contain hidden text and metadata" },
  { pairId: 3, artifact: "Log File", description: "Records system events and timestamps" },
  { pairId: 4, artifact: "Email File", description: "Contains headers and attachments" }
];

function Digi_toendite_uurija3() {
  const navigate = useNavigate();
  
  const [artifacts, setArtifacts] = useState(() => {
    return pairs.map(p => ({ pairId: p.pairId, artifact: p.artifact })).sort(() => Math.random() - 0.5);
  });
  
  const [slots, setSlots] = useState(() => {
    const s = {};
    pairs.forEach(p => { s[p.pairId] = null; });
    return s;
  });
  
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, pairId) => {
    e.dataTransfer.setData("pairId", pairId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnSlot = (e, slotId) => {
    e.preventDefault();
    const artifactPairId = parseInt(e.dataTransfer.getData("pairId"), 10);
    setSlots(prev => ({ ...prev, [slotId]: artifactPairId }));
    setArtifacts(prev => prev.filter(item => item.pairId !== artifactPairId));
  };

  const handleSubmit = () => {
    let allCorrect = true;
    pairs.forEach(p => {
      if (slots[p.pairId] !== p.pairId) {
        allCorrect = false;
      }
    });
    if (allCorrect) {
      setMessage("All artifacts matched correctly!");
      setIsLocked(true);
    } else {
      setMessage("Some matches are incorrect. Please try again.");
    }
  };

  const handleReset = () => {
    setArtifacts(pairs.map(p => ({ pairId: p.pairId, artifact: p.artifact })).sort(() => Math.random() - 0.5));
    const resetSlots = {};
    pairs.forEach(p => { resetSlots[p.pairId] = null; });
    setSlots(resetSlots);
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate("/digi_toendite_uurija4"); 
  };

  return (
    <div className="artifact-matching">
      <h1>Digital Artifact Matching</h1>
      <p>Drag the digital artifact names to match them with the correct descriptions.</p>
      <div className="matching-container">
        <div className="artifact-pool">
          <h2>Artifacts</h2>
          {artifacts.map(item => (
            <div 
              key={item.pairId} 
              className="artifact-item" 
              draggable={!isLocked}
              onDragStart={(e) => handleDragStart(e, item.pairId)}>
              {item.artifact}
            </div>
          ))}
        </div>
        <div className="description-slots">
          <h2>Descriptions</h2>
          {pairs.map(p => {
            let slotClass = "description-slot";
            if (isLocked) {
              slotClass += (slots[p.pairId] === p.pairId) ? " correct" : " incorrect";
            }
            return (
              <div 
                key={p.pairId} 
                className={slotClass}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropOnSlot(e, p.pairId)}>
                <p className="description-text">{p.description}</p>
                {slots[p.pairId] ? (
                  <div className="matched-artifact">
                    {p.artifact}
                  </div>
                ) : (
                  <div className="placeholder">Drop artifact here</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="buttons">
        {!isLocked && (
          <>
            <button onClick={handleSubmit}>Check Matches</button>
            <button onClick={handleReset}>Reset</button>
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

export default Digi_toendite_uurija3;
