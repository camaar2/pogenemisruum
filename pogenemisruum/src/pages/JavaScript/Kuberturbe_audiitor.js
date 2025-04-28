import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_audiitor.css';

function KuberturbeAudiitor() {
  return (
    <div className="job-page">
      <h1>Küberturbe Audiitor</h1>
      <p>
        Küberauditöör nõustab mitmekesist klientuuri – idufirmasid, suuri korporatsioone ja riigiasutusi.
        Sinu ülesanne on läbi viia riskianalüüs, koostada sobivad turvameetmed ja tagada pidev järelevalve.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge koos ligikaudse kestusega:</p>
      <ul>
        <li><strong>Riskianalüüs</strong> – umbes 5–7 minutit</li>
        <li><strong>Turvameetmete kava</strong> – umbes 7–10 minutit</li>
        <li><strong>Lahenduse rakendamise juhendamine</strong> – umbes 8–10 minutit</li>
        <li><strong>Lõplik audit ja järelevalve</strong> – umbes 10–12 minutit</li>
      </ul>
      <Link to="/audiitor1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturbeAudiitor;

