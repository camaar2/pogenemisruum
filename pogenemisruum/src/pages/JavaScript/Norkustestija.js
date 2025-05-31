import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Norkustestija.css';

function Norkustestija() {
  return (
    <div className="job-page">
      <h1>Nõrkustestija</h1>
      <p>
        Nõrkustestija rollis uurid süsteeme ja rakendusi, et leida turvaauke enne pahatahtlikke osapooli.
        Läbi nelja etapi õpid sihtkeskkonda kaardistama, tööriistu kasutama, haavatavusi testima ning tulemusi dokumenteerima.
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