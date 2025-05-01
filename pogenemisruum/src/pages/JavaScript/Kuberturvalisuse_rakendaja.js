import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Kuberturvalisuse_rakendaja.css';

function KuberturvalisuseRakendaja() {
  return (
    <div className="job-page">
      <h1>Küberturvalisuse rakendaja</h1>
      <p>
        Küberturvalisuse rakendaja ülesanne on seadistada ja juurutada turvakontrolle võrku ning süsteemidesse,
        et kaitsta organisatsiooni võimalike rünnakute eest.
      </p>
      <h2>Mängude ülevaade</h2>
      <p>Siin saad selles rollis lahendada järgmisi mänge, mille eeldatav kestus on 10 minutit:</p>
      <ul>
        <li><strong>Võrgu kaitse seadistamine</strong></li>
        <li><strong>Turvaprofiilide loomine</strong></li>
        <li><strong>Ligipääsupoliitikate haldamine</strong></li>
        <li><strong>Teenuste turvamine</strong></li>
      </ul>
      <Link to="/rakendaja1">
        <button>Alusta mängu</button>
      </Link>
    </div>
  );
}

export default KuberturvalisuseRakendaja;
