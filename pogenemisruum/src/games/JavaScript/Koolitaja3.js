import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Koolitaja3.css';

function Koolitaja3() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const correctOption = 'Sihtsuunatud spear-phishing';

  const handleOptionClick = (option) => {
    if (option === correctOption) {
      setSelectedOption(option);
      setFeedback('Õige! Sihtsuunatud spear-phishing aitab tuvastada töötajate nõrgad lülid.');
      setError('');
    } else {
      setSelectedOption('');
      setFeedback('');
      setError('Vale valik! Palun vali õige variant: Sihtsuunatud spear-phishing.');
    }
  };

  const nextStage = () => {
    if (selectedOption === correctOption) {
      navigate('/koolitaja4_leht');
    }
  };

  return (
    <div className="stage stage3">
      <h2>Simulatsioon (õngitsuskirjade test)</h2>
      <p>Vali, milline õngitsuskirjade kampaania sobib parimalt:</p>
      <button onClick={() => handleOptionClick('Kõik töötajad saavad ühesuguse kirja')}>
        Kõik töötajad saavad ühesuguse kirja
      </button>
      <button onClick={() => handleOptionClick('Sihtsuunatud spear-phishing')}>
        Sihtsuunatud spear-phishing
      </button>
      {feedback && <p style={{ color: 'green' }}>{feedback}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {selectedOption === correctOption && <button onClick={nextStage}>Edasi</button>}
    </div>
  );
}

export default Koolitaja3;
