import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_uurija.css';

function KuberturvalisuseUurija() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse uurija</h1>
      <p>
        Selles rollis oled vastutav digitaalsete tõendite kogumise, analüüsi ja
        forensilise ahela dokumenteerimise eest. Iga ülesanne viib sind sammukese lähemale
        tõendite terviklikkuse ja usaldusväärsuse tagamisele.
      </p>

      <h2>Mängud:</h2>
      <ul>
        <li><strong>Tõendite ahela sammude järjestamine</strong></li>
        <li><strong>Logianomaaliate tuvastamine</strong></li>
        <li><strong>Probleemide tõsidus</strong></li>
        <li><strong>Oht ja Lahendus</strong></li>
      </ul>

      <Link to="/kuberturvalisuse_uurija1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseUurija;

