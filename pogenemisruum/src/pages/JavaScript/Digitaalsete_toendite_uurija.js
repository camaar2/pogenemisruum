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
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Chain-of-Custody Ordering</strong></li>
        <li><strong>Logianomaaliate tuvastamine</strong></li>
        <li><strong>Digitaalsete artefaktide sobitamine</strong></li>
        <li><strong>Digitaalse tõendi mälumäng</strong></li>
      </ul>
      <Link to="/digi_toendite_uurija1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default DigitaalseteToenditeUurija;
