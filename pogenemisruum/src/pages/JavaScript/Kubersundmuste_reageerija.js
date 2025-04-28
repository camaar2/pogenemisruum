import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kubersundmuste_reageerija.css';

function SundmusteReageerija() {
  return (
    <div className="job-page">
      <h1>Kübersündmuste reageerija</h1>
      <p>
        Kübersündmuste reageerija vastutab intsidendi tuvastamise, hindamise ja lahendamise eest.
        Sa koordineerid meeskonda, suhtled sidusgruppidega ning võtad tarvitusele tegevused intsidentide lahendamiseks.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis läbida järgmised etapid koos ligikaudse kestusega:</p>
      <ul>
        <li><strong>Intsidendi prioriseerimise pusle</strong> – umbes 5–7 minutit</li>
        <li><strong>Intsidendi kommunikatsiooni drill</strong> – umbes 5–7 minutit</li>
        <li><strong>Intsidendi reageerimise tegevuste järjestamine</strong> – umbes 7–10 minutit</li>
        <li><strong>Containment &amp; Eradication strateegia</strong> – umbes 8–10 minutit</li>
      </ul>
      <Link to="/sundmuste_reageerija1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default SundmusteReageerija;