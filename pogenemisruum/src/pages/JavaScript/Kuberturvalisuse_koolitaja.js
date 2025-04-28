import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_koolitaja.css';

function KuberturvalisuseKoolitaja() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/koolitaja1');
  };

  return (
    <div className="job-page">
      <h1>PhishNoMore Academy</h1>
      <p>
        Küberturvalisuse koolitajana on sinu ülesanne tõsta töötajate teadlikkust küberohtudest. 
        Muuda töötajad “esimeseks kaitseliiniks”, kes suudavad ära tunda õngitsuskirju ja vältida ohtlikke klikke.
      </p>
      <button onClick={startGame}>Alusta mängu</button>
    </div>
  );
}

export default KuberturvalisuseKoolitaja;
