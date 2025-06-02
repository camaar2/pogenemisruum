import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Digitaalsete_toendite_uurija.css';

function DigitaalseteToenditeUurija() {
  return (
    <div className="job-page">
      <h1>Digitaalsete tõendite uurija</h1>
      <p>
      Digitaalsete tõendite uurija vastutab organisatsiooni küberintsidentide uurimise ja tõendite haldamise eest. Ta kogub, säilitab ja analüüsib erinevaid digitaalseid andmeallikaid (näiteks logifaile ja failisüsteemi koopiad), et parandada intsidentide kulgemist ja tuvastada pahatahtlik tegevus. Töö hõlmab tõendite kogumist kooskõlas kehtestatud chain-of-custody protseduuridega, andmete korrapärast analüüsimist spetsiaalsete tööriistade abil ning tehniliste raportite koostamist, millel on juriidiline väärtus. Lisaks teeb uurija koostööd IT-turvatiimide, õiguskaitseasutuste ja juristidega, selgitades antud tõendite olulisust ning tagades, et kõik sammud on dokumenteeritud ja kohtus tunnistatavad. Ta annab soovitusi turvaküsimuste leevendamiseks, et tulevikus analoogseid intsidente ennetada.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Chain-of-Custody Ordering</strong></li>
        <li><strong>Logianomaaliate tuvastamine</strong></li>
        <li><strong>Digitaalsete artefaktide sobitamine</strong></li>
        <li><strong>Digitaalse tõendi mälumäng</strong></li>
      </ul>
      <Link to="/digi_toendite_uurija1_leht">
        <button>Liigu edasi</button>
      </Link>
    </div>
  );
}

export default DigitaalseteToenditeUurija;
