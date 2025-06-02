import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija1.css';

const allItems = [
  {
    id: 1,
    title: 'OpenSSL 3.0.2 buffer overflow',
    description: 'CVSS 9.8 · PoC avalik',
    isValuable: true,
    explanation:
      'Kriitiline RCE haavatavus juba avaliku exploitiga — tuleb lappida kohe.'
  },
  {
    id: 2,
    title: 'Apache Tomcat info-disclosure',
    description: 'CVSS 4.3 · exploit puudub',
    isValuable: false,
    explanation:
      'Keskmise tasemega puudus ilma aktiivse kuritarvituseta; võib oodata tavapärase paigaga.'
  },
  {
    id: 3,
    title: 'Adobe Reader use-after-free',
    description: 'CVSS 8.2 · kampaaniad nähtud',
    isValuable: true,
    explanation:
      'Kõrge riskiga haavatavus, mida on päriselus sihtitud – eelisjärjekorras.'
  },
  {
    id: 4,
    title: 'Legacy Telnet teenus',
    description: 'Ei ole CVE-d, ent krüpteerimata',
    isValuable: true,
    explanation:
      'Konfiguratsiooni-põhine oht: krüpteerimata teenus, mida saab hõlpsalt kuritarvitada.'
  },
  {
    id: 5,
    title: 'Python-raamatukogu minor-patch',
    description: 'CVSS 3.1 · parandus saadaval',
    isValuable: false,
    explanation:
      'Madala mõjuga kolmanda osapoole parandus; ei vaja kiiret tähelepanu.'
  },
  {
    id: 6,
    title: 'Windows PrintNightmare variatsioon',
    description: 'CVSS 8.8 · mass-skannimine käib',
    isValuable: true,
    explanation:
      'Aktuaalne kampaania – kriitiline privileegide tõstmise viga, mille vastu skannerid juba otsivad.'
  },
  {
    id: 7,
    title: 'Nginx versiooniuuendus 1.26',
    description: 'Release notes: performance only',
    isValuable: false,
    explanation:
      'Sisaldab vaid jõudluse parandusi, turvarisk praktiliselt puudub.'
  },
  {
    id: 8,
    title: 'IoT-kaamera kõvakooditud parool',
    description: 'CVE-2024-10001 · CVSS 9.0',
    isValuable: true,
    explanation:
      'Kõrge skooriga haavatavus, mille puhul ründaja pääseb otse seadmesse.'
  }
];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateItems() {
  return shuffleArray(allItems).slice(0, 6);
}

function Kuberturvalisuse_uurija1() {
  const navigate = useNavigate();
  const [items, setItems] = useState(generateItems());
  const [selected, setSelected] = useState([]);
  const [msg, setMsg] = useState('');
  const [locked, setLocked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const valuableIds = items.filter(i => i.isValuable).map(i => i.id);

  const toggle = id => {
    if (locked) return;
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(x => x !== id));
    } else {
      const newSel = [...selected, id];
      if (newSel.filter(x => valuableIds.includes(x)).length > valuableIds.length) {
        setMsg('Valisid juba kõik prioriteetsed haavatavused!');
        return;
      }
      setSelected(newSel);
    }
    setMsg('');
  };

  const submit = () => {
    const good = JSON.stringify(selected.sort()) === JSON.stringify(valuableIds.sort());
    setLocked(true);
    setCorrect(good);
    setMsg(
      good ? 'Võrratu! Kõik kriitilised haavatavused leitud.' : 'Midagi jäi puudu või üle – proovi uuesti.'
    );
  };

  const reset = () => {
    setItems(generateItems());
    setSelected([]);
    setMsg('');
    setLocked(false);
    setCorrect(false);
  };

  return (
    <div
      className={`research-game ${locked ? (correct ? 'correct-bg' : 'incorrect-bg') : ''}`}
    >
      <h1>Haavatavuste prioriseerimine</h1>
      <p className="instructions">
        Vali <strong>{valuableIds.length}</strong> kõrgeima prioriteediga haavatavust, mis vajavad kohest tegutsemist.
      </p>

      <div className="sources">
        {items.map(it => (
          <label key={it.id} className="source">
            <input
              type="checkbox"
              checked={selected.includes(it.id)}
              disabled={locked}
              onChange={() => toggle(it.id)}
            />
            <span className="source-text">
              <strong>{it.title}</strong>
              <span className="desc"> – {it.description}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="buttons">
        {!locked ? (
          <>
            <button onClick={reset}>Alusta uuesti</button>
            <button onClick={submit}>Esita valik</button>
          </>
        ) : (
          <button onClick={() => navigate('/kuberturbe_uurija2')}>Edasi</button>
        )}
      </div>

      {msg && (
        <div className={`message ${correct ? 'message-correct' : 'message-incorrect'}`}>
          {msg}
        </div>
      )}

      {locked && correct && (
        <div className="explanations">
          <h2>Miks just need?</h2>
          <ul>
            {items
              .filter(i => i.isValuable)
              .map(i => (
                <li key={i.id}>
                  <strong>{i.title}:</strong> {i.explanation}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Kuberturvalisuse_uurija1;