import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik1.css';

const allSources = [
  {
    id: 1,
    title: "Ametlik teavitus pahavara levikust",
    description: "Allikas: CERT või turvafirma blogi",
    isValuable: true,
    explanation: "See on ametlik teavitus usaldusväärsest allikast (nt CERT), seega on info tõendatud ja kasulik ohuhäirete jälgimiseks."
  },
  {
    id: 2,
    title: "Sotsiaalmeedia kuulujutt",
    description: "Allikas: tundmatu postitus, vähe fakte",
    isValuable: false,
    explanation: "Kuulujutt sotsiaalmeedias ilma viideteta ei pruugi olla õige – puuduvad tõendavad faktid, seega pole seda turvalise teabe kogumiseks tasemel allikaks võtta."
  },
  {
    id: 3,
    title: "Anonüümne postitus turvafoorumis",
    description: "Mainib potentsiaalseid 0-day ründeid",
    isValuable: true,
    explanation: "Postituses tõstetakse esile tehnilised nüansid (0-day ründed), mis võivad viidata uudsele haavatavusele – seega tasub tõsisemalt uurida ja käsitleda kui väärtuslikku vihjet."
  },
  {
    id: 4,
    title: "Üldised turvatrendid",
    description: "Foorumi postitus, mis jagab arvamusi",
    isValuable: false,
    explanation: "See on pigem üldine diskussioon, kus puuduvad spetsiifilised juhtumid või tehnilised detailid. Arvamused ei ole üksi piisav alus potentsiaalse ohu hindamiseks."
  },
  {
    id: 5,
    title: "Konverentsil vihjatud info uute rünnakute kohta",
    description: "Ettekande märkmed, kus mainiti uusi eksploitide mustreid",
    isValuable: true,
    explanation: "Konverentsi märkmed toovad esile uusi eksploitimismeetodeid ja ekspertarvamused – see on usaldusväärne ja aktuaalne info, mis aitab ohte ennetada."
  },
  {
    id: 6,
    title: "Sisemine intsident",
    description: "Juhuslik test, mille kohta vähe andmeid",
    isValuable: false,
    explanation: "Kui tegemist on ainult juhusliku sisemise testiga, võib selle põhjal üldistada olla problemaatiline. Puuduvad tõendid, et sama muster mõjutaks teisi süsteeme."
  },
  {
    id: 7,
    title: "Tweet, mis viitab uutele ründevahenditele",
    description: "Kasutaja X säuts uudisena, allikas ebaselge",
    isValuable: true,
    explanation: "Tweet võib olla esmane indikaator uudsele ründevahendile, kuid enne kriitilist tähtsust vajab ta kinnitust. Siiski on see potentsiaalselt oluline, sest tihti jagatakse seal varakult infot."
  },
  {
    id: 8,
    title: "Klikkiva pealkirjaga artikkel",
    description: "Sensatsiooniline pealkiri, vähe konkreetseid fakte",
    isValuable: false,
    explanation: "Sensatsiooniline pealkiri ilma faktipõhise sisuta ja viideteta kipub olema pinnapealne. Sellist infot ei tohiks pidada usaldusväärseks ohuteabeks ilma allikakinnitusteta."
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

function generateSources() {
  return shuffleArray(allSources).slice(0, 5);
}

function Kuberturbe_ohuanaluutik1() {
  const navigate = useNavigate();

  const [sources, setSources] = useState(generateSources());
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const valuableIds = sources.filter(s => s.isValuable).map(s => s.id);

  const handleCheckboxChange = (id) => {
    if (isLocked) return;

    const alreadySelected = selected.includes(id);
    if (!alreadySelected) {
      const newCount = sources
        .filter(s => selected.includes(s.id) || s.id === id)
        .filter(s => s.isValuable).length;
      if (newCount > valuableIds.length) {
        setMessage("Sul on juba piisavalt potentsiaalselt väärtuslikke allikaid valitud!");
        return;
      }
      setSelected(prev => [...prev, id]);
    } else {
      setSelected(prev => prev.filter(item => item !== id));
    }
    setMessage("");
  };

  const handleSubmit = () => {
    const correctIds = sources.filter(s => s.isValuable).map(s => s.id).sort();
    const userIds = [...selected].sort();
    const matched = JSON.stringify(correctIds) === JSON.stringify(userIds);

    if (matched) {
      setIsCorrect(true);
      setIsLocked(true);
      setMessage("Hea töö! Kõik potentsiaalselt väärtuslikud allikad valitud.");
    } else {
      setIsCorrect(false);
      setMessage("Mõned allikad on valesti hinnatud. Proovi uuesti.");
    }
  };

  const handleReset = () => {
    setSources(generateSources());
    setSelected([]);
    setMessage("");
    setIsLocked(false);
    setIsCorrect(false);
  };

  const handleNext = () => navigate("/kuberturbe_ohuanaluutik2_leht");

  let messageType = '';
  if (message.includes('Hea töö')) {
    messageType = 'message-correct';
  } else if (message) {
    messageType = 'message-incorrect';
  }

  return (
    <div className={`threat-collection ${isLocked ? (messageType === 'message-correct' ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Ohuteabe kogumine</h1>
      <p className="instructions">
        Vali täpselt <strong>{valuableIds.length}</strong> potentsiaalselt väärtuslikku allikat – aitame turvaohtude jälitamisel!
      </p>

      <div className="sources">
        {sources.map(source => (
          <div key={source.id} className="source">
            <input
              type="checkbox"
              checked={selected.includes(source.id)}
              onChange={() => handleCheckboxChange(source.id)}
              disabled={isLocked}
            />
            <div className="source-text">
              <strong>{source.title}</strong>
              <span className="desc"> – {source.description}</span>
            </div>
          </div>
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
          <h2>Selgitused valikute kohta:</h2>
          <ul>
            {sources.map(source => (
              <li key={source.id}>
                <strong>{source.title}:</strong> {source.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Kuberturbe_ohuanaluutik1;
