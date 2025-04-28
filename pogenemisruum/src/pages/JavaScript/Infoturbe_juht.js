import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Infoturbe_juht.css';

function InfoturbeJuht() {
  return (
    <div className="job-page">
      <h1>Infoturbe juht (CISO)</h1>
      <p>
        Infoturbe juht vastutab organisatsiooni üleüldise küberturvalisuse strateegia ja poliitikate eest.
        Sa juhid meeskondi, koordineerid turvameetmete rakendamist ning tagad vastavuse regulatsioonidele.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis läbida järgmised etapid koos ligikaudse kestusega:</p>
      <ul>
        <li><strong>Digifortressi ehitamine</strong> – umbes 5–7 minutit</li>
        <li><strong>Turvatarkvara paigaldamine</strong> – umbes 7–10 minutit</li>
        <li><strong>Andmepüügi tuvastamine</strong> – umbes 8–10 minutit</li>
        <li><strong>Pahavara tuvastamine</strong> – umbes 10–12 minutit</li>
      </ul>
      <Link to="/infoturbe_juht1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default InfoturbeJuht;