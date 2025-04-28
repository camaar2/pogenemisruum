import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturbe_audiitor.css';

function KuberturbeAudiitor() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/audiitor1');
  };

  return (
    <div className="job-page">
      <h1>CyAdvice Challenge</h1>
      <p>
        Küberturvalisuse konsultandina nõustad mitmekesist klientuuri – alustavad idufirmad, suured korporatsioonid ja riigiasutused.
        Sinu ülesanne on koostada riskianalüüs ja pakkuda sobivaid lahendusi.
      </p>
      <button onClick={startGame}>Alusta mängu</button>
    </div>
  );
}

export default KuberturbeAudiitor;
