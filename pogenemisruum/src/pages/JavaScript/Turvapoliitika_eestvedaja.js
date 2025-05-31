import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja.css';

function TurvapoliitikaEestvedaja() {
  return (
    <div className="job-page">
      <h1>Turvapoliitika eestvedaja</h1>
      <p>
        Küberõiguse ja vastavuse spetsialist tagab, et organisatsiooni küberturbe tegevused vastavad seadustele, määrustele ja sisemistele poliitikatele.
        Ta töötab välja juhiseid ja kontrollimehhanisme, et maandada juriidilisi riske.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Riikliku tasandi ohtude tuvastamine</strong></li>
        <li><strong>Turvapoliitika strateegia valik</strong></li>
        <li><strong>Rakendamise juhendamine</strong></li>
        <li><strong>Rahvusvaheline koostöö ja kriisi järelvalve</strong></li>
      </ul>
      <Link to="/turvapoliitika_eestvedaja1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default TurvapoliitikaEestvedaja;
