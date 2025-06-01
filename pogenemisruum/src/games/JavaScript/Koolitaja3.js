import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Koolitaja3.css';

function Koolitaja3() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ q1: '', q2: '' });
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswers = {
    q1: 'Sihtsuunatud spear-phishing',
    q2: 'Isikuandmete kogumine konkreetse töötaja kohta'
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
    setError('');
    setIsCorrect(false);
  };

  const handleSubmit = () => {
    const q1Ok = answers.q1 === correctAnswers.q1;
    const q2Ok = answers.q2 === correctAnswers.q2;

    if (q1Ok && q2Ok) {
      setError('');
      setIsCorrect(true);
    } else {
      setError('Vale vastus! Kontrolli oma valikuid ja proovi uuesti.');
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setAnswers({ q1: '', q2: '' });
    setError('');
    setIsCorrect(false);
  };

  return (
    <div className="stage stage3">
      <h2>Simulatsioon (õngitsuskirjade test)</h2>
      <p>Vastake järgmistele küsimustele õngitsuskirjade kampaania kohta:</p>

      <div className="question-block">
        <h3>1. Milline õngitsuskirjade kampaania sobib kõige paremini töötaja nõrkemise testimiseks?</h3>
        <div className="options">
          <label>
            <input
              type="radio"
              name="q1"
              value="Kõik töötajad saavad ühesuguse kirja"
              checked={answers.q1 === 'Kõik töötajad saavad ühesuguse kirja'}
              onChange={handleAnswerChange}
            />
            Kõik töötajad saavad ühesuguse kirja
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="Sihtsuunatud spear-phishing"
              checked={answers.q1 === 'Sihtsuunatud spear-phishing'}
              onChange={handleAnswerChange}
            />
            Sihtsuunatud spear-phishing
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="Massõngitsuskampaania anonimseid aadresse kasutades"
              checked={answers.q1 === 'Massõngitsuskampaania anonimseid aadresse kasutades'}
              onChange={handleAnswerChange}
            />
            Massõngitsuskampaania anonimseid aadresse kasutades
          </label>
        </div>
      </div>

      <div className="question-block">
        <h3>2. Mis on spear-phishing kampaania oluliseks osaks enne e-kirjade saatmist?</h3>
        <div className="options">
          <label>
            <input
              type="radio"
              name="q2"
              value="Juhuslike manustatud failide lisamine"
              checked={answers.q2 === 'Juhuslike manustatud failide lisamine'}
              onChange={handleAnswerChange}
            />
            Juhuslike manustatud failide lisamine
          </label>
          <label>
            <input
              type="radio"
              name="q2"
              value="Isikuandmete kogumine konkreetse töötaja kohta"
              checked={answers.q2 === 'Isikuandmete kogumine konkreetse töötaja kohta'}
              onChange={handleAnswerChange}
            />
            Isikuandmete kogumine konkreetse töötaja kohta
          </label>
          <label>
            <input
              type="radio"
              name="q2"
              value="Kõikvõimalike lingi pikenduste kasutamine"
              checked={answers.q2 === 'Kõikvõimalike lingi pikenduste kasutamine'}
              onChange={handleAnswerChange}
            />
            Kõikvõimalike lingi pikenduste kasutamine
          </label>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {isCorrect && (
        <div className="explanation">
          <h3>Õige vastus! Selgitus:</h3>
          <p>
            <strong>Sihisuunatud spear-phishing</strong> on parim valik, kuna sellega luuakse personaliseeritud e-kirjad, mis tunduvad tulevat usaldusväärselt allikalt. See aitab tuvastada konkreetsete töötajate nõrgad lülid, kuna ründija kasutab enne saatmist kogutud teavet.
          </p>
          <p>
            Spear-phishingu oluliseks osaks on <strong>isikuandmete kogumine konkreetse töötaja kohta</strong> (nt ametikoht, projektide nimed, sotsiaalmeedias jagatud info). Mida täpsemalt sobitatud info, seda usutavam näib kiri ja seda suurem on võimalus, et töötaja klikib pahatahtlikule lingile või jagab paroole.
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

      {isCorrect && (
        <div className="next-button-container">
          <button className="next-button" onClick={() => navigate('/koolitaja4_leht')}>
            Edasi
          </button>
        </div>
      )}
    </div>
  );
}

export default Koolitaja3;
