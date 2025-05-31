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
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Riskianalüüs</strong></li>
        <li><strong>Turvameetmete kava</strong></li>
        <li><strong>Lahenduse rakendamise juhendamine</strong></li>
        <li><strong>Lõplik audit ja järelevalve</strong></li>
      </ul>
      <Link to="/audiitor1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturbeAudiitor;

