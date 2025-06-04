import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_rakendaja.css';

function KuberturvalisuseRakendaja() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse rakendaja</h1>
      <p>
      Küberturvalisuse rakendaja vastutab organisatsiooni turvapoliitikate ja -lahenduste praktilise elluviimise eest. Tema ülesanne on konfigureerida ja hallata turvakontrollisüsteeme (nt tulemüürid, IDS/IPS, VPN-id) ning tagada nende korrektne integreerimine võrku ja seadmetesse. Rakendaja paigaldab ja uuendab turvatarkvara, korraldab automaatseid haavatavusskaneeringuid ning reageerib ilmnenud hoiatussignaalidele. Ta koostab ja haldab detailseid konfiguratsioonidokumente ja tööprotsesse, mis kirjeldavad kehtestatud turvameetmeid ning vastutusvaldkondi nende järelevalve ja hoolduse jaoks. Rakendaja teeb tihedat koostööd võrguinseneride, süsteemiadministraatorite ja arendusmeeskonnaga, et ühildada turvanõuded olemasolevate süsteemide ning uute projektidega. Lisaks jälgib ta pidevalt turvasündmusi logifailidest ja hoiatustest ning koostab regulaarseid aruandeid turvaseisundi kohta, andes soovitusi parandusmeetmete rakendamiseks ja protsesside täiustamiseks.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Võrgu kaitse seadistamine</strong></li>
        <li><strong>Tulemüüri reeglite optimeerimine</strong></li>
        <li><strong>Turvatööriistade valik</strong></li>
        <li><strong>Turvameetmete teadmiste kontroll</strong></li>
      </ul>
      <Link to="/rakendaja1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseRakendaja;
