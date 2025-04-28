import React from 'react';
import '../CSS/Digitaalsete_toendite_uurija.css';
import { Link } from 'react-router-dom';

function DigitaalseteToenditeUurija() {
  return (
    <div className="job-page">
      <h1>Digitaalsete tõendite uurija</h1>
      <p>
        Digitaalsete tõendite uurija tegeleb digitaalse forensikaga,
        kogudes ja analüüsides tõendeid võimalike küberkuritegude või
        -intsidentide puhul. Ta tagab, et tõendid oleksid korrektselt
        säilitatud ja kohtus kasutuskõlblikud.
        </p>
      <Link to="/digi_toendite_uurija1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default DigitaalseteToenditeUurija;
