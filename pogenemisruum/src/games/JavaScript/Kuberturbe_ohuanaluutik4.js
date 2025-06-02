import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik4.css';

const correctChainWithExplanations = [
  {
    text: "Järeleluurimine",
    explanation:
      "Selle sammuga koguvad vargad või ründajad infot sihtmärgi kohta – näiteks otsitakse haavatavusi ja tehakse kindlaks tõhusaim sisenemiseks vajalik viis."
  },
  {
    text: "Relvastamine",
    explanation:
      "Selles etapis valmistatakse ette vajalik pahatahtlik kood või tööriistad sissetungiks."
  },
  {
    text: "Levitamine",
    explanation:
      "Pahavara või ründekoodi levitamine (e-posti, sotsiaalmeedia, varastatud USB-d jne) – et pääseda kasutajate süsteemidesse või võrku."
  },
  {
    text: "Eksploitatsioon",
    explanation:
      "Siin ründaja kasutab leitud viga või haavatavust, et omada juurdepääsu sihtmärgi süsteemile (näiteks 0-day või SQL-injektioon)."
  },
  {
    text: "Paigaldamine",
    explanation:
      "Paigaldatakse juurdepääsu tagamiseks backdoor või muu püsiv komponent, mis võimaldab kaugjuurdepääsu."
  },
  {
    text: "Käsklus ja Juhtimine",
    explanation:
      "Ründaja ühendub oma C2-serveriga („Command and Control“), et anda haavatud masinale täiendavaid käske või saata varastatud infot."
  },
  {
    text: "Eesmärkide täitmine",
    explanation:
      "Viimane etapp: varastatud andmete väljaviimine, süsteemide kahjustamine või muu pahatahtlik tegevus vastavalt ründaja eesmärgile."
  }
];

const distractors = ["Puhastamine", "Tulu realiseerimine", "Sotsiaalmeedia püsitus"];

function generatePuzzleItems() {
  const allItems = [
    ...correctChainWithExplanations.map(item => item.text),
    ...distractors
  ];
  for (let i = allItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
  }
  return allItems;
}

function Kuberturbe_ohuanaluutik4() {
  const navigate = useNavigate();
  const [pool, setPool] = useState(generatePuzzleItems());
  const [slots, setSlots] = useState(Array(7).fill(null));
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };
  const handleDragOver = e => e.preventDefault();

  const handleDropInSlot = (e, index) => {
    e.preventDefault();
    if (isLocked) return;

    const item = e.dataTransfer.getData("text/plain");
    let newPool = [...pool];
    let newSlots = [...slots];

    if (newPool.includes(item)) {
      newPool = newPool.filter(i => i !== item);
    } else {
      const prevIdx = newSlots.indexOf(item);
      if (prevIdx >= 0) newSlots[prevIdx] = null;
    }

    if (newSlots[index]) {
      newPool.push(newSlots[index]);
    }

    newSlots[index] = item;
    setPool(newPool);
    setSlots(newSlots);
  };

  const handleDropInPool = e => {
    e.preventDefault();
    if (isLocked) return;

    const item = e.dataTransfer.getData("text/plain");
    let newSlots = [...slots];
    const idx = newSlots.indexOf(item);
    if (idx >= 0) {
      newSlots[idx] = null;
      setSlots(newSlots);
      setPool(prev => [...prev, item]);
    }
  };

  const handleCheckOrder = () => {
    if (slots.some(s => !s)) {
      setMessage("Mõni koht on tühi. Aseta kõik 7 etappi järjekorda.");
      setIsLocked(false);
      return;
    }
    const allCorrect = slots.every(
      (s, i) => s === correctChainWithExplanations[i].text
    );
    if (allCorrect) {
      setMessage("Tubli! Kõik ründe ahela etapid on õiges järjekorras.");
      setIsLocked(true);
      setIsCorrect(true);
    } else {
      setMessage("Vale järjekord! Proovi uuesti.");
      setIsLocked(true);
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setPool(generatePuzzleItems());
    setSlots(Array(7).fill(null));
    setMessage("");
    setIsLocked(false);
    setIsCorrect(false);
  };

  const containerClass = isLocked
    ? isCorrect
      ? 'correct-bg'
      : 'incorrect-bg'
    : message
      ? 'incorrect-bg'
      : '';

  const messageClass = message.startsWith('Tubli')
    ? 'message-correct'
    : 'message-incorrect';

  return (
    <div className={`killchain-game ${containerClass}`}>
      <h1>Ründe ahela etappide kokkupanek</h1>
      <p className="instructions">
        Allolevas poolis on 7 õiget ründeetappi ja 3 eksitavat etappi. Teie eesmärk on
        lohistada etapid vasakul asuvasse järjekorrarakku, asetades need õigesse toimuvasse järjekorda.
        <ul className="criteria-list">
        </ul>
        Kui olete kõik 7 etappi paigutanud oma kohale, vajutage “Esita valikud”. Pärast õiget paigutust kuvatakse iga etapi kohta lühike selgitus.
      </p>

      <div className="game-container">
        <div
          className="slots-panel"
          onDragOver={handleDragOver}
          onDrop={e => e.preventDefault()}
        >
          <h3>Etappide järjekord</h3>
          <div className="slots">
            {slots.map((item, idx) => (
              <div
                key={idx}
                className="slot"
                onDrop={e => handleDropInSlot(e, idx)}
                onDragOver={handleDragOver}
              >
                {item ? (
                  <div
                    className="chain-item"
                    draggable={!isLocked}
                    onDragStart={e => handleDragStart(e, item)}
                  >
                    {item}
                  </div>
                ) : (
                  <div className="placeholder">Etapp {idx + 1}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="pool"
          onDragOver={handleDragOver}
          onDrop={handleDropInPool}
        >
          <h3>Saadaolevad etapid</h3>
          <div className="pool-items">
            {pool.map(item => (
              <div
                key={item}
                className="chain-item"
                draggable={!isLocked}
                onDragStart={e => handleDragStart(e, item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="buttons">
        {!isLocked ? (
          <>
            <button className="reset-button" onClick={handleReset}>
              Alusta uuesti
            </button>
            <button className="primary" onClick={handleCheckOrder}>
              Esita valikud
            </button>
          </>
        ) : (
          <button className="primary" onClick={() => navigate('/')}>
            Lõpeta mänguseeria
          </button>
        )}
      </div>

      {message && <div className={`message ${messageClass}`}>{message}</div>}

      {isLocked && isCorrect && (
        <div className="explanations">
          <h2>Selgitused ahela etappide kohta:</h2>
          <ul>
            {correctChainWithExplanations.map((item, idx) => (
              <li key={idx}>
                <strong>{item.text}:</strong> {item.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik4;
