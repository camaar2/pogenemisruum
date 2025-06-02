import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Arhitekt3.css';

const allComponents = [
  {
    id: 'comp1',
    name: "DMZ Webserver",
    correctZone: "dmz",
    explanation:
      "DMZ Webserver’i paigutamine DMZ-tsooni tagab, et avalikele teenustele on piiratud juurdepääs sisemistele võrkudele."
  },
  {
    id: 'comp2',
    name: "Sisene andmebaas",
    correctZone: "internal",
    explanation:
      "Andmebaas peab olema sisemise turvavõrgu taga, et välistada otse interneti kaudu ligipääs tundlikele andmetele."
  },
  {
    id: 'comp3',
    name: "VPN Gateway",
    correctZone: "perimeter",
    explanation:
      "VPN Gateway asub perimeetri tsoonis, et välised kasutajad saaksid turvaliselt sisemine võrku pääseda."
  },
  {
    id: 'comp4',
    name: "Sisene LDAP server",
    correctZone: "internal",
    explanation:
      "LDAP server sisaldab kasutajate andmeid ja peab jääma sisetelektule, et tagada andmete konfidentsiaalsus."
  },
  {
    id: 'comp5',
    name: "DNS Resolver (public)",
    correctZone: "dmz",
    explanation:
      "Avalik DNS Resolver peab olema DMZ-tsoonis, et teenida väliseid päringuid ilma sisemist võrku avaldamata."
  },
  {
    id: 'comp6',
    name: "Playground VM (dev)",
    correctZone: null,
    explanation:
      "Arenduskeskkonna masin ei kuulu tootmisvõrgu turvatsoonidesse ja võib jääda eraldi arendusvõrku."
  },
  {
    id: 'comp7',
    name: "Kiosk Workstation",
    correctZone: null,
    explanation:
      "Kiosk tööjaam on avalik tööjaam ja ei kuulu DMZ ega sisetsoonidesse, vaid eraldi võrgumurusse."
  }
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

export default function Arhitekt3() {
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

    let newPool = [...pool];
    const idxPool = newPool.findIndex(c => c.id === compId);
    if (idxPool >= 0) {
      item = newPool[idxPool];
      newPool.splice(idxPool, 1);
    } else {
      let result;
      result = removeItemFromList(perimeter, compId);
      setPerimeter(result[0]);
      item = result[1];
      if (!item) {
        result = removeItemFromList(dmz, compId);
        setDmz(result[0]);
        item = result[1];
      }
      if (!item) {
        result = removeItemFromList(internal, compId);
        setInternal(result[0]);
        item = result[1];
      }
    }
    if (!item) return;

    if (zone === "pool") {
      newPool.push(item);
      setPool(newPool);
    } else if (zone === "perimeter") {
      setPerimeter(prev => [...prev, item]);
      setPool(newPool);
    } else if (zone === "dmz") {
      setDmz(prev => [...prev, item]);
      setPool(newPool);
    } else if (zone === "internal") {
      setInternal(prev => [...prev, item]);
      setPool(newPool);
    }
  };

  const handleCheck = () => {
    let allCorrect = true;

    const checkZone = (arr, zoneName) => {
      for (let comp of arr) {
        if (comp.correctZone !== zoneName) {
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
      setIsLocked(false);
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
    <div
      className={`segmentation-game ${
        isLocked
          ? "correct-bg"
          : message.includes("vales")
          ? "incorrect-bg"
          : ""
      }`}
    >
      <h2>Võrgu Segmenteerimise Mäng</h2>
      <p>
        Aseta komponendid õigesse tsooni (Perimeter, DMZ, Internal). Mõni on
        üleliigne. Kui oled valmis, vajuta „Esita valikud“.
      </p>

      <div className="game-area">
        <div
          className="zone pool-zone"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropZone(e, "pool")}
        >
          <h3>Komponendid</h3>
          {pool.map((comp) => (
            <div
              key={comp.id}
              className="component-card"
              draggable={!isLocked}
              onDragStart={(evt) => handleDragStart(evt, comp)}
            >
              {comp.name}
            </div>
          ))}
        </div>

        <div
          className="zone"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropZone(e, "perimeter")}
        >
          <h3>Perimeter</h3>
          {perimeter.map((comp) => (
            <div
              key={comp.id}
              className="component-card"
              draggable={!isLocked}
              onDragStart={(evt) => handleDragStart(evt, comp)}
            >
              {comp.name}
            </div>
          ))}
        </div>

        <div
          className="zone"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropZone(e, "dmz")}
        >
          <h3>DMZ</h3>
          {dmz.map((comp) => (
            <div
              key={comp.id}
              className="component-card"
              draggable={!isLocked}
              onDragStart={(evt) => handleDragStart(evt, comp)}
            >
              {comp.name}
            </div>
          ))}
        </div>

        <div
          className="zone"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropZone(e, "internal")}
        >
          <h3>Internal Net</h3>
          {internal.map((comp) => (
            <div
              key={comp.id}
              className="component-card"
              draggable={!isLocked}
              onDragStart={(evt) => handleDragStart(evt, comp)}
            >
              {comp.name}
            </div>
          ))}
        </div>
      </div>

      <div className="buttons">
        <button className="reset-button" onClick={handleReset}>
          Alusta uuesti
        </button>
        {!isLocked ? (
          <button className="check-button" onClick={handleCheck}>
            Esita valikud
          </button>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Edasi
          </button>
        )}
      </div>

      {message && <div className="message">{message}</div>}

      {isLocked && message.includes("Kõik komponendid") && (
        <div className="explanations">
          <h3>Selgitused komponentide paigutuse kohta:</h3>
          <ul>
            {perimeter.map((c) => (
              <li key={c.id}>
                <strong>{c.name}:</strong> {c.explanation}
              </li>
            ))}
            {dmz.map((c) => (
              <li key={c.id}>
                <strong>{c.name}:</strong> {c.explanation}
              </li>
            ))}
            {internal.map((c) => (
              <li key={c.id}>
                <strong>{c.name}:</strong> {c.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
