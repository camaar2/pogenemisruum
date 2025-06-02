import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht2.css';

export default function Infoturbe_juht2() {
  const navigate = useNavigate();
  const correctOrder = [
    {
      text: "Install viirusetõrje",
      explanation: "Kõigepealt peab tarkvara saama süsteemi installitud, et see oleks valmis kaitset pakkuma."
    },
    {
      text: "Luba reaalajas skaneerimine",
      explanation: "Reaalajas skaneerimine kontrollib kohe kõiki uusi faile ja protsesse, vältides pahavara levikut."
    },
    {
      text: "Värskenda turvabaas",
      explanation: "Uuendatud turvabaas tuvastab uusimad pahavaravariandid ja hoiab kaitse ajakohasena."
    },
    {
      text: "Keela tundmatud manusfailid",
      explanation: "Blokeerides kahtlased manusfailid vähendatakse riski, et pahavara pääseb süsteemi e-kirja kaudu."
    }
  ];
  const distractors = [
    "Luba automaatne uuendus",
    "Reklaami blokeerimine"
  ];
  const [choices, setChoices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [status, setStatus] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [hint, setHint] = useState('');
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const all = shuffle([...correctOrder.map(c => c.text), ...distractors]);
    setChoices(all);
    setSlots(Array(correctOrder.length).fill(null));
    setStatus(Array(correctOrder.length).fill('neutral'));
  }, []);

  function shuffle(arr) {
    return arr
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(o => o.value);
  }

  function onDragStart(e, index, from) {
    e.dataTransfer.setData('application/json', JSON.stringify({ index, from }));
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDropSlot(e, i) {
    e.preventDefault();
    if (locked) return;

    const { index, from } = JSON.parse(e.dataTransfer.getData('application/json'));
    let newSlots = [...slots];
    let newChoices = [...choices];
    let item = from === 'choices' ? choices[index] : slots[index];

    if (from === 'choices') {
      newChoices.splice(index, 1);
    } else {
      newSlots[index] = null;
    }

    if (newSlots[i]) {
      newChoices.push(newSlots[i]);
    }

    newSlots[i] = item;
    setChoices(newChoices);
    setSlots(newSlots);
    setStatus(Array(correctOrder.length).fill('neutral'));
    setMessage({ text: '', type: '' });
    setHint('');
  }

  function onDropChoices(e) {
    e.preventDefault();
    if (locked) return;

    const { index, from } = JSON.parse(e.dataTransfer.getData('application/json'));
    if (from === 'slots') {
      let newSlots = [...slots];
      let newChoices = [...choices];
      newChoices.push(newSlots[index]);
      newSlots[index] = null;
      setChoices(newChoices);
      setSlots(newSlots);
      setStatus(Array(correctOrder.length).fill('neutral'));
      setMessage({ text: '', type: '' });
      setHint('');
    }
  }

  function checkOrder() {
    const stat = slots.map((v, i) => (v === correctOrder[i].text ? 'correct' : 'wrong'));
    setStatus(stat);

    if (slots.includes(null)) {
      setMessage({ text: 'Kõik kastid tuleb enne kontrolli täita.', type: 'error' });
      setHint('Veenduda tuleb, et igas kastis oleks mõni samm.');
      return;
    }

    if (stat.every(s => s === 'correct')) {
      setMessage({ text: '🎉 Tubli! Turvatarkvara on õiges järjekorras.', type: 'success' });
      setLocked(true);
    } else {
      setMessage({ text: '❌ Mõned sammud ei ole paigas.', type: 'error' });
      if (slots[0] !== correctOrder[0].text) {
        setHint('Hinnata tuleks, kas viirusetõrje paigaldamine peab toimuma enne konfigureerimist.');
      } else if (slots[2] !== correctOrder[2].text) {
        setHint('Ajakasutusega seotud sammud tuleks läbi viia pärast reaalajas kaitse lubamist.');
      } else {
        setHint('Lugege sammude selgitusi uuesti: mõned tegevused sobivad pigem hilisemasse etappi.');
      }
    }
  }

  function resetPuzzle() {
    const all = shuffle([...correctOrder.map(c => c.text), ...distractors]);
    setChoices(all);
    setSlots(Array(correctOrder.length).fill(null));
    setStatus(Array(correctOrder.length).fill('neutral'));
    setMessage({ text: '', type: '' });
    setHint('');
    setLocked(false);
  }

  return (
    <div className="infoturbe-juht2-wrapper">
      <div
        className={`software-puzzle ${
          locked ? 'correct-bg' : message.type === 'error' ? 'incorrect-bg' : ''
        }`}
      >
        <h1>Turvatarkvara paigaldamine</h1>
        <p className="scenario">
          <em>
            Korporatsiooni infosüsteemi turvalisust haldavad spetsialistid. Tarkvara tuleb paigaldada
            ja seadistada nii, et see tagaks maksimaalse kaitse.
          </em>
        </p>
        <p className="instruction">
          Lohistada tuleb <strong>{correctOrder.length}</strong> õiget toimingut allolevast valikute
          kastist vastavasse järjekorda. Kaks turvalisuse seisukohast ebavajalikku sammu tuleb
          jätta „Saadaval sammud“ hulka.
        </p>
        <p className="instructions">
          Kui kõik valikud on tehtud, klõpsake nupul “Esita valikud”.
        </p>

        <div className="puzzle-container">
          <div className="slots" onDragOver={onDragOver} onDrop={onDropChoices}>
            {slots.map((v, i) => (
              <div
                key={i}
                className={`slot ${status[i]}`}
                draggable={!locked && !!v}
                onDragStart={e => onDragStart(e, i, 'slots')}
                onDragOver={onDragOver}
                onDrop={e => onDropSlot(e, i)}
              >
                {v || <span className="placeholder">Lohista siia</span>}
              </div>
            ))}
          </div>

          <div className="choices" onDragOver={onDragOver} onDrop={onDropChoices}>
            <p>Saadaval sammud</p>
            <div className="choices-container">
              {choices.map((v, i) => (
                <div
                  key={i}
                  className="choice"
                  draggable={!locked}
                  onDragStart={e => onDragStart(e, i, 'choices')}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
          {!locked ? (
            <>
              <button onClick={resetPuzzle}>Alusta uuesti</button>
              <button className="primary" onClick={checkOrder}>
                Esita valikud
              </button>
            </>
          ) : (
            <button className="primary" onClick={() => navigate('/infoturbe_juht3_leht')}>
              Edasi
            </button>
          )}
        </div>

        {message.text && (
          <div
            className={`message ${
              message.type === 'success' ? 'message-correct' : 'message-incorrect'
            }`}
          >
            {message.text}
          </div>
        )}

        {hint && <div className="hint-box">{hint}</div>}

        {message.text && (
          <div className="explanations">
            <h3>Selgitused valikute kohta:</h3>
            <ul>
              {correctOrder.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.text}:</strong> {item.explanation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

