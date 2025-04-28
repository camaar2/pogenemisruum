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
      <p>Siin saad selles rollis lahendada järgmisi etappe koos ligikaudse kestusega:</p>
      <ul>
        <li><strong>Sihikeskkonna kaardistamine</strong> – umbes 5–7 minutit</li>
        <li><strong>Tööriistade paigutamine</strong> – umbes 7–10 minutit</li>
        <li><strong>Süsteemi ärakasutamine</strong> – umbes 8–10 minutit</li>
        <li><strong>Lõplik raport</strong> – umbes 10–12 minutit</li>
      </ul>
      <Link to="/norkustestija1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default Norkustestija;