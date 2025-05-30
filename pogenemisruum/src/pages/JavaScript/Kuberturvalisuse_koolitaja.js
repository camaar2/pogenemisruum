import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_koolitaja.css';

function KuberturvalisuseKoolitaja() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/koolitaja1_leht');
  };

  return (
    <div className="job-page">
      <h1>Küberturvalisuse koolitaja</h1>
      <p>
        Küberturvalisuse koolitajana on sinu ülesanne tõsta töötajate teadlikkust küberohtudest.
        Eesmärk on muuta töötajad organisatsiooni esimeseks kaitseliiniks, kes oskavad ära tunda õngitsuskirju ja vältida ohtlikke klikke.
      </p>

      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge:</p>
      <ul>
        <li><strong>Teadmiste hindamine</strong> – umbes 5 minutit</li>
        <li><strong>Koolitusmaterjalide loomine</strong> – umbes 5 minutit</li>
        <li><strong>Simulatsioon: õngitsuskirjade testimine</strong> – umbes 6 minutit</li>
        <li><strong>Phishing-indikaatorite tuvastamine</strong> – umbes 6–8 minutit</li>
      </ul>

      <button onClick={startGame}>Alusta mängu</button>
    </div>
  );
}

export default KuberturvalisuseKoolitaja;
