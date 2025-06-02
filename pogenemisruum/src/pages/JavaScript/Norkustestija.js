import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Norkustestija.css';

function Norkustestija() {
  return (
    <div className="job-page">
      <h1>Nõrkustestija</h1>
      <p>
      Nõrkustestija vastutab organisatsiooni IT-keskkonna turvalisuse praktilise kontrolli eest, et leida ja ära kasutada võimalikke haavatavusi enne pahatahtlikke osapooli. Tema ülesanne on esmalt kaardistada sihtkeskkond—koguda infot võrkudest, serveritest, teenustest ja rakendustest—ning seejärel paigaldada ja seadistada vastavad turvatestimise tööriistad (nt skannerid, pen-test raamistikud). Pärast haavatavuste tuvastamist teostab nõrkustestija süsteemi ärakasutamise, kasutades reaalseid ründemudeleid, et kinnitada leitud nõrkuste tõsidust ning hinnata nende mõju. Lõpuks koostab ta põhjaliku raporti, kus dokumenteerib leitud turvaaugud, näited nende ärakasutamisest ja annab konkreetsed soovitused lahtipääsemise vältimiseks ning turvalisuse tugevdamiseks. Nõrkustestija töötab tihedas koostöös arendusmeeskondade, võrguinseneride ja turbejuhtidega, et tagada turvaparanduste kiire rakendamine ja pikaajaline jälgimine.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Sihikeskkonna kaardistamine</strong></li>
        <li><strong>Tööriistade paigutamine</strong></li>
        <li><strong>Süsteemi ärakasutamine</strong></li>
        <li><strong>Lõplik raport</strong></li>
      </ul>
      <Link to="/norkustestija1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default Norkustestija;