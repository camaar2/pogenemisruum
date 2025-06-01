import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik3.css';

const allThreats = [
  {
    id: 1,
    text: "Leitud uus lunavara tüvi",
    correctPriority: "high",
    explanation: "Lunavara tüvi võib kohe andmeid krüpteerida ja laialdaselt levida – seetõttu on selle ohu puhul kõige kõrgem prioriteet."
  },
  {
    id: 2,
    text: "Teadaolev port-skaneerija IP",
    correctPriority: "medium",
    explanation: "Port-skaneerija IP-aadressi puhul on vaja jälgida ja reageerida, kuid see ei ole veel otsese kahjustuse tekitaja – seega keskmine prioriteet."
  },
  {
    id: 3,
    text: "Potentsiaalne paroolileke",
    correctPriority: "high",
    explanation: "Paroolileke võib viia kiirelt volitamata juurdepääsuni – see on kriitiline turvaoht, mis nõuab kohe tegemist."
  },
  {
    id: 4,
    text: "Võimalik phishing-kampaania",
    correctPriority: "low",
    explanation: "Kuigi phishing on ohtlik, ei ole hetkel kindlaid tõendeid konkreetsete sise-andmete ründe kohta – madala prioriteediga ülevaatus ja jälgimine piisab."
  },
  {
    id: 5,
    text: "Serveri avatud port 445",
    correctPriority: "medium",
    explanation: "Port 445 on tuntud SMB-kaardina, mida ründajad sageli sihivad – reageerida tuleb, kuid mitte nii kiirelt kui 0-day või paroolilekke korral."
  },
  {
    id: 6,
    text: "SQL Injection avastus",
    correctPriority: "high",
    explanation: "SQL Injectioni avastamine võimaldab ründajal andmebaasi manipulatsioone – see nõuab viivitamatut tähelepanu ja kõrgeimat prioriteeti."
  },
  {
    id: 7,
    text: "Telnet port 23 avatud",
    correctPriority: "low",
    explanation: "Telnet on vananenud ja ebaturvaline, aga suletav või vaatlus madala prioriteediga, sest hetkel pole rünnet tuvastatud."
  },
  {
    id: 8,
    text: "Kahtlane DNS-kirje",
    correctPriority: "low",
    explanation: "DNS-kirje muutused vajavad uurimist, kuid hetkel pole selget näidet pahatahtlikust tegevusest – madal prioriteet."
  },
  {
    id: 9,
    text: "Ülekoormusrünnak HTTP-le",
    correctPriority: "medium",
    explanation: "DDoS-tasemel rünnak HTTP-teenusele nõuab kiiret reageerimist, kuid tihti saab esmalt kiirendab võrgu- ja tulekaitse meetinguid – seega keskmine prioriteet."
  },
  {
    id: 10,
    text: "Värskelt avastatud 0-day haavatavus",
    correctPriority: "high",
    explanation: "0-day haavatavus on põhimõtteline kriitiline turvaoht, kuna puudub kaitse – peamine ja kõrgeimal tasemel reageerimine on kohustuslik."
  }
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateThreats() {
  const count = Math.floor(Math.random() * 4) + 6;
  return shuffleArray(allThreats).slice(0, count);
}

function Kuberturbe_ohuanaluutik3() {
  const navigate = useNavigate();
  const [threats, setThreats] = useState(generateThreats());
  const [priorities, setPriorities] = useState({});
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const total = threats.length;
  const highCount = threats.filter(t => t.correctPriority === 'high').length;
  const medCount = threats.filter(t => t.correctPriority === 'medium').length;
  const lowCount = threats.filter(t => t.correctPriority === 'low').length;

  const handlePriorityChange = (id, value) => {
    if (isLocked) return;
    setPriorities(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(priorities).length !== total) {
      setMessage(`Palun määra kõigile ${total} ohule prioriteet!`);
      return;
    }
    const allCorrect = threats.every(t => priorities[t.id] === t.correctPriority);
    if (allCorrect) {
      setMessage("Tubli! Kõik ohud on õigesti prioriseeritud.");
      setIsLocked(true);
      setIsCorrect(true);
    } else {
      setMessage("Mõni prioriteet ei vasta soovituslikule tasemele. Kontrolli üle ja proovi uuesti.");
      setIsLocked(true);
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setThreats(generateThreats());
    setPriorities({});
    setMessage("");
    setIsLocked(false);
    setIsCorrect(false);
  };

  const handleNext = () => navigate('/kuberturbe_ohuanaluutik4_leht');

  const containerClass = isLocked
    ? isCorrect 
      ? 'correct-bg' 
      : 'incorrect-bg'
    : '';

  const messageType = isLocked
    ? isCorrect 
      ? 'message-correct' 
      : 'message-incorrect'
    : '';

  return (
    <div className={`risk-prioritization ${containerClass}`}>
      <h1>Riskide prioriseerimine</h1>
      <div className="instructions">
        <p>Sul on tuvastatud <strong>{total}</strong> ohtu.</p>
        <p>
          Vali <strong className="high-label">kõrge</strong> prioriteet ohtudele, mille mõju on võrreldav 0-day lunavara levikuga; neid on {highCount}.
        </p>
        <p>
          Vali <strong className="medium-label">keskmine</strong> prioriteet tavameetmetega tõrjutavatele rünnetele; neid on {medCount}.
        </p>
        <p>
          Vali <strong className="low-label">madal</strong> prioriteet riskidele, mille korral standardsed turvareeglid on piisavad; neid on {lowCount}.
        </p>
      </div>

      <table className="risk-table">
        <thead>
          <tr>
            <th>Oht</th>
            <th>Prioriteet</th>
          </tr>
        </thead>
        <tbody>
          {threats.map(threat => (
            <tr key={threat.id}>
              <td>{threat.text}</td>
              <td>
                <select
                  value={priorities[threat.id] || ''}
                  onChange={e => handlePriorityChange(threat.id, e.target.value)}
                  disabled={isLocked}
                >
                  <option value="">Vali prioriteet...</option>
                  <option value="high">Kõrge</option>
                  <option value="medium">Keskmine</option>
                  <option value="low">Madal</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button onClick={handleReset}>Alusta uuesti</button>
            <button className="primary" onClick={handleSubmit}>Esita valikud</button>
          </>
        ) : (
          <button className="primary" onClick={handleNext}>Edasi</button>
        )}
      </div>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      {isLocked && isCorrect && (
        <div className="explanations">
          <h2>Selgitused prioriteetide kohta:</h2>
          <ul>
            {threats.map(threat => (
              <li key={threat.id}>
                <strong>{threat.text} ({threat.correctPriority}):</strong> {threat.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik3;
