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
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Digifortressi ehitamine</strong></li>
        <li><strong>Turvatarkvara paigaldamine</strong></li>
        <li><strong>Andmepüügi tuvastamine</strong></li>
        <li><strong>Pahavara tuvastamine</strong></li>
      </ul>
      <Link to="/infoturbe_juht1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default InfoturbeJuht;