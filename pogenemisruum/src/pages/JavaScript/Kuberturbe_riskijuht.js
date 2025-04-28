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
        <li><strong>Serveri algseadistus</strong> -umbes 5 minutit</li>
        <li><strong>Turvauuenduste ja automaatika seadistamine</strong> -umbes 4 minutit</li>
        <li><strong>Süsteemide monitooring ja logide analüüs</strong> -umbes 5 minutit</li>
        <li><strong>Operatiivne reageerimine</strong> -umbes 5 minutit</li>
      </ul>

      <Link to="/kuberturbe_riskijuht1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturbeRiskijuht;
