import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Arhitekt2.css';

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const standardsItems = [
  {
    id: 1,
    text: "Paroolivahetus iga 90 päeva tagant",
    correctColumn: "correct",
    explanation:
      "Regulaarne paroolivahetus tagab, et ründe läbi varastatud parooliga varastatud konto turvalisus taastatakse."
  },
  {
    id: 2,
    text: "Kõik tundlikud andmed krüptida AES-256-ga",
    correctColumn: "correct",
    explanation:
      "Tundlike andmete krüpteerimine tagab konfidentsiaalsuse ka juhuks, kui andmebaas lekkida peaks."
  },
  {
    id: 3,
    text: "Mitmetasemeline ligipääsusüsteem",
    correctColumn: "correct",
    explanation:
      "Mitmetasemeline ligipääs piirab õigusi ja vähendab ründe riski, kuna kasutaja saab vaid vajalike ressursside kohta juurdepääsu."
  },
  {
    id: 4,
    text: "Kaksikautentimine administraatori kontodel",
    correctColumn: "correct",
    explanation:
      "Kahefaktoriline autentimine admin-kontodel vähendab kaaperdamise võimalust, nõudes lisatõendit peale parooli."
  },
  {
    id: 5,
    text: "Paroolivahetus iga 10 aasta tagant",
    correctColumn: "incorrect",
    explanation:
      "Parooli vahetamine ainult iga 10 aasta tagant on liiga harva ja ei kaitse kasutajate kontosid adekvaatselt."
  },
  {
    id: 6,
    text: "Tundmatute tarkvarauuenduste mitteinstallimine",
    correctColumn: "incorrect",
    explanation:
      "Uuendused võivad sisaldada turvapaiku; nende mitteininstallimine jätab süsteemi haavatavaks."
  },
  {
    id: 7,
    text: "Turvaprotokollide täiendav krüpteerimine",
    correctColumn: "correct",
    explanation:
      "Turvaprotokollide krüpteerimine (nt TLS) kaitseb andmeedastust pealtkuulamise ja manipuleerimise eest."
  },
  {
    id: 8,
    text: "Võrguliikluse mitte filtreerimine",
    correctColumn: "incorrect",
    explanation:
      "Võrguliikluse filtreerimata jätmine tähendab, et ründed võivad läbi tulemüüri ja IDS/IPS-i süsteemi liikuda märkamatult."
  }
];

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
    const itemId = parseInt(e.dataTransfer.getData("itemId"), 10);
    let item = pool.find(i => i.id === itemId);
    if (item) {
      setPool(prev => prev.filter(i => i.id !== itemId));
    } else {
      const fromCorrect = correctColumn.find(i => i.id === itemId);
      if (fromCorrect) {
        item = fromCorrect;
        setCorrectColumn(prev => prev.filter(i => i.id !== itemId));
      } else {
        const fromIncorrect = incorrectColumn.find(i => i.id === itemId);
        item = fromIncorrect;
        setIncorrectColumn(prev => prev.filter(i => i.id !== itemId));
      }
    }

    if (!item) return;

    if (target === "correct") {
      setCorrectColumn(prev => [...prev, item]);
    } else {
      setIncorrectColumn(prev => [...prev, item]);
    }
  };

  const checkColumns = () => {
    // Peab olema kõik elemendid paigas ja õigesse veergu
    const allPlaced = correctColumn.length + incorrectColumn.length === standardsItems.length;
    const allCorrect =
      correctColumn.every(item => item.correctColumn === "correct") &&
      incorrectColumn.every(item => item.correctColumn === "incorrect") &&
      allPlaced;

    if (allCorrect) {
      setMessage("Oled loonud selged turvastandardid.");
      setIsLocked(true);
    } else {
      setMessage("Mõned standardid on valesti jaotatud. Proovi uuesti.");
      setIsLocked(false);
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
    <div className={`security-standards ${isLocked ? "correct-bg" : message.includes("valesti") ? "incorrect-bg" : ""}`}>
      <h1>Turvastandardite ja protseduuride seadmine</h1>
      <p>
        Lohista standardid õige veergu: <strong>"Soovitatav/Õige tava"</strong> ja <strong>"Vale või ebapiisav tava"</strong>.
      </p>
      <div className="drag-container">
        <div className="pool">
          <h3>Standardid</h3>
          {pool.map(item => (
            <div
              key={item.id}
              className="draggable-item"
              draggable={!isLocked}
              onDragStart={(e) => handleDragStart(e, item)}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className="columns">
          <div
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "correct")}
          >
            <h3>Soovitatav/Õige tava</h3>
            {correctColumn.map(item => (
              <div key={item.id} className="draggable-item">
                {item.text}
              </div>
            ))}
          </div>
          <div
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "incorrect")}
          >
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
        <button className="reset-button" onClick={resetColumns}>
          Alusta uuesti
        </button>
        {!isLocked ? (
          <button className="check-button" onClick={checkColumns}>
            Esita valikud
          </button>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Edasi
          </button>
        )}
      </div>

      {message && <div className="message">{message}</div>}

      {isLocked && (
        <div className="explanations">
          <h2>Selgitused valikute kohta:</h2>
          <ul>
            {standardsItems.map(item => (
              <li key={item.id}>
                <strong>{item.text}:</strong> {item.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Arhitekt2;

