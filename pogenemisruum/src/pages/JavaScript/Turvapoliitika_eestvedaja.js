import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Turvapoliitika_eestvedaja.css';

function TurvapoliitikaEestvedaja() {
  return (
    <div className="job-page">
      <h1>Turvapoliitika eestvedaja</h1>
      <p>
        Turvapoliitika eestvedaja ülesanne organisatsioonis on juhtida ja koordineerida küberturvalisuse 
        valdkonna poliitika kujundamist ja rakendamist. Ta vastutab selle eest, et organisatsiooni küberturvalisuse
        meetmed oleksid kooskõlas seaduste, regulatsioonide ja sisemiste nõuetega, tagades samal ajal organisatsiooni 
        vastupidavuse ja valmisoleku küberohtudele reageerimisel. Turvapoliitika eestvedaja töötab välja strateegilisi 
        suuniseid ja protsesse, korraldab regulaarseid koolitusi ning teostab järelvalvet nende rakendamise üle. Samuti 
        juhib ta koostööd rahvusvaheliste partneritega kriisiolukordade haldamisel ning jälgib kriisijärgsete meetmete efektiivsust. 
        Tema ülesanne on ka tagada organisatsiooni kõrge teadlikkus küberturvalisuse teemadel, vältida võimalikke ohte ning vähendada 
        võimalike intsidentidega seotud riske.
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
