import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija4.css';

const evidencePairs = [
  {
    id: 1,
    toend: "Krüpteeritud USB-mälupulk",
    kirjeldus: "Turvaliselt kaitstud andmekandja, kust saab taastada faile ja metaandmeid"
  },
  {
    id: 2,
    toend: "Kahjuriprogrammi näidis",
    kirjeldus: "Pahatahtliku koodi prooviversioon, mida analüüsitakse eraldi testkeskkonnas"
  },
  {
    id: 3,
    toend: "Süsteemilogifail",
    kirjeldus: "Sündmuste ja veateadete ajalugu, mis aitab tuvastada kahtlasi tegevusi"
  },
  {
    id: 4,
    toend: "Võrgupaketi-jäädvustus",
    kirjeldus: "Reaalajas püütud paketid, mis annavad ülevaate võrguliiklusest ja ründemustritest"
  },
  {
    id: 5,
    toend: "Forenseeriline kettakujutis",
    kirjeldus: "Bititasandiline kloon algsest mäluseadmest kohtuekspertiisi ja taastamise jaoks"
  }
];

const colorMap = {
  1: "#e63946",
  2: "#457b9d",
  3: "#2a9d8f",
  4: "#f4a261",
  5: "#9d4edd"
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Digi_toendite_uurija4() {
  const navigate = useNavigate();

  const initializeCards = () => {
    const cards = [];
    evidencePairs.forEach(p => {
      cards.push({
        id: `${p.id}-toend`,
        pairId: p.id,
        type: 'toend',
        content: p.toend,
        flipped: false,
        matched: false
      });
      cards.push({
        id: `${p.id}-kirjeldus`,
        pairId: p.id,
        type: 'kirjeldus',
        content: p.kirjeldus,
        flipped: false,
        matched: false
      });
    });
    return shuffleArray(cards);
  };

  const [cards, setCards] = useState(initializeCards);
  const [flipped, setFlipped] = useState([]);
  const [matchesFound, setMatchesFound] = useState(0);
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (matchesFound === evidencePairs.length) {
      setMessage('🎉 Kõik paarid leitud!');
    }
  }, [matchesFound]);

  const handleCardClick = idx => {
    if (processing) return;
    const c = [...cards];
    const card = c[idx];
    if (card.flipped || card.matched) return;
    card.flipped = true;
    const newFlipped = [...flipped, idx];
    setCards(c);
    setFlipped(newFlipped);
    setMessage('');
    if (newFlipped.length === 2) {
      setProcessing(true);
      const [i1, i2] = newFlipped;
      const c1 = c[i1], c2 = c[i2];
      if (c1.pairId === c2.pairId && c1.type !== c2.type) {
        setTimeout(() => {
          c1.matched = c2.matched = true;
          setCards(c);
          setFlipped([]);
          setMatchesFound(m => m + 1);
          setProcessing(false);
        }, 800);
      } else {
        setTimeout(() => {
          c[i1].flipped = c[i2].flipped = false;
          setCards(c);
          setFlipped([]);
          setProcessing(false);
          setMessage('❌ Sobitus vale. Proovi uuesti.');
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    setCards(initializeCards());
    setFlipped([]);
    setMatchesFound(0);
    setMessage('');
    setProcessing(false);
  };

  const handleEnd = () => navigate('/');

  return (
    <div className={`digital-memory ${message.startsWith('🎉') ? 'correct-bg' : message ? 'incorrect-bg' : ''}`}>
      <h1>Digitaalse tõendi mälumäng</h1>
      <p className="scenario">
        <em>Mälumäng digitaalse forensika tõenditega: lohista kokku iga tõendi nimi tema kirjeldusega.</em>
      </p>
      <p className="instruction">
        Sobita kokku <strong>{evidencePairs.length}</strong> paari: tõendi nimi ↔ kirjeldus.
      </p>
      <div className="cards-grid">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
            onClick={() => handleCardClick(idx)}
            style={card.matched ? { border: `3px solid ${colorMap[card.pairId]}` } : {}}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        {matchesFound === evidencePairs.length ? (
          <button className="primary" onClick={handleEnd}>Lõpeta mäng</button>
        ) : (
          <button className="primary" onClick={handleReset}>Alusta uuesti</button>
        )}
      </div>
      {message && (
        <div className={`message ${message.startsWith('🎉') ? 'message-correct' : 'message-incorrect'}`}>
          {message}
        </div>
      )}
    </div>
  );
}