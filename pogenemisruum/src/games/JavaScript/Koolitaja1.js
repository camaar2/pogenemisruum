import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Koolitaja1.css';

function Koolitaja1() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ q1: '', q2: '' });
  const [error, setError] = useState('');

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const nextStage = () => {
    if (answers.q1 === 'a' && answers.q2 === 'a') {
      setError('');
      navigate('/koolitaja2');
    } else {
      setError('Vastused on osaliselt või täielikult valed. Palun proovi uuesti.');
    }
  };

  return (
    <div className="stage stage1">
      <h2>Teadmiste hindamine</h2>
      <p>Vasta järgmistele küsimustele:</p>
      
      <div>
        <h3>Mis on phishing?</h3>
        <label>
          <input
            type="radio"
            name="q1"
            value="a"
            checked={answers.q1 === 'a'}
            onChange={handleAnswerChange}
          />
          Küberrünnak, kus pettuse teel püütakse kasutajaandmeid saada.
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="q1"
            value="b"
            checked={answers.q1 === 'b'}
            onChange={handleAnswerChange}
          />
          Turvaline e-kirjavahetus.
        </label>
      </div>
      
      <div>
        <h3>Miks on paroolide korduvkasutamine ohtlik?</h3>
        <label>
          <input
            type="radio"
            name="q2"
            value="a"
            checked={answers.q2 === 'a'}
            onChange={handleAnswerChange}
          />
          Sest kui üks parool lekib, ohustab see kõiki kontosid.
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="q2"
            value="b"
            checked={answers.q2 === 'b'}
            onChange={handleAnswerChange}
          />
          Paroolide korduvkasutamine muudab meelespidamise lihtsaks.
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="q2"
            value="c"
            checked={answers.q2 === 'c'}
            onChange={handleAnswerChange}
          />
          See vähendab IT-osakonna töökoormust.
        </label>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={nextStage}>Edasi</button>
    </div>
  );
}

export default Koolitaja1;
