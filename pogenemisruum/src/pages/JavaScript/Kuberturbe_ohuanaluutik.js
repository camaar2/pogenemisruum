import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik.css';

function KuberturbeOhuanaluutik() {
  return (
    <div className="job-page">
      <h1>Õhuluure analüütik</h1>
      <p>
        Õhuluure analüütik kogub ja analüüsib küberruumis avalikku ohuteavet, et ennetada võimalikke rünnakuid.
        Ta koostab riskihinnanguid ning jagab infot teistele küberturvalisuse spetsialistidele.
      </p>
      <Link to="/kuberturbe_ohuanaluutik1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturbeOhuanaluutik;

