import React from 'react';
import '../CSS/Kuberturvalisuse_rakendaja.css';
import { Link } from 'react-router-dom';

function KuberturvalisuseRakendaja() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse rakendaja</h1>
      <p>
        Küberturvalisuse rakendaja ülesanne on seadistada ja juurutada turvakontrolle võrku ning süsteemidesse,
        et kaitsta organisatsiooni võimalike rünnakute eest.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmise etapi koos ligikaudse kestusega:</p>
      <ul>
        <li><strong>Network Defense Setup</strong> – umbes 10–12 minutit</li>
      </ul>
      <Link to="/rakendaja1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseRakendaja;
