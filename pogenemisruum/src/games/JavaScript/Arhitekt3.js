import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Arhitekt3.css';

const allComponents = [
  { id: 'comp1', name: "DMZ Webserver", correctZone: "dmz" },
  { id: 'comp2', name: "Sisene andmebaas", correctZone: "internal" },
  { id: 'comp3', name: "VPN Gateway", correctZone: "perimeter" },
  { id: 'comp4', name: "Sisene LDAP server", correctZone: "internal" },
  { id: 'comp5', name: "DNS Resolver (public)", correctZone: "dmz" },
  { id: 'comp6', name: "Playground VM (dev)", correctZone: null },
  { id: 'comp7', name: "Kiosk Workstation", correctZone: null }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateComponents() {
  const size = Math.floor(Math.random() * 2) + 5;
  const shuffled = shuffleArray(allComponents);
  return shuffled.slice(0, size);
}

function removeItemFromList(list, compId) {
  const newList = [...list];
  const idx = newList.findIndex(c => c.id === compId);
  let item = null;
  if (idx >= 0) {
    item = newList[idx];
    newList.splice(idx, 1);
  }
  return [newList, item];
}

function Arhitekt3() {
  const navigate = useNavigate();
  const [pool, setPool] = useState(generateComponents());
  const [perimeter, setPerimeter] = useState([]);
  const [dmz, setDmz] = useState([]);
  const [internal, setInternal] = useState([]);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("compId", item.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropZone = (e, zone) => {
    e.preventDefault();
    if (isLocked) return;

    const compId = e.dataTransfer.getData("compId");
    let item = null;

    // Eemalda komponendipool (pool) või teisest tsoonist
    const newPool = [...pool];
    const idxPool = newPool.findIndex(c => c.id === compId);
    if (idxPool >= 0) {
      item = newPool[idxPool];
      newPool.splice(idxPool, 1);
    } else {
      [perimeter, item] = removeItemFromList(perimeter, compId);
      if (!item) [dmz, item] = removeItemFromList(dmz, compId);
      if (!item) [internal, item] = removeItemFromList(internal, compId);
    }
    if (!item) return;

    // Pane valitud tsooni või tagasi pooli
    if (zone === "pool") {
      newPool.push(item);
    } else if (zone === "perimeter") {
      setPerimeter(prev => [...prev, item]);
    } else if (zone === "dmz") {
      setDmz(prev => [...prev, item]);
    } else if (zone === "internal") {
      setInternal(prev => [...prev, item]);
    }
    setPool(newPool);
  };

  const handleCheck = () => {
    let allCorrect = true;
    const checkZone = (arr, zoneName) => {
      for (let comp of arr) {
        // Kui comp.correctZone on null, tähendab, et see on distractor – siis ei kontrolli
        if (comp.correctZone !== null && comp.correctZone !== zoneName) {
          allCorrect = false;
        }
      }
    };
    checkZone(perimeter, "perimeter");
    checkZone(dmz, "dmz");
    checkZone(internal, "internal");

    if (allCorrect) {
      setMessage("Kõik komponendid on õigetes turvatsoonides!");
      setIsLocked(true);
    } else {
      setMessage("Mõni komponent on vales tsoonis. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setPool(generateComponents());
    setPerimeter([]);
    setDmz([]);
    setInternal([]);
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate("/arhitekt4_leht");
  };

  return (
    <div className={`segmentation-game ${
      isLocked 
        ? (message.includes("Kõik komponendid") ? "correct-bg" : "") 
        : (message.includes("vales") ? "incorrect-bg" : "")
    }`}>
      <h2>Võrgu Segmenteerimise Mäng</h2>
      <p>Aseta komponendid õigesse tsooni (Perimeter, DMZ, Internal). Osa on distractorid.</p>
      
      <div className="game-area">
        <div className="zone pool-zone" 
             onDragOver={handleDragOver}
             onDrop={(e) => handleDropZone(e, "pool")}>
          <h3>Komponendid</h3>
          {pool.map(comp => (
            <div key={comp.id}
                 className="component-card"
                 draggable={!isLocked}
                 onDragStart={(evt) => handleDragStart(evt, comp)}>
              {comp.name}
            </div>
          ))}
        </div>
        
        <div className="zone" 
             onDragOver={handleDragOver}
             onDrop={(e) => handleDropZone(e, "perimeter")}>
          <h3>Perimeter</h3>
          {perimeter.map(comp => (
            <div key={comp.id}
                 className="component-card"
                 draggable={!isLocked}
                 onDragStart={(evt) => handleDragStart(evt, comp)}>
              {comp.name}
            </div>
          ))}
        </div>
        
        <div className="zone"
             onDragOver={handleDragOver}
             onDrop={(e) => handleDropZone(e, "dmz")}>
          <h3>DMZ</h3>
          {dmz.map(comp => (
            <div key={comp.id}
                 className="component-card"
                 draggable={!isLocked}
                 onDragStart={(evt) => handleDragStart(evt, comp)}>
              {comp.name}
            </div>
          ))}
        </div>
        
        <div className="zone"
             onDragOver={handleDragOver}
             onDrop={(e) => handleDropZone(e, "internal")}>
          <h3>Internal Net</h3>
          {internal.map(comp => (
            <div key={comp.id}
                 className="component-card"
                 draggable={!isLocked}
                 onDragStart={(evt) => handleDragStart(evt, comp)}>
              {comp.name}
            </div>
          ))}
        </div>
      </div>
      
      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset-button" onClick={handleReset}>Alusta uuesti</button>

            <button className="check-button" onClick={handleCheck}>Esita valikud</button>
          </>
        ) : (
          <button className="next-button" onClick={handleNext}>Edasi</button>
        )}
      </div>
      
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Arhitekt3;

