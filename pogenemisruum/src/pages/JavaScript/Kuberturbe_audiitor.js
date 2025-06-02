import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_audiitor.css';

function KuberturbeAudiitor() {
  return (
    <div className="job-page">
      <h1>Küberturbe Audiitor</h1>
      <p>
      Küberturbe audiitor vastutab organisatsiooni IT-keskkonna tervikliku auditimise ja järelevalve eest. Tema ülesanne on hinnata nii tehnilisi kui protseduurilisi haavatavusi, kontrollida vastavust standarditele ning tagada pidev paranduste elluviimine. Audiitor kogub ja analüüsib auditiraporteid, logisid ja konfiguratsioone, tuvastab nõrkused (nt puuduvad uuendused, valesti seadistatud ligipääsud või ebapiisavad krüptomeetmed) ning koostab üksikasjalikud raportid, mis sisaldavad parandussoovitusi. Ta teeb koostööd süsteemiomanike, võrguinseneride ja juhtkonnaga, et koordineerida paranduste rakendamist, jälgida tehtud muutusi ning korraldada korduvaid kontrollprotsesse. Samuti koordineerib audiitor kolmanda osapoole kontrollimisi (nt penetration testing) ning annab koolitusi meeskonnale, et tõsta üldist turvateadlikkust.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Riskianalüüs</strong></li>
        <li><strong>Turvameetmete kava</strong></li>
        <li><strong>Lahenduse rakendamise juhendamine</strong></li>
        <li><strong>Lõplik audit ja järelevalve</strong></li>
      </ul>
      <Link to="/audiitor1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturbeAudiitor;

