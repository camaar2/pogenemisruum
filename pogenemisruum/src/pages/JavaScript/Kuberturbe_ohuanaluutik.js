import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik.css';

function KuberturbeOhuanaluutik() {
  return (
    <div className="job-page">
      <h1>Küberohuanalüütik</h1>
      <p>
        Küberohuanalüütik kogub ja analüüsib avalikku ohuteavet, et aidata meeskonnal rünnakuid ennetada ja riske hinnata.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge koos eeldatava kestusega:</p>
      <ul>
        <li><strong>Ohuteabe kogumine</strong> – umbes 5-7 minutit</li>
        <li><strong>Andmete analüüs</strong> – umbes 10 minutit</li>
        <li><strong>Riskide prioriseerimine</strong> – umbes 8 minutit</li>
        <li><strong>Kill Chain kokkupanek</strong> – umbes 10 minutit</li>
      </ul>
      <Link to="/kuberturbe_ohuanaluutik1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturbeOhuanaluutik;