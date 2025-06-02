import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija2.css';

const allItems = [
  {
    id: 1,
    title: 'Dokument makroga, mis laeb koodi Pastebinist',
    description: 'Office macro · kauglaadimine',
    isValuable: true,
    explanation: 'Makrod, mis tõmbavad sisu kolmandast allikast, on klassikaline pahavara meetod.'
  },
  {
    id: 2,
    title: 'Microsoft-i poolt allkirjastatud draiver',
    description: 'Digiallkiri kehtiv',
    isValuable: false,
    explanation: 'Kehtiva allkirjaga süsteemidraiver on reeglina ohutu (kui pole backdoori märgitud).'
  },
  {
    id: 3,
    title: 'Protsess süstib koodi explorer.exe-sse',
    description: 'Process injection',
    isValuable: true,
    explanation: 'Koodi süstimine teise protsessi on levinud pahavara taktik.'
  },
  {
    id: 4,
    title: 'PNG-pilt ilma metaandmeteta',
    description: 'Tavaline meediumifail',
    isValuable: false,
    explanation: 'Puuduvad skriptid või ebatavaline käitumine – vähemtõenäoliselt pahatahtlik.'
  },
  {
    id: 5,
    title: 'PowerShell -käsk Base64-ga',
    description: 'EncodedCommand',
    isValuable: true,
    explanation: 'Kood, mis on baasi64-ga varjutatud, on sagedane pahavara käivitustehnika.'
  },
  {
    id: 6,
    title: 'Logifail ASCII-s',
    description: 'Lihttekst',
    isValuable: false,
    explanation: 'Lihtne logifail pole pahavara indikaator.'
  },
  {
    id: 7,
    title: 'EXE varjub AppData-s ja lisab Run-võtme',
    description: 'Persistence behavior',
    isValuable: true,
    explanation: 'Auto-käivitus registris ning varjatud teekond on selge pahavara indikaator.'
  },
  {
    id: 8,
    title: 'PDF Digiallkirjastatud · skripte pole',
    description: 'Dokument kontrollitud',
    isValuable: false,
    explanation: 'Usaldusväärne dokument – pole teadaolevaid ohtlikke elemente.'
  }
];

const shuffle = arr => arr.sort(() => 0.5 - Math.random());
const generateItems = () => shuffle(allItems).slice(0, 6);

function Kuberturvalisuse_uurija2() {
  const nav = useNavigate();
  const [items, setItems] = useState(generateItems());
  const [sel, setSel] = useState([]);
  const [msg, setMsg] = useState('');
  const [lock, setLock] = useState(false);
  const [ok, setOk] = useState(false);

  const valIds = items.filter(i => i.isValuable).map(i => i.id);

  const toggle = id => {
    if (lock) return;
    setSel(s =>
      s.includes(id) ? s.filter(x => x !== id) : [...s, id]
    );
  };

  const submit = () => {
    const good = JSON.stringify(sel.sort()) === JSON.stringify(valIds.sort());
    setLock(true);
    setOk(good);
    setMsg(good ? 'Täpne töö!' : 'On vale valikuid – proovi veel.');
  };

  const reset = () => {
    setItems(generateItems());
    setSel([]);
    setMsg('');
    setLock(false);
    setOk(false);
  };

  return (
    <div className={`research-game ${lock ? (ok ? 'correct-bg' : 'incorrect-bg') : ''}`}>
      <h1>Pahavara indikaatorite tuvastamine</h1>
      <p className="instructions">
        Vali <strong>{valIds.length}</strong> käitumist, mis vihjavad pahavarale.
      </p>

      <div className="sources">
        {items.map(i => (
          <label key={i.id} className="source">
            <input type="checkbox" checked={sel.includes(i.id)} disabled={lock} onChange={() => toggle(i.id)} />
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
            <button onClick={reset}>Alusta uuesti</button>
            <button onClick={submit}>Esita valik</button>
          </>
        ) : (
          <button onClick={() => nav('/kuberturbe_uurija3')}>Edasi</button>
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

export default Kuberturvalisuse_uurija2;
