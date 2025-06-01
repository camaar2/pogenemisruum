import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik2.css';

const fullWordPool = [
  {
    id: 1,
    text: "Kogutud",
    isIndicator: false,
    explanation: "„Kogutud“ on lihtsalt tavaline eestikeelne sõna, mitte failinimi, IP-aadress ega muu tehniline ohumärk."
  },
  {
    id: 2,
    text: "ohuteave",
    isIndicator: false,
    explanation: "„ohuteave“ on üldine mõiste, mitte konkreetne failinimi ega IP-aadress, seega ei kuulu ohumärkide hulka."
  },
  {
    id: 3,
    text: "malware.exe",
    isIndicator: true,
    explanation: "„malware.exe“ näeb välja täpselt nagu pahavaratüübile viitav failinimi (faililaiend .exe), seega on kehtiv ohumärk."
  },
  {
    id: 4,
    text: "ja",
    isIndicator: false,
    explanation: "„ja“ on tavaline sidesõna, mitte tehniline indikaator, seega ei ole ohumärk."
  },
  {
    id: 5,
    text: "tavaline",
    isIndicator: false,
    explanation: "„tavaline“ on eesti keeles üldine omadussõna, mitte ohumärk."
  },
  {
    id: 6,
    text: "phishing_file",
    isIndicator: true,
    explanation: "„phishing_file“ viitab selgelt petturlikule (phishing) failile – tehniline indikaator, mis võib sisaldada pahatahtlikku koodi."
  },
  {
    id: 7,
    text: "192.168.1.5",
    isIndicator: true,
    explanation: "„192.168.1.5“ on formaadilt IP-aadress, mida sageli kasutatakse ründeallika või nakatunud masina tuvastamiseks."
  },
  {
    id: 8,
    text: "muuhulgas",
    isIndicator: false,
    explanation: "„muuhulgas“ on sideühend, eesti keeles tähendab „lisaks“, mitte tehniline ohumärk."
  },
  {
    id: 9,
    text: "trojanDetector",
    isIndicator: true,
    explanation: "„trojanDetector“ tundub olevat programm või tööriist, mis “trojan”-ründeid tuvastab – tehniline termin, mida käsitletakse kui indikaatorit."
  },
  {
    id: 10,
    text: "10.0.0.23",
    isIndicator: true,
    explanation: "„10.0.0.23“ on samuti klassikaline IP-aadress (privaatvõrgu alam), mida võib pidada potentsiaalseks ohumärgiks."
  },
  {
    id: 11,
    text: "randomtekst",
    isIndicator: false,
    explanation: "„randomtekst“ on lihtsalt suvaline tekst, ilma viideteta failile, IP-aadressile või muule tehnilisele indikaatorile."
  },
  {
    id: 12,
    text: "C2server",
    isIndicator: true,
    explanation: "„C2server“ (Command and Control server) on ründeinfrastruktuuri osa, seetõttu loeme selle ohumärgiks."
  },
  {
    id: 13,
    text: "port445",
    isIndicator: true,
    explanation: "„port445“ viitab Windows’i jagamisprotokollile (SMB), mida ründajad kasutavad – seega on tehniline indikaator."
  },
  {
    id: 14,
    text: "somefile.pdf",
    isIndicator: false,
    explanation: "„somefile.pdf“ on küll failinimi, kuid PDF-faili laiend ei viita pahavara spetsiifikale – tavaliselt ei ole PDF vaikimisi ohumärk."
  },
  {
    id: 15,
    text: "suspect_credentials",
    isIndicator: true,
    explanation: "„suspect_credentials“ viitab kahtlustatavate kasutajatunnuste või paroolide kogumile – ohumärkina loetav termin."
  },
  {
    id: 16,
    text: "tavakasutaja",
    isIndicator: false,
    explanation: "„tavakasutaja“ on üldine rolli/määrang, mitte tehniline failinimi ega IP-aadress, seega ei kvalifitseeru ohumärgiks."
  },
  {
    id: 17,
    text: "backup.zip",
    isIndicator: true,
    explanation: "„backup.zip“ on failinimi, millel on .zip-laiend. Kuigi mitte alati pahatahtlik, tähendab „backup.zip“ tihti ettevalmistatud või krüptitud andmevarundust, mida ründajad võivad kurjasti kasutada – antud harjutuses loeme selle ohumärgiks."
  },
  {
    id: 18,
    text: "10.15.30.111",
    isIndicator: true,
    explanation: "„10.15.30.111“ on veel üks privaat IP-aadressi formaat, mida võidakse kasutada valesti või pahatahtlikult konfigureeritud seadme tuvastamiseks."
  },
  {
    id: 19,
    text: "evilscript.js",
    isIndicator: true,
    explanation: "„evilscript.js“ on JavaScript-fail, mis nimes sisaldab sõna „evil“ – selge indikaator, et võib olla pahatahtlik kood."
  },
  {
    id: 20,
    text: "keegi mainis",
    isIndicator: false,
    explanation: "„keegi mainis“ on lihtne vestluse fraas, mitte tehniline või failidega seotud termin, seega ei ole ohumärk."
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

function generateWords() {
  return shuffleArray(fullWordPool).slice(0, 12);
}

function Kuberturbe_ohuanaluutik2() {
  const navigate = useNavigate();
  const [words, setWords] = useState(generateWords());
  const [selectedIndicators, setSelectedIndicators] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const [isCorrect, setIsCorrect] = useState(false);

  const indicatorCount = words.filter(w => w.isIndicator).length;

  const handleWordClick = (word) => {
    if (isLocked) return;
    setSelectedIndicators(prev => {
      const updated = { ...prev };
      if (updated[word.id]) delete updated[word.id];
      else updated[word.id] = true;
      return updated;
    });
  };

  const handleSubmit = () => {
    const correctIds = words
      .filter(w => w.isIndicator)
      .map(w => w.id)
      .sort((a, b) => a - b);
    const userSelected = Object.keys(selectedIndicators)
      .map(id => +id)
      .sort((a, b) => a - b);

    if (JSON.stringify(correctIds) === JSON.stringify(userSelected)) {
      setIsCorrect(true);
      setIsLocked(true);
      setMessage("Kõik ohumärgid tuvastatud! Saad edasi liikuda.");
    } else {
      setIsCorrect(false);
      setMessage("Mõned ohumärgid on puudu või valesti märgitud. Proovi uuesti!");
    }
  };

  const handleReset = () => {
    setWords(generateWords());
    setSelectedIndicators({});
    setMessage("");
    setIsLocked(false);
    setIsCorrect(false);
  };

  const handleNext = () => navigate("/kuberturbe_ohuanaluutik3_leht");

  let messageType = "";
  if (message.includes("Kõik ohumärgid")) messageType = "message-correct";
  else if (message.includes("puudu") || message.includes("valesti")) messageType = "message-incorrect";

  const getWordClass = (word) => {
    if (!isLocked) {
      return selectedIndicators[word.id] ? "word selected" : "word";
    }
    const isSel = !!selectedIndicators[word.id];
    if (word.isIndicator && isSel) return "word correct";
    if (word.isIndicator && !isSel) return "word missed";
    if (!word.isIndicator && isSel) return "word incorrect";
    return "word neutral";
  };

  return (
    <div className={`analyst-game ${isLocked ? (messageType === "message-correct" ? "correct-bg" : "incorrect-bg") : ""}`}>
      <h1>Andmete analüüs</h1>
      <p className="instructions">
        Vali täpselt <strong>{indicatorCount}</strong> ohumärki (failinimed, IP-aadressid jm) allolevast tekstiplokist ja klõpsa vastavaid sõnu.
      </p>

      <div className="analysis-text">
        {words.map((word) => (
          <span
            key={word.id}
            className={getWordClass(word)}
            onClick={() => handleWordClick(word)}
          >
            {word.text}
          </span>
        ))}
      </div>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleReset}>Alusta uuesti</button>
            <button onClick={handleSubmit}>Esita valikud</button>
          </>
        ) : (
          <button onClick={handleNext}>Edasi</button>
        )}
      </div>

      {message && <div className={`message ${messageType}`}>{message}</div>}

      {isLocked && isCorrect && (
        <div className="explanations">
          <h2>Selgitused tuvastuse kohta:</h2>
          <ul>
            {words.map((word) => (
              <li key={word.id}>
                <strong>{word.text}:</strong> {word.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik2;
