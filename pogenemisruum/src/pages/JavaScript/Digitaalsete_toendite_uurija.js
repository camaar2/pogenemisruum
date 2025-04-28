import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Digitaalsete_toendite_uurija.css';

function DigitaalseteToenditeUurija() {
  return (
    <div className="job-page">
      <h1>Digitaalsete tõendite uurija</h1>
      <p>
        Digitaalsete tõendite uurija (forensic analyst) kogub ja analüüsib digitaalseid tõendeid,
        et aidata uurijatel mõista küberintsidente ja tagada, et tõendid oleksid kohtus kasutuskõlblikud.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis läbida järgmisi etappe koos ligikaudse kestusega:</p>
      <ul>
        <li><strong>Chain-of-Custody Ordering</strong> – umbes 5–7 minutit</li>
        <li><strong>Logianomaaliate tuvastamine</strong> – umbes 7–10 minutit</li>
        <li><strong>Digitaalsete artefaktide sobitamine</strong> – umbes 8–10 minutit</li>
        <li><strong>Digitaalse tõendi mälumäng</strong> – umbes 10–12 minutit</li>
      </ul>
      <Link to="/digi_toendite_uurija1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default DigitaalseteToenditeUurija;
