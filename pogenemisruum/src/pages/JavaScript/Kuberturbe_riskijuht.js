import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_riskijuht.css';

function KuberturbeRiskijuht() {
  return (
    <div className="job-page">
      <h1>Turvafookusega DevOps lahingväljal</h1>
      <p>
        DevOps insenerina on sinu ülesanne kiiresti seadistada ja kaitsta ettevõtte servereid ning infrastruktuuri.
        Valmista end ette, sest mäng näitab, kuidas turvafookusega DevOps lahingväljal töötab.
      </p>
      <Link to="/kuberturbe_riskijuht1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturbeRiskijuht;

