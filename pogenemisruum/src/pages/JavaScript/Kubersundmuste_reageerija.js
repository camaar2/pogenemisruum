import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kubersundmuste_reageerija.css';

function SundmusteReageerija() {
  return (
    <div className="job-page">
      <h1>Kübersündmuste reageerija</h1>
      <p>
        Kübersündmuste reageerija on kriitiline roll, mis keskendub organisatsiooni küberturvalisuse intsidentidele 
        reageerimisele ja nende lahendamisele. Tema vastutusala hõlmab intsidentide kiiret ja täpset tuvastamist, 
        tõsiduse hindamist ning vajalike meetmete rakendamist olukorra kontrolli alla võtmiseks. Kübersündmuste reageerija 
        koordineerib erinevate spetsialistide ja osakondade tegevust, suhtleb aktiivselt organisatsiooni juhtkonna ja väliste 
        partneritega ning tagab, et kõik osapooled on intsidentide arengutest teadlikud. Lisaks on tema ülesandeks juhtida sündmuse 
        ohjeldamist, teostada põhjalikku analüüsi olukorra tekkepõhjuste mõistmiseks ja ennetusmeetmete kavandamiseks ning tagada, et 
        pärast intsidenti rakendatakse täiendavad meetmed organisatsiooni küberturvalisuse tugevdamiseks ja tulevikus sarnaste intsidentide vältimiseks.
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
