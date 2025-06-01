import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija4.css';

const PAIRS = [
  { id: 1, vuln: "Nõrk parool",        fix: "Lisa numbreid ja sümboleid" },
  { id: 2, vuln: "Tarkvara uuendamata", fix: "Paigalda uuendused" },
  { id: 3, vuln: "HTTPS puudub",       fix: "Luba HTTPS" },
  { id: 4, vuln: "Varukoopia puudub",  fix: "Tee varukoopia" },
  { id: 5, vuln: "Liiga palju õigusi", fix: "Piira kasutaja õigusi" }
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const newDeck = () => {
  const deck = [];
  PAIRS.forEach(({ id, vuln, fix }) => {
    deck.push({ uid: `${id}-v`, pair: id, text: vuln, flipped: false, matched: false });
    deck.push({ uid: `${id}-f`, pair: id, text: fix,  flipped: false, matched: false });
  });
  return shuffle(deck);
};

function Kuberturvalisuse_uurija4() {
  const navigate = useNavigate();

  const [cards, setCards]   = useState(newDeck());
  const [picked, setPicked] = useState([]);
  const [locking, setLocking] = useState(false);
  const [msg, setMsg]         = useState("");
  const [done, setDone]       = useState(0);

  const clickCard = (idx) => {
    if (locking) return;
    const card = cards[idx];
    if (card.flipped || card.matched) return;

    const next = [...cards];
    next[idx].flipped = true;
    const newPicked = [...picked, idx];

    setCards(next);
    setPicked(newPicked);

    if (newPicked.length === 2) {
      setLocking(true);
      const [a, b] = newPicked;
      const cardA = next[a];
      const cardB = next[b];

      if (cardA.pair === cardB.pair && cardA.uid !== cardB.uid) {
        next[a].matched = true;
        next[b].matched = true;
        setCards(next);
        setDone((d) => d + 1);
        setTimeout(() => {
          setPicked([]);
          setLocking(false);
          setMsg("✅ Õige paar!");
        }, 600);
      } else {
        setTimeout(() => {
          next[a].flipped = false;
          next[b].flipped = false;
          setCards(next);
          setPicked([]);
          setLocking(false);
          setMsg("⚠️ Vale paar, proovi uuesti.");
        }, 1000);
      }
    } else {
      setMsg("");
    }
  };

  const resetGame = () => {
    setCards(newDeck());
    setPicked([]);
    setLocking(false);
    setMsg("");
    setDone(0);
  };

  return (
    <div className="memory-card">
      <h1>4. ETAPP: Oht ↔ Lahendus</h1>
      <p>Leia igale ohule sobiv lahendus.</p>

      <div className="grid">
        {cards.map((c, i) => (
          <div
            key={c.uid}
            className={`flip-card ${c.flipped || c.matched ? "show" : ""} ${c.matched ? "done" : ""}`}
            onClick={() => clickCard(i)}
          >
            <div className="flip-inner">
              <div className="flip-front" />
              <div className="flip-back">{c.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">
        {done === PAIRS.length ? (
          <button onClick={() => navigate("/")}>Lõpeta</button>
        ) : (
          <button onClick={resetGame}>Alusta uuesti</button>
        )}
      </div>

      {msg && <div className="message">{msg}</div>}
    </div>
  );
}

export default Kuberturvalisuse_uurija4;
