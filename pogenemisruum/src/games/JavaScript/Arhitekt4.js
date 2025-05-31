import React, { useState } from 'react';
import '../CSS/Arhitekt4.css';

const policies = [
  { id: 'TLS', name: "TLS (Transport Layer Security)", correctScenarios: ["E-post transport", "Veebiliiklus (HTTPS)"] },
  { id: 'AES', name: "AES (Symmetric Encryption)", correctScenarios: ["Failide säilitamine", "Andmebaasi salvestus"] },
  { id: 'RSA', name: "RSA (Asymmetric Encryption)", correctScenarios: ["Võtmevahetus", "Digitaalallkirjastamine"] }
];

const scenarioPool = [
  { id: 1, text: "E-post transport", policyId: "TLS" },
  { id: 2, text: "Veebiliiklus (HTTPS)", policyId: "TLS" },
  { id: 3, text: "Failide säilitamine", policyId: "AES" },
  { id: 4, text: "Andmebaasi salvestus", policyId: "AES" },
  { id: 5, text: "Võtmevahetus", policyId: "RSA" },
  { id: 6, text: "Digitaalallkirjastamine", policyId: "RSA" },
  { id: 7, text: "Logifaili anonüümimine", policyId: null },
  { id: 8, text: "Arhiivi kokkupakkimine", policyId: null },
  { id: 9, text: "Koodirepositoorium (avalik)", policyId: null }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateScenarios() {
  const shuffled = shuffleArray(scenarioPool);
  return shuffled.slice(0, 6);
}

function Arhitekt4() {
  const [scenarios, setScenarios] = useState(generateScenarios());
  const [policySlots, setPolicySlots] = useState(() => {
    const initial = {};
    policies.forEach(p => initial[p.id] = []);
    return initial;
  });

  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, scenario) => {
    e.dataTransfer.setData("scenarioId", scenario.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnPolicy = (e, policyId) => {
    e.preventDefault();
    if (isLocked) return;

    const scId = parseInt(e.dataTransfer.getData("scenarioId"), 10);
    let item = null;
    let newList = [...scenarios];
    let idx = newList.findIndex(s => s.id === scId);
    if (idx >= 0) {
      item = newList[idx];
      newList.splice(idx, 1);
    } else {
      const newSlots = { ...policySlots };
      for (let key in newSlots) {
        const i = newSlots[key].findIndex(s => s.id === scId);
        if (i >= 0) {
          item = newSlots[key][i];
          newSlots[key].splice(i, 1);
          setPolicySlots(newSlots);
          break;
        }
      }
    }
    if (!item) return;

    const newSlots = { ...policySlots };
    newSlots[policyId] = [...newSlots[policyId], item];
    setPolicySlots(newSlots);
    setScenarios(newList);
  };

  const handleDropOnPool = (e) => {
    e.preventDefault();
    if (isLocked) return;
    const scId = parseInt(e.dataTransfer.getData("scenarioId"), 10);

    const newSlots = { ...policySlots };
    let item = null;
    for (let key in newSlots) {
      const i = newSlots[key].findIndex(s => s.id === scId);
      if (i >= 0) {
        item = newSlots[key][i];
        newSlots[key].splice(i, 1);
        break;
      }
    }
    if (item) {
      setScenarios(prev => [...prev, item]);
      setPolicySlots(newSlots);
    }
  };

  const handleCheck = () => {
    let allCorrect = true;
    for (let p of policies) {
      for (let sc of policySlots[p.id]) {
        if (sc.policyId !== p.id) {
          allCorrect = false;
        }
      }
    }
    if (allCorrect) {
      setFeedback("Kõik stsenaariumid on õige krüptopoliitikaga seotud!");
      setIsLocked(true);
    } else {
      setFeedback("On vigu. Kontrolli krüptopoliitika seoseid uuesti.");
    }
  };

  const handleReset = () => {
    setScenarios(generateScenarios());
    const initial = {};
    policies.forEach(p => initial[p.id] = []);
    setPolicySlots(initial);
    setFeedback("");
    setIsLocked(false);
  };

  return (
    <div className={`encryption-match-game ${
      isLocked
        ? (feedback.includes("Kõik") ? "correct-bg" : "")
        : (feedback.includes("vigu") ? "incorrect-bg" : "")
    }`}>
      <h2>Encryption Policy Match Game</h2>
      <p>Lohista stsenaariumid sobiva krüptopoliitika alla. Ole ettevaatlik distractoritega!</p>
      <div className="game-layout">
        <div className="pool" onDragOver={handleDragOver} onDrop={handleDropOnPool}>
          <h3>Stsenaariumid</h3>
          {scenarios.map(s => (
            <div key={s.id}
                 className="scenario-card"
                 draggable={!isLocked}
                 onDragStart={(e) => handleDragStart(e, s)}>
              {s.text}
            </div>
          ))}
        </div>
        <div className="policies">
          {policies.map(policy => (
            <div key={policy.id} 
                 className="policy-dropzone"
                 onDragOver={handleDragOver}
                 onDrop={(e) => handleDropOnPolicy(e, policy.id)}>
              <h3>{policy.name}</h3>
              {policySlots[policy.id].map(sc => (
                <div key={sc.id}
                     className="scenario-card"
                     draggable={!isLocked}
                     onDragStart={(e) => handleDragStart(e, sc)}>
                  {sc.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleReset}>Alusta uuesti</button>
            <button onClick={handleCheck}>Esita valikud</button>
          </>
        ) : (
          <button onClick={() => alert("Mäng lõpetatud!")}>Lõpeta mäng</button>
        )}
      </div>
      {feedback && <div className="message">{feedback}</div>}
    </div>
  );
}

export default Arhitekt4;
