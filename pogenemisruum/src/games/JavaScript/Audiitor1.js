import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Audiitor1.css';

const allRisks = [
  { 
    id: 1, 
    name: "Andmeleke", 
    isRelevant: true,
    explanation: "Andmeleke on otsene turvaoht, kuna tundlik info võib sattuda valedesse kätesse ja tekitada ettevõttele suuri kahjusid."
  },
  { 
    id: 2, 
    name: "IT-süsteemi seisak", 
    isRelevant: true,
    explanation: "IT-süsteemi tõrge võib peatada äritegevuse ja põhjustada kasumi kaotuse, seega on oluline risk."
  },
  { 
    id: 3, 
    name: "Reputatsioonikahju", 
    isRelevant: true,
    explanation: "Reputatsioonikahju mõjutab klientide usaldust, võib tuua kaasa pikaajalisi maineprobleeme."
  },
  { 
    id: 4, 
    name: "Füüsiline rünnak", 
    isRelevant: false,
    explanation: "Füüsiline rünnak ei ole selles kontekstis kõige tõenäolisem risk, sest me käsitleme peamiselt IT- ja andmealaseid riske."
  },
  { 
    id: 5, 
    name: "Võrgu ülekoormus", 
    isRelevant: false,
    explanation: "Võrgu ülekoormus on küll ebamugavus, kuid kui võrku haldada õigesti, ei kujuta see endas andmeleketega võrdväärset ohtu."
  },
  { 
    id: 6, 
    name: "Kasutajate segadus", 
    isRelevant: false,
    explanation: "Kasutajate segadus on pigem operatiivne probleem; see ei ole otsene turvarisk võrreldes andmelekkega."
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

function generateRiskOptions() {
  const correctRisks = allRisks.filter(r => r.isRelevant);
  const distractors = allRisks.filter(r => !r.isRelevant);
  const subsetSize = Math.floor(Math.random() * 2) + 4;
  const selected = [...correctRisks];
  shuffleArray(distractors);
  for (let i = 0; selected.length < subsetSize && i < distractors.length; i++) {
    selected.push(distractors[i]);
  }
  return shuffleArray(selected);
}

export default function Audiitor1() {
  const navigate = useNavigate();
  const [riskOptions] = useState(generateRiskOptions());
  const [selectedRisks, setSelectedRisks] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [message, setMessage] = useState("");
  const [report, setReport] = useState("");
  const correctIds = allRisks.filter(r => r.isRelevant).map(r => r.id);
  const scenario = "Firma X kasutas viimati vana TLS-versiooni (TLS 1.0), mis suurendab andmeleketega seotud riski.";

  const toggleRisk = id => {
    if (isLocked) return;
    setSelectedRisks(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCheck = () => {
    const correctCount = selectedRisks.filter(id => correctIds.includes(id)).length;
    const wrongCount = selectedRisks.filter(id => !correctIds.includes(id)).length;
    if (correctCount === correctIds.length && wrongCount === 0) {
      setMessage("Tubli! Kõik riskid valitud õigesti.");
      setReport(
        `Audit kokkuvõte: ${scenario} Tuvastatud riskid: ${riskOptions
          .filter(r => correctIds.includes(r.id))
          .map(r => r.name)
          .join(', ')}.`
      );
    } else {
      setMessage(`Õigeid valikuid: ${correctCount}, vigu: ${wrongCount}. Proovi uuesti.`);
    }
    setIsLocked(true);
  };

  const handleReset = () => {
    setSelectedRisks([]);
    setIsLocked(false);
    setMessage("");
    setReport("");
  };

  const containerClass = isLocked
    ? message.startsWith('Tubli') 
      ? 'correct-bg' 
      : 'incorrect-bg'
    : '';
  const messageClass = isLocked
    ? message.startsWith('Tubli') 
      ? 'message-correct' 
      : 'message-incorrect'
    : '';

  const getExplanation = id => {
    const found = allRisks.find(r => r.id === id);
    return found ? found.explanation : "";
  };

  return (
    <div className={`cyadvice-stage1 ${containerClass}`}>
      <h2>Riskianalüüs</h2>
      <p className="scenario"><em>{scenario}</em></p>

      <p>
        Vaata allolevat nimekirja ja vali ainult need riskiolukorrad, mis organisatsiooni IT-keskkonda tõenäoliselt mõjutavad.
        Järgnevad kriteeriumid aitavad sul otsustada:
      </p>
      <ul className="criteria-list">
        <li>
          <strong>Andmete konfidentsiaalsus:</strong> Kas risk võib põhjustada tundliku teabe (nt kliendiandmed, finantsinfo) lekkimist?
        </li>
        <li>
          <strong>Teenuste kättesaadavus:</strong> Kas risk võib peatada või aeglustada olulisi süsteeme ja äritegevust?
        </li>
        <li>
          <strong>Maine ja usaldusväärsus:</strong> Kas risk mõjutab organisatsiooni mainet ja klientide usaldust pikaajaliselt?
        </li>
      </ul>
      <p>Vali täpselt <strong>{correctIds.length}</strong> riski. Kui oled valmis, klõpsa „Esita valikud“. </p>

      <ul className="risk-list">
        {riskOptions.map(r => (
          <li
            key={r.id}
            className={selectedRisks.includes(r.id) ? 'selected' : ''}
            onClick={() => toggleRisk(r.id)}
          >
            <input
              type="checkbox"
              checked={selectedRisks.includes(r.id)}
              readOnly
            />{" "}
            {r.name}
          </li>
        ))}
      </ul>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset" onClick={handleReset}>
              Alusta uuesti
            </button>
            <button
              className="primary submit"
              onClick={handleCheck}
              disabled={selectedRisks.length === 0}
            >
              Esita valikud
            </button>
          </>
        ) : message.startsWith("Tubli") ? (
          <button className="primary next" onClick={() => navigate('/audiitor2_leht')}>
            Edasi
          </button>
        ) : (
          <button className="reset" onClick={handleReset}>
            Proovi uuesti
          </button>
        )}
      </div>

      {message && <div className={`message ${messageClass}`}>{message}</div>}

      {report && <div className="report">{report}</div>}

      {isLocked && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {riskOptions.map(r => (
              <li key={r.id}>
                <strong>{r.name}:</strong> {getExplanation(r.id)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
