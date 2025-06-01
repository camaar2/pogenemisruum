import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_riskijuht1.css';

function Kuberturbe_riskijuht1() {
  const navigate = useNavigate();

  const allOptions = [
    { id: 1, text: "Loo uus root-kasutaja ilma paroolita", correct: false },
    { id: 2, text: "Loo uus administraatorikonto tugeva parooliga", correct: true },
    { id: 3, text: "Jäta vaikimisi avatud sadam 22, millele puudub SSH-lubamine", correct: false },
    { id: 4, text: "Lubada SSH võtmepõhine autentimine", correct: true },
    { id: 5, text: "Muuda vaikimisi portaali seaded lubama kaugjuurdepääsu", correct: false },
    { id: 6, text: "Seadista firewall reeglid, mis lubavad kõiki ühendusi", correct: false }
  ];

  const correctOptions = allOptions.filter(option => option.correct);

  function generateOptions() {
    const distractors = allOptions.filter(option => !option.correct);
    const totalOptions = Math.floor(Math.random() * 2) + 4;
    let selected = [...correctOptions];
    distractors.sort(() => Math.random() - 0.5);
    let i = 0;
    while (selected.length < totalOptions && i < distractors.length) {
      selected.push(distractors[i]);
      i++;
    }
    return selected.sort(() => Math.random() - 0.5);
  }

  const [options, setOptions] = useState(generateOptions());
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCheckboxChange = (id) => {
    if (isLocked) return;
    setMessage("");
    setShowExplanation(false);
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = () => {
    const correctIds = options
      .filter(option => option.correct)
      .map(option => option.id)
      .sort();
    const userSelected = [...selected].sort((a, b) => a - b);

    if (JSON.stringify(correctIds) === JSON.stringify(userSelected)) {
      setMessage("Server on turvaliselt seadistatud!");
      setIsLocked(true);
      setShowExplanation(true);
    } else {
      setMessage("Mõned valikud on vigased või jäi midagi märkimata. Proovi uuesti.");
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setOptions(generateOptions());
    setSelected([]);
    setMessage("");
    setIsLocked(false);
    setShowExplanation(false);
  };

  const handleNext = () => {
    navigate("/kuberturbe_riskijuht2_leht");
  };

  return (
    <div className={`devops-stage1 ${isLocked ? 'correct-bg' : (message && !isLocked ? 'incorrect-bg' : '')}`}>
      <h1>Serveri algseadistus</h1>
      <p>Vali õiged seaded serveri turvaliseks seadistamiseks:</p>

      <table className="options-table">
        <thead>
          <tr>
            <th>Valik</th>
            <th>Seade</th>
          </tr>
        </thead>
        <tbody>
          {options.map(option => (
            <tr key={option.id} className={selected.includes(option.id) ? "selected" : ""}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(option.id)}
                  onChange={() => handleCheckboxChange(option.id)}
                  disabled={isLocked}
                />
              </td>
              <td>{option.text}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showExplanation && (
        <div className="explanation">
          <h3>Selgitus serveri turvaliseks seadistamiseks:</h3>
          <ul>
            <li>
              <strong>Loo uus administraatorikonto tugeva parooliga</strong> – oluline on, et administraatoriõigustega kontol oleks keerukas parool, et välistada lihtsad murdekatsetused.
            </li>
            <li>
              <strong>Lubada SSH võtmepõhine autentimine</strong> – SSH võtmega autentimine on turvalisem kui parooliga, kuna juurdepääs nõuab privaatvõtit, mis ei reisi võrgus.
            </li>
          </ul>
          <h4>Miks teised valikud ei sobi:</h4>
          <ul>
            <li>
              <em>Loo uus root-kasutaja ilma paroolita</em> – ilma paroolita root-kasutaja jätab turvaukse avatuks; igaüks saab sisse logida.
            </li>
            <li>
              <em>Jäta vaikimisi avatud sadam 22, millele puudub SSH-lubamine</em> – see jätab SSH-porti avatud ilma autentimiseta, mis on ohtlik.
            </li>
            <li>
              <em>Muuda vaikimisi portaali seaded lubama kaugjuurdepääsu</em> – turvarisk, sest kaugjuurdepääs peab olema rangelt piiratud.
            </li>
            <li>
              <em>Seadista firewall reeglid, mis lubavad kõiki ühendusi</em> – selline reegel avaks kõik pordid ja lubaks pahatahtlikel ühendustel sisse pääseda.
            </li>
          </ul>
        </div>
      )}

      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset-button" onClick={handleReset}>
              Alusta uuesti
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Esita valikud
            </button>
          </>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Edasi
          </button>
        )}
      </div>

      {message && (
        <div className={`message ${isLocked ? "message-correct" : "message-incorrect"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Kuberturbe_riskijuht1;

