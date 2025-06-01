import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Digi_toendite_uurija3.css';

const pairs = [
  { pairId: 1, artifact: "JPEG fail", description: "Sisaldab EXIF-metainfot ja tihendab pildidata", explanation: "JPEG-fail sisaldab tavaliselt pildiga seotud metainfot, mida saab uurida." },
  { pairId: 2, artifact: "PDF dokument", description: "Võib peita teksti, manuseid ja metainfot", explanation: "PDF-failides võib olla varjatud dokumente ja metaandmeid." },
  { pairId: 3, artifact: "Logifail", description: "Salvestab süsteemi sündmusi ja ajatempleid", explanation: "Logifailidest leiab täpse ajajoone süsteemi sündmustest." },
  { pairId: 4, artifact: "Meilifail", description: "Sisaldab päiseid, manuseid ja korrespondentsi", explanation: "Meilifailist saab teavet saatjate, saajate ja manuste kohta." }
];

export default function Digi_toendite_uurija3() {
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState(
    () => pairs.map(p => ({ pairId: p.pairId, artifact: p.artifact })).sort(() => Math.random() - 0.5)
  );
  const [slots, setSlots] = useState(
    () => pairs.reduce((acc, p) => ({ ...acc, [p.pairId]: null }), {})
  );
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');

  const scenario =
    "Digitaalse uurimise protsessis leidub erinevaid andmekandjaid ja faile. " +
    "Iga artifakt võib pakkuda erinevat tüüpi tõendeid (meta, tegevuslogid, manused jne). " +
    "Siduge iga fail õigete omaduste või metainfoga, et selgitada, kus ja kuidas võib avastada olulist teavet.";

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('pairId', id);
  };
  const handleDragOver = e => e.preventDefault();

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    if (checked) return;
    const pairId = Number(e.dataTransfer.getData('pairId'));
    setSlots(prev => ({ ...prev, [slotId]: pairId }));
    setArtifacts(prev => prev.filter(a => a.pairId !== pairId));
  };

  const handleCheck = () => {
    setChecked(true);
    const correctCount = pairs.filter(p => slots[p.pairId] === p.pairId).length;
    if (correctCount === pairs.length) {
      setMessage('🎉 Kõik sobitused õiged! Jätka järgmise etapi juurde.');
    } else {
      setMessage(`❌ Õigesti: ${correctCount}/${pairs.length}. Mõned sobitused valed või puuduvad. Proovi uuesti.`);
    }
  };

  const handleReset = () => {
    setArtifacts(pairs.map(p => ({ pairId: p.pairId, artifact: p.artifact })).sort(() => Math.random() - 0.5));
    setSlots(pairs.reduce((acc, p) => ({ ...acc, [p.pairId]: null }), {}));
    setChecked(false);
    setMessage('');
  };

  const handleNext = () => navigate('/digi_toendite_uurija4_leht');

  const containerClass =
    checked && message.startsWith('🎉')
      ? 'correct-bg'
      : checked
      ? 'incorrect-bg'
      : '';
  const messageClass = checked && message.startsWith('🎉') ? 'message-correct' : 'message-incorrect';

  return (
    <div className={`artifact-matching ${containerClass}`}>
      <h1>Digitaalse tõendi sobitamine</h1>
      <p className="scenario"><em>{scenario}</em></p>
      <p className="instruction">
        Sobitage <strong>{pairs.length}</strong> faili oma kirjeldustega loogiliselt kokku.
      </p>

      <div className="matching-container">
        <div className="artifact-pool" onDragOver={handleDragOver}>
          <h2>Failid</h2>
          {artifacts.map(a => (
            <div
              key={a.pairId}
              className="artifact-item"
              draggable={!checked}
              onDragStart={e => handleDragStart(e, a.pairId)}
            >
              {a.artifact}
            </div>
          ))}
        </div>

        <div className="description-slots">
          <h2>Kirjeldused</h2>
          {pairs.map(p => {
            const assigned = slots[p.pairId];
            let slotClass = 'description-slot';
            if (checked) {
              slotClass += assigned === p.pairId ? ' correct' : ' incorrect';
            }
            return (
              <div
                key={p.pairId}
                className={slotClass}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, p.pairId)}
              >
                <p className="description-text">{p.description}</p>
                {assigned ? (
                  <div className="matched-artifact">{pairs.find(x => x.pairId === assigned).artifact}</div>
                ) : (
                  <div className="placeholder">Lohista siia</div>
                )}
                {checked && assigned && (
                  <div className="explanation">
                    {pairs.find(x => x.pairId === assigned).explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="buttons">
        <button className="reset" onClick={handleReset}>Alusta uuesti</button>
        {!checked ? (
          <button className="primary submit" onClick={handleCheck}>Esita valikud</button>
        ) : message.startsWith('🎉') ? (
          <button className="primary next" onClick={handleNext}>Edasi</button>
        ) : (
          <button className="primary submit" onClick={handleReset}>Proovi uuesti</button>
        )}
      </div>

      {message && <div className={`message ${messageClass}`}>{message}</div>}
    </div>
  );
}
