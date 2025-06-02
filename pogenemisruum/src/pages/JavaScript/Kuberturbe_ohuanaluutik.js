import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturbe_ohuanaluutik.css';

function KuberturbeOhuanaluutik() {
  return (
    <div className="job-page">
      <h1>Küberturbe Ohuanalüütik</h1>
      <p>
      Küberturbe ohuanalüütik vastutab organisatsiooni kaitseks vajaliku avaliku ja sisemise ohuteabe kogumise, töötlemise ja analüüsi eest. Tema ülesanne on pidevalt jälgida erinevaid allikaid (näiteks CERT-teavitused, sotsiaalmeedia, foorumid, reaalaja turvaportaalid), tuvastada uusimad ründevektorid ning hinnata nende mõju organisatsiooni keskkonnale. Lisaks koostab ohuanalüütik regulaarseid raporteid ja hoiatusi: milliseid haavatavusi ründajad sihivad/ära kasutavad, millised juhtumid võivad iseorganisatsioonis olulisi teenuseid mõjutada, ning annab soovitusi rünnete ennetamiseks. Ta töötab tihedas koostöös teenusehaldajate, võrguinseneride ja juhtkonnaga, et tagada kiire reageerimine avastatud ohtudele ning hoida jooksvalt ülevaadet peamistest riskiobjektidest.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Ohuteabe kogumine</strong></li>
        <li><strong>Andmete analüüs</strong></li>
        <li><strong>Riskide prioriseerimine</strong></li>
        <li><strong>Kill Chain kokkupanek</strong></li>
      </ul>
      <Link to="/kuberturbe_ohuanaluutik1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturbeOhuanaluutik;