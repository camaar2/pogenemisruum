import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija3.css';

const logs = [
  {
    id: 1,
    title: 'Väljuv ühendus 185.123.45.67:4444',
    description: 'TCP · non-standard port',
    isValuable: true,
    explanation: 'Tundmatu IP ja C2-sarnane port (4444) viitavad pahalaste juhtkanalile.'
  },
  {
    id: 2,
    title: 'DNS päring windowsupdate.com',
    description: 'Tavapärane teenus',
    isValuable: false,
    explanation: 'Reaalne Windows Update’i domeen.'
  },
  {
    id: 3,
    title: 'HTTP POST /upload.php · 10 MB',
    description: 'Andmeväljavedu',
    isValuable: true,
    explanation: 'Suur POST tundmatule lehele on andmeeksfiltreerimise tunnus.'
  },
  {
    id: 4,
    title: 'SMB admin sisselogimine kell 03:17',
    description: 'Väljastpoolt tööaega',
    isValuable: true,
    explanation: 'Ebatavaline aeg ja kõrgprivilegeeritud konto – võimalik sissetung.'
  },
  {
    id: 5,
    title: 'TLS ühendus github.com',
    description: 'Arendaja töö',
    isValuable: false,
    explanation: 'Tavaline lähtekoodi tõmbamine – ei ole anomaalia.'
  },
  {
    id: 6,
    title: 'ICMP echo gateway-le',
    description: 'Ping test',
    isValuable: false,
    explanation: 'Tavaline võrgukasutus.'
  },
  {
    id: 7,
    title: 'Korduvad RDP vead 203.0.113.10-st',
    description: 'Brute-force kahtlus',
    isValuable: true,
    explanation: 'Ebaõnnestunud RDP-katsetused viitavad sisselogimisründele.'
  },
  {
    id: 8,
    title: 'NTP liiklus pool.ntp.org-i',
    description: 'Kella sünk',
    isValuable: false,
    explanation: 'Tavapärane NTP liiklus.'
  }
];

const shuffle = a => a.sort(() => 0.5 - Math.random());
const generate = () => shuffle(logs).slice(0, 6);

function Kuberturvalisuse_uurija3() {
  const nav = useNavigate();
  const [items, setItems] = useState(generate());
  const [sel, setSel] = useState([]);
  const [msg, setMsg] = useState('');
  const [lock, setLock] = useState(false);
  const [ok, setOk] = useState(false);

  const valIds = items.filter(i => i.isValuable).map(i => i.id);

  const toggle = id => {
    if (lock) return;
    setSel(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));
  };

  const submit = () => {
    const good = JSON.stringify(sel.sort()) === JSON.stringify(valIds.sort());
    setLock(true);
    setOk(good);
    setMsg(good ? 'Tublilt märgatud anomaaliad!' : 'Vigane komplekt – proovi uuesti.');
  };

  const reset = () => {
    setItems(generate());
    setSel([]);
    setMsg('');
    setLock(false);
    setOk(false);
  };

  return (
    <div className={`research-game ${lock ? (ok ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Võrguliikluse anomaalia tuvastamine</h1>
      <p className="instructions">
        Vali <strong>{valIds.length}</strong> logisündmust, mis viitavad kahtlasele tegevusele.
      </p>

      <div className="sources">
        {items.map(i => (
          <label key={i.id} className="source">
            <input type="checkbox" disabled={lock} checked={sel.includes(i.id)} onChange={() => toggle(i.id)} />
            <span className="source-text">
              <strong>{i.title}</strong>
              <span className="desc"> – {i.description}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="buttons">
        {!lock ? (
          <>
            <button onClick={reset}>Uuesti</button>
            <button onClick={submit}>Esita</button>
          </>
        ) : (
          <button onClick={() => nav('/kuberturbe_uurija4')}>Edasi</button>
        )}
      </div>

      {msg && <div className={`message ${ok ? 'message-correct' : 'message-incorrect'}`}>{msg}</div>}

      {lock && ok && (
        <div className="explanations">
          <h2>Selgitused:</h2>
          <ul>
            {items.filter(i => i.isValuable).map(i => (
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

export default Kuberturvalisuse_uurija3;
