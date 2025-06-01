import React, { useState } from 'react';
import '../CSS/Koolitaja1.css';

function Koolitaja1() {
  const [answers, setAnswers] = useState({ q1: '', q2: '' });
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
    setError('');
    setIsCorrect(false);
  };

  const handleSubmit = () => {
    if (answers.q1 === 'a' && answers.q2 === 'a') {
      setError('');
      setIsCorrect(true);
    } else {
      setError('Vastused on osaliselt või täielikult valed. Palun kontrolli ja proovi uuesti.');
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setAnswers({ q1: '', q2: '' });
    setError('');
    setIsCorrect(false);
  };

  return (
    <div className="knowledge-check">
      <h1>Teadmiste hindamine</h1>
      <p>Vasta järgmistele küsimustele, et näidata oma teadlikkust küberturvalisuse ohtudest:</p>

      <div className="question-block">
        <h3>1. Mis on phishing?</h3>
        <div className="options">
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
      </div>

      <div className="question-block">
        <h3>2. Miks on paroolide korduvkasutamine ohtlik?</h3>
        <div className="options">
          <label>
            <input
              type="radio"
              name="q2"
              value="a"
              checked={answers.q2 === 'a'}
              onChange={handleAnswerChange}
            />
            Kui üks parool lekib, ohustab see kõiki kontosid.
          </label>
          <label>
            <input
              type="radio"
              name="q2"
              value="b"
              checked={answers.q2 === 'b'}
              onChange={handleAnswerChange}
            />
            Paroolide korduvkasutamine muudab meelespidamise lihtsamaks.
          </label>
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
      </div>

      {error && <p className="error-message">{error}</p>}

      {isCorrect && (
        <div className="explanation">
          <h3>Õige vastus! Selgitus:</h3>
          <p>
            <strong>Phishing</strong> on küberrünnak, mille käigus ründaja püüab pettuse teel saada kasutaja tundlikke andmeid (nt paroole, krediitkaardi andmeid, isikutuvastust). Tavaliselt saadetakse ohvrile e-kiri või sõnum, mis näib tulenevat usaldusväärsest allikast (näiteks pangast või teenusepakkujalt), et meelitada kasutaja klikkima pahatahtlikule lingile või sisestama andmeid võltsveebilehele.
          </p>
          <p>
            <strong>Paroolide korduvkasutamine</strong> on ohtlik, sest kui mõni üksik konto võetakse üle või parool lekib, saab ründaja proovida sama parooli sisselogimiseks teistesse kontodesse (nt e-posti, pangakonto, sotsiaalmeedia). Seetõttu tuleks igale veebiteenusele luua unikaalne, tugev parool ja kasutada võimalusel ka kahefaktorilist autentimist.
          </p>
        </div>
      )}

      <div className="buttons">
        <button className="reset-button" onClick={handleReset}>
          Alusta uuesti
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Esita valikud
        </button>
      </div>
    </div>
  );
}

export default Koolitaja1;

