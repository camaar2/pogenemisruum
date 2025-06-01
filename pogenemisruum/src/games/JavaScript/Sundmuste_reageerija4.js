import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sundmuste_reageerija4.css';

const allActions = [
  {
    id: 1,
    name: 'Isoleeri nakatunud host',
    isCorrect: true,
    explanation: 'Nakkinud host eraldamine peatab ründe leviku võrku, mis on kriitiline containment-strateegia osa.'
  },
  {
    id: 2,
    name: 'Blokeeri pahatahtlik IP-aadress',
    isCorrect: true,
    explanation: 'Pahatahtliku IP-blokeerimine takistab ründaja ligipääsu ja peatab halva liikluse ettevõtte võrgus.'
  },
  {
    id: 3,
    name: 'Lukusta kompromiteeritud kasutajakontod',
    isCorrect: true,
    explanation: 'Kasutajakontode lukustamine peatab ründaja juurdepääsu, vähendades edasist kompromisse.'
  },
  {
    id: 4,
    name: 'Uuenda haavatavate süsteemide paroolid',
    isCorrect: true,
    explanation: 'Paroolide uuendamine taastab turva ja takistab ründajal taasligipääsu, mis on osa eradikatsioonist.'
  },
  {
    id: 5,
    name: 'Kustuta kõvakettal olevad logid',
    isCorrect: false,
    explanation: 'Logide kustutamine hävitab tõendusmaterjali ja takistab forensilist uurimist.'
  },
  {
    id: 6,
    name: 'Taaskäivita süsteemid kohe',
    isCorrect: false,
    explanation: 'Süsteemide kiire taaskäivitamine võib ründe jätkumisel andmeid kaotada ja ei pruugi containment’i aidata.'
  },
  {
    id: 7,
    name: 'Luba lõplik juurdepääs kõigile töötajatele',
    isCorrect: false,
    explanation: 'Kõigile töötajatele ligipääsu lubamine laiendab riskipinda ja rikub security-isoleerimise põhimõtteid.'
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

function generateOptions() {
  const correct = allActions.filter(a => a.isCorrect);
  const distractors = allActions.filter(a => !a.isCorrect);
  shuffleArray(distractors);
  const selected = [...correct];
  let i = 0;
  // lisame kaks eksitavat valikut
  while (selected.length < correct.length + 2 && i < distractors.length) {
    selected.push(distractors[i]);
    i++;
  }
  return shuffleArray(selected);
}

function Sundmuste_reageerija4() {
  const navigate = useNavigate();
  const [options] = useState(generateOptions());
  const [selectedActions, setSelectedActions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctNames = allActions
    .filter(a => a.isCorrect)
    .map(a => a.name)
    .sort();

  const toggleSelect = name => {
    if (isLocked) return;
    setSelectedActions(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
    setFeedback('');
  };

  const handleSubmit = () => {
    const sel = [...selectedActions].sort();
    const ok =
      sel.length === correctNames.length &&
      sel.every((v, i) => v === correctNames[i]);

    if (ok) {
      setFeedback('Tubli! Kõik vajalikud containment-meetmed on valitud.');
      setIsCorrect(true);
      setIsLocked(true);
    } else {
      setFeedback('Vale valik! Palun proovi uuesti või lähtesta valikud.');
      setIsCorrect(false);
      setIsLocked(true);
    }
  };

  const handleReset = () => {
    setSelectedActions([]);
    setFeedback('');
    setIsLocked(false);
    setIsCorrect(false);
  };

  return (
    <div className="containment-selection">
      <h2>Containment & Eradication strateegia</h2>
      <p>Vali meetmed, mis sobivad intsidendi containment- ja eradikatsioonistrateegiaks:</p>
      <ul className="action-list">
        {options.map(opt => (
          <li
            key={opt.id}
            className={selectedActions.includes(opt.name) ? 'selected' : ''}
            onClick={() => toggleSelect(opt.name)}
          >
            <input
              type="checkbox"
              checked={selectedActions.includes(opt.name)}
              readOnly
            />
            {opt.name}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={handleReset}>Alusta uuesti</button>
        {!isLocked ? (
          <button className="primary" onClick={handleSubmit}>
            Esita valikud
          </button>
        ) : (
          isCorrect && (
            <button className="primary" onClick={() => navigate('/')}>
              Lõpeta mäng
            </button>
          )
        )}
      </div>
      {feedback && (
        <div className={`feedback ${isCorrect ? 'message-correct' : 'message-incorrect'}`}>
          {feedback}
        </div>
      )}
      {isLocked && isCorrect && (
        <div className="explanations">
          <h3>Selgitused valikute kohta:</h3>
          <ul>
            {allActions
              .filter(a => selectedActions.includes(a.name))
              .map(a => (
                <li key={a.id}>
                  <strong>{a.name}:</strong> {a.explanation}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sundmuste_reageerija4;

