import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik.css';

function KuberturbeOhuanaluutik() {
  return (
    <div className="job-page">
      <h1>Küberturbe Ohuanalüütik</h1>
      <p>
        Küberturbe ohuanalüütik kogub ja analüüsib avalikku ohuteavet, et aidata meeskonnal rünnakuid ennetada ja riske hinnata.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Ohuteabe kogumine</strong></li>
        <li><strong>Andmete analüüs</strong></li>
        <li><strong>Riskide prioriseerimine</strong></li>
        <li><strong>Kill Chain kokkupanek</strong></li>
      </ul>
      <Link to="/kuberturbe_ohuanaluutik1_leht">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturbeOhuanaluutik;