import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Arhitekt2.css';

const standardsItems = [
  { id: 1, text: "Paroolivahetus iga 90 päeva tagant", correctColumn: "correct" },
  { id: 2, text: "Kõik tundlikud andmed krüptida AES-256-ga", correctColumn: "correct" },
  { id: 3, text: "Mitmetasemeline ligipääsusüsteem", correctColumn: "correct" },
  { id: 4, text: "Kaksikautentimine administraatori kontodel", correctColumn: "correct" },
  { id: 5, text: "Paroolivahetus iga 10 aasta tagant", correctColumn: "incorrect" },
  { id: 6, text: "Tundmatute tarkvarauuenduste mitteinstallimine", correctColumn: "incorrect" },
  { id: 7, text: "Turvaprotokollide täiendav krüpteerimine", correctColumn: "correct" },
  { id: 8, text: "Võrguliikluse mitte filtreerimine", correctColumn: "incorrect" }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function Arhitekt2() {
  const navigate = useNavigate();
  const [pool, setPool] = useState(shuffleArray(standardsItems));
  const [correctColumn, setCorrectColumn] = useState([]);
  const [incorrectColumn, setIncorrectColumn] = useState([]);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("itemId", item.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData("itemId"));
    let item = pool.find(i => i.id === itemId);
    if (!item) {
      if (correctColumn.find(i => i.id === itemId)) {
        item = correctColumn.find(i => i.id === itemId);
        setCorrectColumn(prev => prev.filter(i => i.id !== itemId));
      } else if (incorrectColumn.find(i => i.id === itemId)) {
        item = incorrectColumn.find(i => i.id === itemId);
        setIncorrectColumn(prev => prev.filter(i => i.id !== itemId));
      }
    } else {
      setPool(prev => prev.filter(i => i.id !== itemId));
    }
    if (target === "correct") {
      setCorrectColumn(prev => [...prev, item]);
    } else if (target === "incorrect") {
      setIncorrectColumn(prev => [...prev, item]);
    }
  };

  const checkColumns = () => {
    const allCorrect = 
      correctColumn.every(item => item.correctColumn === "correct") &&
      incorrectColumn.every(item => item.correctColumn === "incorrect") &&
      (correctColumn.length + incorrectColumn.length === standardsItems.length);
    if (allCorrect) {
      setMessage("Oled loonud selged turvastandardid.");
      setIsLocked(true);
    } else {
      setMessage("Mõned standardid on valesti jaotatud. Proovi uuesti.");
    }
  };

  const resetColumns = () => {
    setPool(shuffleArray(standardsItems));
    setCorrectColumn([]);
    setIncorrectColumn([]);
    setMessage("");
    setIsLocked(false);
  };

  const handleNext = () => {
    navigate("/arhitekt3_leht");
  };

  return (
    <div className={`security-standards ${isLocked ? "correct-bg" : message && message.includes("valesti") ? "incorrect-bg" : ""}`}>
      <h1>Turvastandardite ja protseduuride seadmine</h1>
      <p>Lohista standardid õige veergu: <strong>"Soovitatav/Õige tava"</strong> ja <strong>"Vale või ebapiisav tava"</strong></p>
      <div className="drag-container">
        <div className="pool">
          <h3>Standardid</h3>
          {pool.map(item => (
            <div key={item.id}
                 className="draggable-item"
                 draggable={!isLocked}
                 onDragStart={(e) => handleDragStart(e, item)}>
              {item.text}
            </div>
          ))}
        </div>
        <div className="columns">
          <div className="dropzone" 
               onDragOver={handleDragOver} 
               onDrop={(e) => handleDrop(e, "correct")}>
            <h3>Soovitatav/Õige tava</h3>
            {correctColumn.map(item => (
              <div key={item.id} className="draggable-item">
                {item.text}
              </div>
            ))}
          </div>
          <div className="dropzone" 
               onDragOver={handleDragOver} 
               onDrop={(e) => handleDrop(e, "incorrect")}>
            <h3>Vale või ebapiisav tava</h3>
            {incorrectColumn.map(item => (
              <div key={item.id} className="draggable-item">
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset-button" onClick={resetColumns}>Alusta uuesti</button>

            <button className="check-button" onClick={checkColumns}>Esita valikud</button>
          </>
        ) : (
          <button className="next-button" onClick={handleNext}>Edasi</button>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Arhitekt2;
