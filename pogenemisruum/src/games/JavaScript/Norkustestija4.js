import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Norkustestija4.css';

function caesarDecode(text, shift) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char >= 'a' && char <= 'z') {
      let code = char.charCodeAt(0) - 'a'.charCodeAt(0);
      code = (code - shift + 26) % 26; 
      result += String.fromCharCode(code + 'a'.charCodeAt(0));
    } else if (char >= 'A' && char <= 'Z') {
      let code = char.charCodeAt(0) - 'A'.charCodeAt(0);
      code = (code - shift + 26) % 26;
      result += String.fromCharCode(code + 'A'.charCodeAt(0));
    } else {
      result += char;
    }
  }
  return result;
}

const ENCODED_MESSAGE = "Ymnx nx f hfjxywj gt4~";

function Norkustestija4() {
  const navigate = useNavigate();
  const [shift, setShift] = useState("");
  const [decoded, setDecoded] = useState("");
  const [message, setMessage] = useState("");
  const [isSolved, setIsSolved] = useState(false);

  const CORRECT_SHIFT = 5;

  const handleDecode = () => {
    const shiftNum = parseInt(shift, 10);
    if (isNaN(shiftNum)) {
      setMessage("Sisestatud nihe ei ole arv. Proovi uuesti.");
      setDecoded("");
      return;
    }
    const result = caesarDecode(ENCODED_MESSAGE, shiftNum);
    setDecoded(result);
    if (shiftNum === CORRECT_SHIFT) {
      setMessage("Õige nihe! Oled edukalt dekodeerinud sõnumi.");
      setIsSolved(true);
    } else {
      setMessage("Pole päris õige... Proovi teist nihet.");
    }
  };

  const handleReset = () => {
    setShift("");
    setDecoded("");
    setMessage("");
    setIsSolved(false);
  };

  const handleEnd = () => {
    navigate("/");
  };

  return (
    <div className="caesar-puzzle-container">
      <h1>Caesari šifri pusle</h1>
      <p>Antud on järgmine šifreeritud tekst:</p>
      <div className="encoded-message">
        <p>{ENCODED_MESSAGE}</p>
      </div>
      <p>
        Sisesta arv, mis võiks olla kasutatud nihke väärtus (shift), 
        et dekodeerida see sõnum:
      </p>
      <div className="input-area">
        <input 
          type="number" 
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          placeholder="Näiteks 5" 
          disabled={isSolved}
        />
        {!isSolved && (
          <button onClick={handleDecode}>Dekodeeri</button>
        )}
        {isSolved && (
          <button onClick={handleEnd}>Lõpeta mäng</button>
        )}
      </div>
      {decoded && (
        <div className="decoded-message">
          <h3>Dekodeeritud tekst:</h3>
          <p>{decoded}</p>
        </div>
      )}
      {message && <div className="message">{message}</div>}
      {!isSolved && (
        <button className="reset-btn" onClick={handleReset}>
          Alusta uuesti
        </button>
      )}
    </div>
  );
}

export default Norkustestija4;
