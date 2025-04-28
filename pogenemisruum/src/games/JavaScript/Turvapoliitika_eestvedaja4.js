import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja4.css';

function Turvapoliitika_eestvedaja4() {
  const allOptions = [
    { id: 1, text: 'Taktikaline info', explanation: 'Lühiajaline info operatsioonide kohta.' },
    { id: 2, text: 'Strateegiline info', explanation: 'Pikaajaline info organisatsiooni suundade kohta.' },
    { id: 3, text: 'Operatiivne info', explanation: 'Igapäevane info süsteemi toimimise kohta.' }
  ];
  const correctOption = 'Strateegiline info';

  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const toggleOption = (option) => {
    if (isChecked) return;
    setSelectedOption(option.text);
    setExplanation(option.explanation);
  };

  const checkSelection = () => {
    if (selectedOption === correctOption) {
      setFeedback(`Õige vastus! ${selectedOption} – ${explanation}`);
      setIsChecked(true);
    } else {
      setFeedback(`Vale vastus! Õige vastus on "Strateegiline info".`);
    }
  };

  return (
    <div className="stage stage4">
      <h2>4. Etapp: Rahvusvaheline koostöö ja kriisi järelvalve</h2>
      <p>Vali info, mida jagada rahvusvahelistele partneritele:</p>
      <ul className="option-list">
        {allOptions.map(option => (
          <li key={option.id} onClick={() => toggleOption(option)} className={selectedOption === option.text ? "selected" : ""}>
            <input type="radio" checked={selectedOption === option.text} readOnly />
            {option.text}
          </li>
        ))}
      </ul>
      <button onClick={checkSelection} disabled={isChecked}>Kontrolli valikut</button>
      {feedback && <div className="feedback">{feedback}</div>}
      {isChecked && <button onClick={() => { alert('Mäng on lõppenud!'); navigate('/'); }}>Lõpeta mäng</button>}
    </div>
  );
}

export default Turvapoliitika_eestvedaja4;
