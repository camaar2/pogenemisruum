import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija.css';

function KuberturvalisuseUurija() {
  return (
    <div className="job-page">
      <h1>Haavatavatuste analüütik</h1>
      <p>
        Haavatavatuste analüütik otsib IT-süsteemidest võimalikke turvaauke, dokumenteerib
        neid ja pakub välja lahendusi riskide maandamiseks.
      </p>
      <Link to="/kuberturvalisuse_uurija1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseUurija;
