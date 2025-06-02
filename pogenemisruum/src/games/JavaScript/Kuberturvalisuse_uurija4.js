import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija4.css';

const pairs = [
  { id: 1, left: 'HTTP POST 10 MB tundmatusse /upload.php', right: 'Andmeväljavedu (andmete lekke oht)' },
  { id: 2, left: 'Korduvad RDP sisselogimised 203.0.113.10-lt',  right: 'Brute-force ründekatse' },
  { id: 3, left: 'DNS päring k7g3d9s.xyz domeenile',             right: 'Juhtkanal läbi DNS-i' },
  { id: 4, left: 'PowerShell käivitus Base64 parameetriga',       right: 'Kodeeritud skript – pahavara käivitumine' },
  { id: 5, left: 'Väljuv ühendus 185.123.45.67:4444',             right: 'Command-&-Control kanal' }
];

const shuffle = a => [...a].sort(() => 0.5 - Math.random());


function Kuberturvalisuse_uurija4() {
  const navigate = useNavigate();

  const [leftItems,  setLeftItems]  = useState(shuffle(pairs));
  const [rightItems, setRightItems] = useState(shuffle(pairs));
  const [selectedLeft,  setSelectedLeft]  = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState([]);
  const [locked,  setLocked]  = useState(false);
  const [message, setMessage] = useState('');

  const allDone = matched.length === pairs.length;

  const tryPair = (l, r) => {
    if (!l || !r) return;
    if (l.id === r.id) {
      setMatched(prev => [...prev, { id: l.id }]);
      setMessage('Õige paar!');
    } else {
      setMessage('Need kaks ei sobi kokku.');
    }
    setTimeout(() => setMessage(''), 1200);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const chooseLeft  = item => !locked && !matched.find(m => m.id === item.id) &&
                              (setSelectedLeft(item),  tryPair(item, selectedRight));
  const chooseRight = item => !locked && !matched.find(m => m.id === item.id) &&
                              (setSelectedRight(item), tryPair(selectedLeft, item));

  const resetGame = () => {
    setLeftItems(shuffle(pairs));
    setRightItems(shuffle(pairs));
    setMatched([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setLocked(false);
    setMessage('');
  };

  const submitPairs = () => {
    if (allDone) {
      setLocked(true);
      setMessage('Kõik paarid õigesti!');
    } else {
      setMessage('Mõni paar on veel valesti või paigutamata.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="research-game">
      <h1>Leidlikud paarid</h1>
      <p className="instructions">
        Sobita <strong>iga</strong> sündmus õigesti selgitusega. Klõpsa esimesena vasakul, seejärel paremal.
      </p>

      <div className="pair-board">
        <div className="pair-column">
          <h2>Sündmus</h2>
          {leftItems.map(item => (
            <div
              key={item.id}
              className={`pair-card ${matched.find(m => m.id === item.id) ? 'paired' : ''}
                ${selectedLeft && selectedLeft.id === item.id ? 'selected' : ''}`}
              onClick={() => chooseLeft(item)}
            >
              {item.left}
            </div>
          ))}
        </div>

        <div className="pair-column">
          <h2>Selgitus</h2>
          {rightItems.map(item => (
            <div
              key={item.id}
              className={`pair-card ${matched.find(m => m.id === item.id) ? 'paired' : ''}
                ${selectedRight && selectedRight.id === item.id ? 'selected' : ''}`}
              onClick={() => chooseRight(item)}
            >
              {item.right}
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div className={`message ${allDone ? 'message-correct' : 'message-incorrect'}`}>
          {message}
        </div>
      )}

      <div className="buttons">
        {!locked ? (
          <>
            <button onClick={resetGame}>Alusta uuesti</button>
            <button onClick={submitPairs}>Esita valikud</button>
          </>
        ) : (
          <button onClick={() => navigate('/')}>Valmis!</button>
        )}
      </div>
    </div>
  );
}

export default Kuberturvalisuse_uurija4;
