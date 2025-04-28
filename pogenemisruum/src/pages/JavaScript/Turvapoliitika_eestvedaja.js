import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja.css';

function TurvapoliitikaEestvedaja() {
  return (
    <div className="job-page">
    <h1>Küberõiguse ja vastavuse spetsialist</h1>
    <p>
      Küberõiguse ja vastavuse spetsialist tagab, et organisatsiooni küberturbe tegevused vastavad seadustele, määrustele ja sisemistele poliitikatele.
      Ta töötab välja juhiseid ja kontrollimehhanisme, et maandada juriidilisi riske.
    </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge:</p>
      <ul>
        <li><strong>Riikliku tasandi ohtude tuvastamine</strong> – umbes 3 minutit</li>
        <li><strong>Turvapoliitika strateegia valik</strong> – umbes 5 minutit</li>
        <li><strong>Rakendamise juhendamine</strong> – umbes 4 minutit</li>
        <li><strong>Rahvusvaheline koostöö ja kriisi järelvalve</strong> – umbes 5 minutit</li>
      </ul>
      <Link to="/turvapoliitika_eestvedaja1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default TurvapoliitikaEestvedaja;
