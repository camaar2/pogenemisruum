import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_riskijuht.css';

function KuberturbeRiskijuht() {
  return (
    <div className="job-page">
      <h1>Küberturbe riskijuht</h1>
      <p>
        Selles rollis on sinu ülesanne kiiresti ja õigesti seadistada, uuendada ja kaitsta organisatsiooni servereid ning infrastruktuuri. 
        Iga etapp viib sind lähemale turvalise süsteemi loomisele.
      </p>

      <h2>Mängud:</h2>
      <ul>
        <li><strong>Serveri algseadistus</strong></li>
        <li><strong>Turvauuenduste ja automaatika seadistamine</strong></li>
        <li><strong>Süsteemide monitooring ja logide analüüs</strong></li>
        <li><strong>Operatiivne reageerimine</strong></li>
      </ul>

      <Link to="/kuberturbe_riskijuht1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturbeRiskijuht;
