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
      <p>Siin saad selles rollis läbida järgmised etapid, mille eeldatav kestus on 12 minutit:</p>
      <ul>
        <li><strong>Intsidendi prioritiseerimise pusle</strong></li>
        <li><strong>Intsidendi kommunikatsiooni harjutus</strong></li>
        <li><strong>Intsidendi reageerimismeetmete järjestamine</strong></li>
        <li><strong>Piiramine ja likvideerimine</strong></li>
      </ul>
      <Link to="/sundmuste_reageerija1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default SundmusteReageerija;
