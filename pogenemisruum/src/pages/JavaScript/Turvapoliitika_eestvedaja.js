import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja.css';

function TurvapoliitikaEestvedaja() {
  return (
    <div className="job-page">
      <h1>Turvapoliitika eestvedaja</h1>
      <p>
        Turvapoliitika eestvedaja koostab ja uuendab turvapoliitikat, juhendab töötajaid ja hoolitseb turvareeglite järgimise eest.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge:</p>
      <ul>
        <li><strong>1. Riikliku tasandi ohtude tuvastamine</strong> – umbes 3 minutit</li>
        <li><strong>2. Turvapoliitika strateegia valik</strong> – umbes 5 minutit</li>
        <li><strong>3. Rakendamise juhendamine</strong> – umbes 4 minutit</li>
        <li><strong>4. Rahvusvaheline koostöö ja kriisi järelvalve</strong> – umbes 5 minutit</li>
      </ul>
      <Link to="/turvapoliitika_eestvedaja1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default TurvapoliitikaEestvedaja;
