import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Infoturbe_juht.css';

function InfoturbeJuht() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse analüütik</h1>
      <p>
        Küberturvalisuse analüütik kaitseb organisatsiooni digitaalseid varasid võimalike küberohtude eest, analüüsib ohte ja rakendab turvameetmeid.
      </p>

      <h2>Mängude ülevaade</h2>
      <ol>
        <li>Digifortressi ehitamine: Tulemüüri „lukustamine“</li>
        <li>Turvatarkvara paigaldamise pusle</li>
        <li>Phishing e-kirjade tuvastamise mäng</li>
        <li>Pahavara tuvastamise väljakutse</li>
      </ol>

      <Link to="/infoturbe_juht1">
        <button>Alusta mänguseeriat</button>
      </Link>
    </div>
  );
}

export default InfoturbeJuht;