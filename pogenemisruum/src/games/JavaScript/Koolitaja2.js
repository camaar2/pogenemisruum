import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Koolitaja2.css';

function Koolitaja2() {
  const materials = ["Video", "Interaktiivne test", "Pikk tehniline tekst"];
  const correctMaterials = ["Video", "Interaktiivne test"];
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [answers, setAnswers] = useState({ q2: '', q3: '' });
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const toggleMaterial = (material) => {
    setError('');
    setIsCorrect(false);
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const handleAnswerChange = (e) => {
    setError('');
    setIsCorrect(false);
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const materialsOk = 
      selectedMaterials.length === correctMaterials.length &&
      selectedMaterials.every(m => correctMaterials.includes(m));

    const q2Ok = answers.q2 === '12';
    const q3Ok = answers.q3 === '2';

    if (materialsOk && q2Ok && q3Ok) {
      setError('');
      setIsCorrect(true);
    } else {
      setError('Vale valik! Kontrolli materjale ja vastuseid ning proovi uuesti.');
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setSelectedMaterials([]);
    setAnswers({ q2: '', q3: '' });
    setError('');
    setIsCorrect(false);
  };

  const handleNext = () => {
    navigate('/koolitaja3');
  };

  return (
    <div className={`stage stage2 ${isCorrect ? 'correct-bg' : ''}`}>
      <h2>Koolitusmaterjalide loomine</h2>
      <h3>1. Vali materjalid, mis sobivad kõige paremini kontoritöötajatele (2 õiget)</h3>
      <ul className="options">
        {materials.map(material => (
          <li key={material}
              className={selectedMaterials.includes(material) ? 'selected' : ''}
              onClick={() => toggleMaterial(material)}
          >
            <label>
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => toggleMaterial(material)}
              />
              {material}
            </label>
          </li>
        ))}
      </ul>

      <div className="question-block">
        <h3>2. Milline on paroolide minimaalne pikkus tugevuse tagamiseks?</h3>
        <div className="options">
          <label>
            <input
              type="radio"
              name="q2"
              value="6"
              checked={answers.q2 === '6'}
              onChange={handleAnswerChange}
            />
            6 tähemärki
          </label>
          <label>
            <input
              type="radio"
              name="q2"
              value="8"
              checked={answers.q2 === '8'}
              onChange={handleAnswerChange}
            />
            8 tähemärki
          </label>
          <label>
            <input
              type="radio"
              name="q2"
              value="12"
              checked={answers.q2 === '12'}
              onChange={handleAnswerChange}
            />
            12 tähemärki
          </label>
        </div>
      </div>

      <div className="question-block">
        <h3>3. Mida tähendab kahefaktoriline autentimine (2FA)?</h3>
        <div className="options">
          <label>
            <input
              type="radio"
              name="q3"
              value="1"
              checked={answers.q3 === '1'}
              onChange={handleAnswerChange}
            />
            Kasutaja peab sisestama parooli ja vastama turvaküsimusele.
          </label>
          <label>
            <input
              type="radio"
              name="q3"
              value="2"
              checked={answers.q3 === '2'}
              onChange={handleAnswerChange}
            />
            Kasutaja peab kasutama parooli ja täiendavat kinnitust (nt SMS-kood või äpp).
          </label>
          <label>
            <input
              type="radio"
              name="q3"
              value="3"
              checked={answers.q3 === '3'}
              onChange={handleAnswerChange}
            />
            Kasutaja peab kasutama ainult biomeetrilist skannimist.
          </label>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {isCorrect && (
        <div className="explanation">
          <h3>Õige valik! Selgitus:</h3>
          <p>
            <strong>Video</strong> ja <strong>Interaktiivne test</strong> on kontoritöötajatele sobivaimad materjalid, kuna need on lühikesed, visuaalsed ja võimaldavad praktilist osalust. “Pikk tehniline tekst” võib olla liiga aeganõudev ja keeruline igapäevaselt kontoris töötavatele inimestele.
          </p>
          <p>
            Paroolide minimaalne pikkus <strong>12 tähemärki</strong> tagab piisava keerukuse ja raskendab ründajate elu, kes püüavad parooli ära arvata või murda.
          </p>
          <p>
            <strong>Kahefaktoriline autentimine (2FA)</strong> tähendab, et peale parooli nõutakse veel täiendavat kinnitust (näiteks SMS-kood või autentimisäpp).
          </p>
        </div>
      )}

      <div className="buttons">
        {!isCorrect ? (
          <>
            <button className="reset-button" onClick={handleReset}>
              Alusta uuesti
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Esita valikud
            </button>
          </>
        ) : (
          <button className="submit-button" onClick={handleNext}>
            Edasi
          </button>
        )}
      </div>
    </div>
  );
}

export default Koolitaja2;

