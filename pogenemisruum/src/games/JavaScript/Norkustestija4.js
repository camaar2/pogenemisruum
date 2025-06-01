import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija4.css';

function caesarDecode(text, shift) {
  return text.split('').map(char => {
    if (/[a-z]/.test(char)) {
      const base = 'a'.charCodeAt(0);
      return String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
    }
    if (/[A-Z]/.test(char)) {
      const base = 'A'.charCodeAt(0);
      return String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
    }
    return char;
  }).join('');
}

const ENCODED_MESSAGE = "Ymnx nx f hfjxywj gt4~";
const CORRECT_SHIFT = 5;

export default function Norkustestija4() {
  const navigate = useNavigate();
  const [shift, setShift] = useState('');
  const [decoded, setDecoded] = useState('');
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');

  const scenario =
    "Caesari šifri demomstraatori ülesanne on näidata, kuidas lihtsalt nihkega krüpteerimine töötab. " +
    "Antud süsteem kasutab lihtsat tähenihkesüsteemi, kus iga täht nihkub ASCII järjekorras. " +
    "Sisesta nihke väärtus, et taastada originaalne tekst. Õige nihke puhul ilmub puhas sõnum!";

  const handleDecode = () => {
    const shiftNum = parseInt(shift, 10);
    if (isNaN(shiftNum)) {
      setMessage('❗ Sisesta palun täisarvuline nihe.');
      setDecoded('');
      return;
    }
    const result = caesarDecode(ENCODED_MESSAGE, shiftNum);
    setDecoded(result);
    setChecked(true);
    if (shiftNum === CORRECT_SHIFT) {
      setMessage('🎉 Õige nihe! Sõnum lahtimurdetud edukalt.');
    } else {
      setMessage('❌ Pole õige nihke väärtus. Proovi uuesti.');
    }
  };

  const handleReset = () => {
    setShift('');
    setDecoded('');
    setMessage('');
    setChecked(false);
  };

  const handleEnd = () => navigate('/');

  const containerClass =
    checked && message.startsWith('🎉')
      ? 'correct-bg'
      : checked
      ? 'incorrect-bg'
      : '';
  const messageClass = checked
    ? message.startsWith('🎉')
      ? 'message-correct'
      : 'message-incorrect'
    : '';

  return (
    <div className={`caesar-puzzle-container ${containerClass}`}>
      <h1>Caesari šifri lahtimurdmine</h1>
      <p className="scenario"><em>{scenario}</em></p>
      <p>Antud on järgmine krüpteeritud sõnum:</p>
      <div className="encoded-message"><code>{ENCODED_MESSAGE}</code></div>
      <p>Sisestage nihke väärtus (täisarv), millega krüpteerimine viidi läbi:</p>
      <div className="input-area">
        <input
          type="number"
          value={shift}
          onChange={e => setShift(e.target.value)}
          placeholder="Näiteks 5"
          disabled={checked}
        />
        {!checked ? (
          <button className="primary" onClick={handleDecode} disabled={!shift}>
            Dekodeeri
          </button>
        ) : message.startsWith('🎉') ? (
          <button className="primary" onClick={handleEnd}>
            Lõpeta mäng
          </button>
        ) : (
          <button onClick={handleReset}>Proovi uuesti</button>
        )}
      </div>
      {decoded && (
        <div className="decoded-message">
          <h3>Lahtimurdetud tekst:</h3>
          <p><code>{decoded}</code></p>
        </div>
      )}
      {message && <div className={`message ${messageClass}`}>{message}</div>}
    </div>
  );
}