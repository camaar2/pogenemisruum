import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Infoturbe_juht2.css';

export default function Infoturbe_juht2() {
  const navigate = useNavigate();
  const correctOrder = [
    "Install viirusetõrje",
    "Luba reaalajas skaneerimine",
    "Värskenda turvabaas",
    "Keela tundmatud manusfailid"
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
    const all = shuffle([...correctOrder, ...distractors]);
    setChoices(all);
    setSlots(Array(correctOrder.length).fill(null));
    setStatus(Array(correctOrder.length).fill('neutral'));
  }, []);

  function shuffle(arr) {
    return arr.map(a => ({ sort: Math.random(), value: a }))
      .sort((a,b) => a.sort - b.sort)
      .map(o => o.value);
  }

  function onDragStart(e, index, from) {
    e.dataTransfer.setData('application/json', JSON.stringify({ index, from }));
  }
  function onDragOver(e) { e.preventDefault(); }
  function onDropSlot(e, i) {
    e.preventDefault();
    if (locked) return;
    const { index, from } = JSON.parse(e.dataTransfer.getData('application/json'));
    let newSlots = [...slots], newChoices = [...choices];
    let item = from === 'choices' ? choices[index] : slots[index];
    if (from === 'choices') newChoices.splice(index,1);
    else newSlots[index] = null;
    if (newSlots[i]) newChoices.push(newSlots[i]);
    newSlots[i] = item;
    setChoices(newChoices);
    setSlots(newSlots);
    setStatus(Array(correctOrder.length).fill('neutral'));
    setMessage({ text:'', type:'' });
    setHint('');
  }
  function onDropChoices(e) {
    e.preventDefault();
    if (locked) return;
    const { index, from } = JSON.parse(e.dataTransfer.getData('application/json'));
    if (from === 'slots') {
      let newSlots = [...slots], newChoices = [...choices];
      newChoices.push(newSlots[index]);
      newSlots[index] = null;
      setChoices(newChoices);
      setSlots(newSlots);
      setStatus(Array(correctOrder.length).fill('neutral'));
      setMessage({ text:'', type:'' });
      setHint('');
    }
  }
  function checkOrder() {
    let stat = slots.map((v,i) => v===correctOrder[i] ? 'correct' : 'wrong');
    setStatus(stat);
    if (slots.includes(null)) {
      setMessage({ text:'Kõik kastid tuleb täita enne kontrolli.', type:'error' });
      return;
    }
    if (stat.every(s=>'correct'===s)) {
      setMessage({ text:'🎉 Tubli! Turvatarkvara on õigesti paigaldatud.', type:'success' });
      setLocked(true);
    } else {
      setMessage({ text:'❌ Mõned sammud on valed.', type:'error' });
      if (slots[0]!==correctOrder[0]) setHint('Kontrolli, kas viirusetõrje tõesti paigaldatakse esimesena.');
      else if (choices.length>0) setHint('Üleliigsed sammud jäid valikutesse: need ei kuulu järgmiste kavasse.');
      else setHint('Vaata sammu järjekorda ja turvakonfiguratsiooni seadeid üle.');
    }
  }
  function resetPuzzle() {
    const all = shuffle([...correctOrder, ...distractors]);
    setChoices(all);
    setSlots(Array(correctOrder.length).fill(null));
    setStatus(Array(correctOrder.length).fill('neutral'));
    setMessage({ text:'', type:'' });
    setHint('');
    setLocked(false);
  }

  return (
    <div className={`software-puzzle ${locked?'correct-bg':message.type==='error'?'incorrect-bg':''}`}>
      <h1>Turvatarkvara paigaldamine</h1>
      <p className="scenario">
        <em>
          Sa oled vastutav korporatsiooni kriitilise infrastruktuuri turvalisuse eest. 
          Õige tarkvarajärg tagab pahavara tõrje, uuenduste rakendamise ja ohutute manuste blokeerimise.
        </em>
      </p>
      <p className="instruction">
        Lohista <strong>{correctOrder.length}</strong> õiget sammu allolevast valikute kastist õigesse järjekorda. 
        Kahe sammu ära jäta valida — need on turvalisuse seisukohast ebavajalikud.
      </p>
      <div className="puzzle-container">
        <div className="slots" onDragOver={onDragOver} onDrop={onDropChoices}>
          {slots.map((v,i) => (
            <div key={i} className={`slot ${status[i]}`} draggable={!locked&&!!v}
                 onDragStart={e=>onDragStart(e,i,'slots')}
                 onDragOver={onDragOver}
                 onDrop={e=>onDropSlot(e,i)}>
              {v||<span className="placeholder">Lohista siia</span>}
            </div>
          ))}
        </div>
        <div className="choices" onDragOver={onDragOver} onDrop={onDropChoices}>
          <p>Saadaval sammud</p>
          <div className="choices-container">
            {choices.map((v,i)=>(
              <div key={i} className="choice" draggable={!locked}
                   onDragStart={e=>onDragStart(e,i,'choices')}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="buttons">
        {!locked?(
          <>
            <button className="primary" onClick={checkOrder}>Kontrolli järjekord</button>
            <button onClick={resetPuzzle}>Alusta uuesti</button>
          </>
        ):(
          <button className="primary" onClick={()=>navigate('/infoturbe_juht3_leht')}>Edasi</button>
        )}
      </div>
      {message.text&&<div className={`message ${message.type==='success'?'message-correct':'message-incorrect'}`}>{message.text}</div>}
      {hint&&<div className="hint-box">{hint}</div>}
    </div>
  );
}